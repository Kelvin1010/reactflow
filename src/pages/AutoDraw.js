import { Box } from '@chakra-ui/react';
import React, { useCallback } from 'react'
import ReactFlow, { addEdge, Background, Controls, MiniMap, useEdgesState, useNodesState } from 'react-flow-renderer'
import SidebarAutoDraw from '../components/autodraw/SidebarAutoDraw';
import { Header } from '../components/header';

function AutoDraw() {

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

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
                        onConnect={onConnect}
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
            </div>
        </Box>
    )
}

export default AutoDraw