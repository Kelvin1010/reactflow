import ReactFlow, { addEdge, Background, Controls, Position, useEdgesState, useNodesState } from "react-flow-renderer";
import { useCallback, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { useSetRecoilState } from "recoil";
import { atomState } from "../atom";
import { Sidebar, SidebarAnalysis } from "../components/analysis/sidebar-analysis";
import { Header } from "../components/header";
import {
  ScatterChartWrapper,
  ExampleDataWrapped,
  FilterWrapper,
  GroupWrapper,
  MergeWrapper,
  SliceWrapper,
  SortWrapper,
  FileDataWrapper,
  HttpRequestWrapper,
  PasteDataWrapper,
  ExportDataWrapper,
  HistogramChartWrapper,
  StatsWrapper,
  LineChartWrapper,
  GroupChartWrapper,
} from "../components/analysis/nodes";
import { Box } from "@chakra-ui/react";
import { CodeNodeWrapper } from "../components/analysis/nodes/simplenode/CodeNode";
import { TextNodeWrapper } from "../components/analysis/nodes/simplenode/TextNode";
import { ImageNodeWrapper } from "../components/analysis/nodes/simplenode/ImageNode";
import { PieChartWrapper } from "../components/analysis/nodes/visualization/pie/pie-chart-node";
import { BarChartWrapper } from "../components/analysis/nodes/visualization/column/bar-chart-node";
import { AreaBasicChartWrapper } from "../components/analysis/nodes/visualization/area/area-chart-basic-node";
import { ScatterPlotChartWrapper } from "../components/analysis/nodes/visualization/scatter/scatter-plot-chart-node";
import { MultipleLinePlotAnimationWrapper } from "../components/analysis/nodes/visualization/line/multiple-line-plot-animation";
import { StepLineChartWrapper } from "../components/analysis/nodes/visualization/line/step-line-chart";
import { AreaStackedChartWrapper } from "../components/analysis/nodes/visualization/area/area-stacked-chart";
import { ColumnBasicSliderChartWrapper } from "../components/analysis/nodes/visualization/column/column-basic-slider-chart";
import { ColumnStackedChartWrapper } from "../components/analysis/nodes/visualization/column/column-stacked-chart";
import { ColumnGroupChartWrapper } from "../components/analysis/nodes/visualization/column/column-group-chart";
import { PercentColumnChartWrapper } from "../components/analysis/nodes/visualization/column/percent-column-chart";
import { BarWrapper } from "../components/analysis/nodes/visualization/bar/bar-chart";
import { BarStackedChartWrapper } from "../components/analysis/nodes/visualization/bar/bar-stacked-chart";
import { BarGroupChartWrapper } from "../components/analysis/nodes/visualization/bar/bar-group-chart";
import { PercentBarChartWrapper } from "../components/analysis/nodes/visualization/bar/percent-bar-chart";
import { BubblePlotChartWrapper } from "../components/analysis/nodes/visualization/scatter/bubble-plot-chart";

const nodeTypes = {
  "example-data": ExampleDataWrapped,
  file: FileDataWrapper,
  http: HttpRequestWrapper,
  export: ExportDataWrapper,
  paste: PasteDataWrapper,
  slice: SliceWrapper,
  filter: FilterWrapper,
  "scatter-chart": ScatterChartWrapper,
  "scatter-plot-chart": ScatterPlotChartWrapper,
  "bubble-chart": BubblePlotChartWrapper,
  "area-basic-chart": AreaBasicChartWrapper,
  "area-stacked-chart": AreaStackedChartWrapper,
  "histogram-chart": HistogramChartWrapper,
  "bar-chart": BarChartWrapper,
  "bar": BarWrapper,
  "bar-stacked-chart": BarStackedChartWrapper,
  "bar-group-chart": BarGroupChartWrapper,
  "bar-percent-chart": PercentBarChartWrapper,
  "column-group-chart": ColumnGroupChartWrapper,
  "column-basic-slider-chart": ColumnBasicSliderChartWrapper,
  "column-stacked-chart": ColumnStackedChartWrapper,
  "percent-column-chart": PercentColumnChartWrapper,
  "multiple-line-plot-animation-chart": MultipleLinePlotAnimationWrapper,
  "step-line-chart": StepLineChartWrapper,
  merge: MergeWrapper,
  sort: SortWrapper,
  "group-node": GroupWrapper,
  stats: StatsWrapper,
  "group-chart": GroupChartWrapper,
  "line-chart": LineChartWrapper,
  "pie-chart": PieChartWrapper,
  "code-node": CodeNodeWrapper,
  "text-node": TextNodeWrapper,
  "image-node": ImageNodeWrapper
};

const rfStyle = {
//   backgroundColor: "#1A192B",
backgroundColor: "black",
};

function Analysis() {
  const setValueAtom = useSetRecoilState(atomState);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback((connection) => setEdges((eds) => addEdge(connection, eds)), [setEdges]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: nanoid(),
        type,
        position,
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        dragHandle: ".custom-drag-handle",
        data: {},
      };

      setNodes((nds) => nds.concat(newNode));
      setValueAtom((oldAtom) => oldAtom.concat({ id: newNode.id, type, data: {} }));
    },
    [reactFlowInstance, setNodes],
  );

  return (
    <Box height="100%">
      <Header />
      <div className="dndflow">
        <SidebarAnalysis />
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            nodeTypes={nodeTypes}
            style={rfStyle}
          >
            <Controls showZoom={true} />
            <Background />
          </ReactFlow>
        </div>
      </div>
    </Box>
  );
}

export default Analysis;
