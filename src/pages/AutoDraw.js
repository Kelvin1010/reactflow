import { Box } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react'
import ReactFlow, { addEdge, Background, Controls, getRectOfNodes, MarkerType, MiniMap, useEdgesState, useNodesState } from 'react-flow-renderer'
import { useRecoilValue } from 'recoil';
import { createGraphLayout } from '../components/autodraw/algorithms-layout/layout-elkjs';
import InfoNode from '../components/autodraw/InfoNode';
import CustomNode from '../components/autodraw/nodes/CustomNode';
import GroupNode from '../components/autodraw/nodes/GroupNode';
import SidebarAutoDraw from '../components/autodraw/SidebarAutoDraw';
import { Header } from '../components/header';
import {file} from '../helper/autodraw/stateRecoil';


// const initialNodes = [
// {
//     id: 'hidden-1',
//     data: { label: 'Node 1', input: 'input 0', output: 'output 0' },
//     position: { x: 250, y: 5 },
// },
// { id: 'hidden-2', data: { label: 'Node 2', input: 'input 1', output: 'output 1' }, position: { x: 100, y: 100 } },
// { id: 'hidden-3', data: { label: 'Node 3', input: 'input 2', output: 'output 2' }, position: { x: 400, y: 100 } },
// { id: 'hidden-4', data: { label: 'Node 4', input: 'input 3', output: 'output 3' }, position: { x: 400, y: 200 } },
// ];

// const initialEdges = [
// { id: 'hidden-e1-2', source: 'hidden-1', target: 'hidden-2' },
// { id: 'hidden-e1-3', source: 'hidden-1', target: 'hidden-3' },
// { id: 'hidden-e3-4', source: 'hidden-3', target: 'hidden-4' },
// ];

const nodeTypes = {
    nodeT: CustomNode,
    groupT: GroupNode
}

let id = 0;
const getId = () => `dndnode_${id++}`;

function AutoDraw() {

    const [isOpen, setIsOpen] = useState(false);
    const [valueNode, setValueNode] = useState('');

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);
    const selectedNodes = Array.from(nodes).filter((n) => n.selected);
    const tt = getRectOfNodes(selectedNodes)
    const filehere = useRecoilValue(file)

    //Take data to draw 
    useEffect(() => {
        if(filehere.length > 0) {
          let nodes = filehere.map((item) => (
            {
              id: String(item.name),
              type: 'nodeT',
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
                      type: `nodeTp`,
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
                    style: { stroke: 'black' },
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

    //Create Group Node
    const handleCreateGroup = () => {
        if(selectedNodes?.length > 1){
          const newNodeGroup = {
            id: getId(),
            data: { label: `node group-${getId()}` },
            type: 'groupT',
            position: {x: tt.x, y: tt.y},
            style: { backgroundColor: 'rgba(0,89,220,.08)', width: Number(tt.width +50), height: Number(tt.height +50), paddingTop: '20px' }
          }
          setNodes([...nodes, newNodeGroup])
          selectedNodes?.forEach(item => {
            setNodes(nds => nds.map(node => node.id === item.id ? ({...node, parentNode: newNodeGroup.id, extent: 'parent'}): node))
          })
        }
    }

    //Click Node
    const handleNodeClick = (e,node) => {
        e.preventDefault();
        setIsOpen(true)
        setValueNode(node)
        console.log(node)
    }

    //Update Node
    const handleUpdate = (e,id) => {
        setNodes((nds) => 
            nds.map((node) => {
                if(node.id === id) {
                    node.data = {
                        ...node.data, 
                        label: e.namenode, 
                        input: e?.input, 
                        output: e?.output
                    }
                }
                return node
            })
        )
    }

    //Close
    const handleClose = () => {
        setIsOpen(false)
    }

    return (
        <Box height={'100%'}>
            <Header />
            <div className='dndflow'>
                <SidebarAutoDraw />
                <div className='reactflow-wrapper'>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        nodeTypes={nodeTypes}
                        onConnect={onConnect}
                        onNodeClick={handleNodeClick}
                        style={{
                            background: 'black',
                            maxHeight:'100%'
                        }}
                        fitView
                    >
                        <Controls />
                        <Background />
                        <MiniMap />
                    </ReactFlow>
                </div>
                {isOpen && <InfoNode data={valueNode} updatefn={handleUpdate} closefn={handleClose}/>}
            </div>
        </Box>
    )
}

export default AutoDraw