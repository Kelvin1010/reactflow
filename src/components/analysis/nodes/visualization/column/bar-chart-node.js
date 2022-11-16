import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Box, FormControl, FormLabel, Select, Stack } from "@chakra-ui/react";
import { getIncomers, useEdges, useNodes, useReactFlow } from "react-flow-renderer";
import { Chart as ChartJS, LinearScale, Tooltip, Legend, CategoryScale, BarElement, Title } from "chart.js";
import { useRecoilValue } from "recoil";
import { NodeContainer } from "../../../node-container";
import { atomState } from "../../../../../atom";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const initialState = {
  xColumn: "",
  yColumn: "",
};

function BarChartNode({ onCallback, id }) {
  const { getNode } = useReactFlow();
  const allNodes = useNodes();
  const allEdges = useEdges();
  const [input, setInput] = useState(initialState);
  const [columns, setColumns] = useState([]);
  const [output, setOutput] = useState([]);
  const nodeParent = getIncomers(getNode(id), allNodes, allEdges)[0];
  const atoms = useRecoilValue(atomState);
  const atomParent = atoms.find((n) => n.id === nodeParent?.id);

  useEffect(() => {
    if (atomParent?.data) {
      var columnsParent = Object.keys(atomParent.data?.output?.[0] ?? {});
      var initialInput = {
        xColumn: columnsParent.includes(input.xColumn) ? input.xColumn : columnsParent[0],
        yColumn: columnsParent.includes(input.yColumn) ? input.yColumn : columnsParent[0],
      };
      var output = barChartTransform(atomParent.data.output, initialInput);
      setInput(initialInput);
      setOutput(output);
      onCallback({ output: atomParent.data.output, input: initialInput });
      setColumns(columnsParent);
    }

    if (!atomParent) {
      setOutput([]);
      setColumns([]);
      onCallback({ output: null, input: null });
    }
  }, [atomParent?.data]);

  function handleChangeInput(event) {
    var { value, name } = event.target;
    var output = barChartTransform(atomParent.data.output, { ...input, [name]: value });
    setInput({ ...input, [name]: value });
    setOutput(output);
    onCallback({ input: { ...input, [name]: value }, output: atomParent.data.output });
  }
  console.log(atomParent)

  return (
    <Box>
      {columns.length <= 0 ? (
        <Box position="relative">
          <div>← kết nối dataset...</div>
        </Box>
      ) : (
        <Stack>
          <FormControl>
            <FormLabel>x-axis</FormLabel>
            <Select name="xColumn" value={input.xColumn} onChange={handleChangeInput}>
              {columns.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>y-axis</FormLabel>
            <Select name="yColumn" value={input.yColumn} onChange={handleChangeInput}>
              {columns.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </Select>
          </FormControl>
          <Bar
            options={options}
            data={{
              labels: output.map((i) => i.x),
              datasets: [
                {
                  label: "dataset",
                  data: output.map((i) => i.y),
                  borderColor: "rgb(255, 99, 132)",
                  backgroundColor: "red",
                },
              ],
            }}
          />
        </Stack>
      )}
    </Box>
  );
}

function barChartTransform(input, { xColumn, yColumn }) {
  if (!Array.isArray(input)) {
    return [];
  }

  return input?.map((i) => ({ x: i[xColumn], y: i[yColumn] }));
}

function Sidebar({ onDragStart }) {
  return (
    <div className="dndnode" onDragStart={(event) => onDragStart(event, "bar-chart")} draggable>
      Biểu đồ cột
    </div>
  );
}

export function BarChartWrapper(props) {
  return (
    <NodeContainer {...props} label="Biểu đồ cột" isLeftHandle className="chart-container">
      <BarChartNode />
    </NodeContainer>
  );
}

BarChartWrapper.Sidebar = Sidebar;
