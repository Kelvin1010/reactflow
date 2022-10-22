import { Box } from '@chakra-ui/react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { nanoid } from "nanoid";
import ReactFlow, { addEdge, Background, Controls, MiniMap, Position, useEdgesState, useNodesState } from 'react-flow-renderer';
import { useSetRecoilState } from 'recoil';
import { atomState } from '../atom';
import { Header } from '../components/header';
import SidebarNewProject from '../components/newproject/SidebarNewProject';
import { DefaultNodeWrapper } from '../components/newproject/nodes/simplenode/DefaultNode';
import { InputNodeWrapper } from '../components/newproject/nodes/simplenode/InputNode';
import { OutputNodeWrapper } from '../components/newproject/nodes/simplenode/OutputNode';
import { CodeNodeWrapper } from '../components/newproject/nodes/other/CodeNode';
import InfoNode from '../components/newproject/InfoNode';


const nodeTypes = {
    "default-node": DefaultNodeWrapper,
    "input-node": InputNodeWrapper,
    "output-node": OutputNodeWrapper,
    "code-node": CodeNodeWrapper,
};
  
const rfStyle = {
    backgroundColor: "black",
};


const NewProject = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [valueNode, setValueNode] = useState('');

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
    <Box height="100%">
      <Header />
      <div className="dndflow">
        <SidebarNewProject />
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
            onNodeClick={handleNodeClick}
            fitView
            nodeTypes={nodeTypes}
            style={rfStyle}
          >
            <Controls showZoom={true} />
            <Background />
          </ReactFlow>
        </div>
        {isOpen && <InfoNode data={valueNode} updatefn={handleUpdate} closefn={handleClose}/>}
      </div>
    </Box>
  )
};

export default NewProject;
