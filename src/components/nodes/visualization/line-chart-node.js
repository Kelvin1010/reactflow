import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Box, FormControl, FormLabel, Select, Stack } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { getIncomers, useEdges, useNodes, useReactFlow } from "react-flow-renderer";
import { NodeContainer } from "../../node-container";
import { atomState } from "../../../atom";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
  reponsive: true,
};

const initialState = {
  xColumn: "",
  yColumn: "",
};

function LineChartNode({ onCallback, id }) {
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
      var output = lineChartTransform(atomParent.data.output, initialInput);
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
    var output = lineChartTransform(atomParent.data.output, { ...input, [name]: value });
    setInput({ ...input, [name]: value });
    setOutput(output);
    onCallback({ input: { ...input, [name]: value }, output: atomParent.data.output });
  }
  

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
          <Line
            options={options}
            data={{
              labels: output.map((i) => i.x),
              datasets: [
                {
                  label: "dataset",
                  data: output.map((i) => i.y),
                  borderColor: "rgb(255, 99, 132)",
                  backgroundColor: "rgba(255, 99, 132, 0.5)",
                },
              ],
            }}
          />
        </Stack>
      )}
    </Box>
  );
}

function lineChartTransform(input, { xColumn, yColumn }) {
  if (!Array.isArray(input)) {
    return [];
  }

  return input?.map((i) => ({ x: i[xColumn], y: i[yColumn] }));
}

function Sidebar({ onDragStart }) {
  return (
    <div className="dndnode" onDragStart={(event) => onDragStart(event, "line-chart")} draggable>
      Biểu đồ đường thẳng
    </div>
  );
}

export function LineChartWrapper(props) {
  return (
    <NodeContainer {...props} label="Biểu đồ đường thẳng" isLeftHandle className="chart-container">
      <LineChartNode />
    </NodeContainer>
  );
}

LineChartWrapper.Sidebar = Sidebar;
