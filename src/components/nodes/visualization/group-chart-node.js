import { useEffect, useState } from "react";
import { Bar, Line, Scatter } from "react-chartjs-2";
import { Box, Stack, Text } from "@chakra-ui/react";
import { getIncomers, useEdges, useNodes, useReactFlow } from "react-flow-renderer";
import { without } from "lodash";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  CategoryScale,
  BarElement,
  Title,
} from "chart.js";
import { useRecoilValue } from "recoil";
import { NodeContainer } from "../../node-container";
import { atomState } from "../../../atom";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend, CategoryScale, BarElement, Title);

const COLORS = ["#4dc9f6", "#f67019", "#f53794", "#537bc4", "#acc236", "#166a8f", "#00a950", "#58595b", "#8549ba"];

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

function GroupChartNode({ onCallback, id }) {
  const { getNode } = useReactFlow();
  const allNodes = useNodes();
  const allEdges = useEdges();
  const [output, setOutput] = useState({ label: [], datasets: [], type: null });
  const nodeParents = getIncomers(getNode(id), allNodes, allEdges);
  const atoms = useRecoilValue(atomState);
  const atomParents = nodeParents.map((parent) => atoms.find((n) => n.id === parent.id));

  useEffect(() => {
    if (atomParents?.length) {
      var output = groupTransform(without(atomParents, undefined));
      setOutput(output);
      onCallback({ output });
    }

    if (!atomParents) {
      setOutput([]);
      onCallback({ output: null });
    }
  }, [atomParents?.length, atomParents[0]?.data, atomParents[1]?.data]);

  return (
    <Box>
      {atomParents?.length <= 0 ? (
        <Box position="relative">
          <div>← kết nối dataset...</div>
        </Box>
      ) : (
        <Stack>{RenderChart(output)}</Stack>
      )}
    </Box>
  );
}

function RenderChart({ type, labels, datasets }) {
  switch (type) {
    case "scatter-chart":
      return (
        <Scatter
          options={options}
          data={{
            datasets,
          }}
        />
      );

    case "bar-chart":
      return (
        <Bar
          options={options}
          data={{
            labels,
            datasets,
          }}
        />
      );

    case "line-chart":
      return (
        <Line
          options={options}
          data={{
            labels,
            datasets,
          }}
        />
      );

    default:
      return <Text>Bạn nên gộp 2 biểu đồ cùng loại</Text>;
  }
}

function groupTransform(parents) {
  if (!Array.isArray(parents)) {
    return {
      labels: [],
      datasets: [],
    };
  }

  var type = null;
  var labels = [];

  if (parents.every(({ type }) => type === parents?.[1]?.type)) {
    const {
      type: typeOfParent,
      data: { output, input },
    } = parents[0];
    type = typeOfParent;
    labels = output?.map((o) => o[input.xColumn]);
  }

  return {
    type,
    labels,
    datasets: parents?.map(({ data: { input, output } }, index) => ({
      label: input?.yColumn,
      data: datasetsTransform(output, input, type),
      backgroundColor: COLORS[index],
    })),
  };
}

function datasetsTransform(output, input, type) {
  switch (type) {
    case "scatter-chart":
      return output?.map((o) => ({ x: o[input.xColumn], y: o[input.yColumn] }));

    case "bar-chart":
    case "line-chart":
      return output?.map((o) => o[input.yColumn]);

    default:
      return null;
  }
}

function Sidebar({ onDragStart }) {
  return (
    <div className="dndnode" onDragStart={(event) => onDragStart(event, "group-chart")} draggable>
      Biểu đồ gộp
    </div>
  );
}

export function GroupChartWrapper(props) {
  return (
    <NodeContainer {...props} label="Biểu đồ gộp" isLeftHandle className="chart-container">
      <GroupChartNode />
    </NodeContainer>
  );
}

GroupChartWrapper.Sidebar = Sidebar;
