import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import * as d3 from "d3-array";
import { Box, FormControl, FormLabel, Select, Stack } from "@chakra-ui/react";
import { getIncomers, useEdges, useNodes, useReactFlow } from "react-flow-renderer";
import { Chart as ChartJS, LinearScale, Tooltip, Legend, CategoryScale, BarElement, Title } from "chart.js";
import { useRecoilValue } from "recoil";
import isNumber from "lodash/isNumber";
import { NodeContainer } from "../../node-container";
import { atomState } from "../../../atom";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const initialState = {
  column: "",
};

function HistogramChartNode({ onCallback, id }) {
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
        column: columnsParent.includes(input.column) ? input.column : columnsParent[0],
      };
      var output = histogramTransform(atomParent.data.output, initialInput);
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
    var output = histogramTransform(atomParent.data.output, { ...input, [name]: value });
    setInput({ ...input, [name]: value });
    setOutput(output);
    onCallback({ input: { ...input, [name]: value } });
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
            <Select name="column" value={input.column} onChange={handleChangeInput}>
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
                  label: input.column,
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

function histogramTransform(input, { column }) {
  if (!isNumber(input[0][column])) {
    return [];
  }

  const value = binTransform(input, { value: (d) => d[column] });
  return value;
}

function binTransform(data, { value, x = value, y = () => 1, thresholds = 15 }) {
  const X = d3.map(data, x);
  const Y0 = d3.map(data, y);
  const I = d3.range(X.length);

  const bins = d3
    .bin()
    .thresholds(thresholds)
    .value((i) => X[i])(I);
  const Y = Array.from(bins, (I) => d3.sum(I, (i) => Y0[i]));

  return bins.map((d, i) => ({
    x: d.x1,
    y: Y[i],
  }));
}

function Sidebar({ onDragStart }) {
  return (
    <div className="dndnode" onDragStart={(event) => onDragStart(event, "histogram-chart")} draggable>
      Biểu đồ Histogram
    </div>
  );
}

export function HistogramChartWrapper(props) {
  return (
    <NodeContainer {...props} label="Biểu đồ Histogram" isLeftHandle className="chart-container">
      <HistogramChartNode />
    </NodeContainer>
  );
}

HistogramChartWrapper.Sidebar = Sidebar;
