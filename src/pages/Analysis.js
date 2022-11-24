import ReactFlow, {addEdge, Background, Controls, getRectOfNodes, MarkerType, Position, useEdgesState, useNodesState } from "react-flow-renderer";
import { useCallback, useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { useRecoilValue, useSetRecoilState } from "recoil";
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
import { Bubble3dChartWrapper } from "../components/analysis/nodes/visualization/scatter/bubble-3d-chart";
import { HeatmapShapezieChartWrapper } from "../components/analysis/nodes/visualization/heatmap/heatmap-shapesize-chart";
import { TreeMapsChartWrapper } from "../components/analysis/nodes/visualization/advanced-plots/tree-maps-chart";
import HeaderAnalytics from "../components/header-analytics";
import GroupContainer from "../components/analysis/group-container";
import { createGraphLayout } from "../components/algorithms-layout/layout-elkjs";
import {file} from '../helper/autodraw/stateRecoil';
import NodeAutoDraw from "../components/analysis/node-autodraw";



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
  "bubble-3d-chart": Bubble3dChartWrapper,
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
  "heatmap-shapesize-chart": HeatmapShapezieChartWrapper,
  merge: MergeWrapper,
  sort: SortWrapper,
  "group-node": GroupWrapper,
  "tree-map-chart": TreeMapsChartWrapper,
  stats: StatsWrapper,
  "group-chart": GroupChartWrapper,
  "line-chart": LineChartWrapper,
  "pie-chart": PieChartWrapper,
  "code-node": CodeNodeWrapper,
  "text-node": TextNodeWrapper,
  "image-node": ImageNodeWrapper,
  groupNode: GroupContainer,
  nodeautodraw: NodeAutoDraw,
};

const rfStyle = {
//   backgroundColor: "#1A192B",
    backgroundColor: "black",
};

let id = 0;
const getId = () => `dndnode_${id++}`;

function Analysis() {
  const setValueAtom = useSetRecoilState(atomState);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const selectedNodes = Array.from(nodes).filter((n) => n.selected);
  const tt = getRectOfNodes(selectedNodes);
  const filehere = useRecoilValue(file)
  const [variant, setVariant] = useState('cross');

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

  const handleCreateGroup = () => {
    if(selectedNodes?.length > 1){
      const newNodeGroup = {
        id: getId(),
        data: { label: `node group-${getId()}` },
        type: 'groupTp',
        position: {x: tt.x, y: tt.y},
        style: { backgroundColor: 'rgba(0,89,220,.08)', width: Number(tt.width+50), height: Number(tt.height+50), paddingTop: '20px', color:'black', zIndex:1 }
      }
      setNodes([...nodes, newNodeGroup])
      selectedNodes?.forEach(item => {
        setNodes(nds => nds.map(node => node.id === item.id ? ({...node,
          style:{zIndex: 999},
          position: {x: 5, y: 30},
          parentNode: newNodeGroup.id, 
          extent: 'parent'
        }): node))
      })
      createGraphLayout(
        nodes,
        edges
      );
    }
  }

  //Take data to draw 
  useEffect(() => {
    if(filehere.length > 0) {
      let nodes = filehere.map((item) => (
        {
          id: String(item.name),
          type: 'nodeautodraw',
          data: { 
            label: `${item.name}`, 
            input: `${item.input}`,
            output: `${item.output}`,
            inof:`${item.input_name}`,
            typenode: `${item.op_type}`
          },
          position: {x: 0, y: 0},
        }
      ));
      let edges = [];
      if (Array.isArray(filehere)) {
        filehere?.forEach((item)=> {
          let inputs = item.input_name?.split(",");
          if(inputs) inputs.forEach((input)=> {
            if(!nodes.find((node)=> {return node.id == input;})) {
              nodes.push({
                  id: String(input),
                  type: `nodeautodraw`,
                  data: { 
                    label: input, 
                    input: null,
                  },
                  position: {x: 0, y: 0},
              })
            }
          })
        })

        filehere?.forEach((item)=> {
          let outputName = item.name;
          if (item.input_name) {
            let inputs = item.input_name?.split(",");
            inputs.forEach((input) => {
              edges.push({
                id: String(`edge-${input}-${outputName}`),
                target: outputName,
                source: input,
                animated: true,
                type: 'step',
                style: { stroke: 'white' },
                markerEnd: {
                  type: MarkerType.ArrowClosed,
                },
              })
            })
          }
        })
      }
      
      (async () => {
        const res = await createGraphLayout(
          nodes,
          edges
        );
        setNodes(res.nodes)
        setEdges(res.edges)
      })()
    }
    handleCreateGroup()
  }, [filehere])

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
            onMouseUp={handleCreateGroup}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            nodeTypes={nodeTypes}
            style={rfStyle}
          >
            <Controls showZoom={true} />
            <Background variant={variant} size={1} color="#99b3ec"/>
          </ReactFlow>
        </div>
      </div>
    </Box>
  );
}

export default Analysis;
