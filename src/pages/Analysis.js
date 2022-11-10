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
  BarChartWrapper,
  StatsWrapper,
  LineChartWrapper,
  GroupChartWrapper,
} from "../components/analysis/nodes";
import { Box } from "@chakra-ui/react";
import { CodeNodeWrapper } from "../components/analysis/nodes/simplenode/CodeNode";
import { TextNodeWrapper } from "../components/analysis/nodes/simplenode/TextNode";
import { ImageNodeWrapper } from "../components/analysis/nodes/simplenode/ImageNode";

const nodeTypes = {
  "example-data": ExampleDataWrapped,
  file: FileDataWrapper,
  http: HttpRequestWrapper,
  export: ExportDataWrapper,
  paste: PasteDataWrapper,
  slice: SliceWrapper,
  filter: FilterWrapper,
  "scatter-chart": ScatterChartWrapper,
  "histogram-chart": HistogramChartWrapper,
  "bar-chart": BarChartWrapper,
  merge: MergeWrapper,
  sort: SortWrapper,
  "group-node": GroupWrapper,
  stats: StatsWrapper,
  "group-chart": GroupChartWrapper,
  "line-chart": LineChartWrapper,
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
