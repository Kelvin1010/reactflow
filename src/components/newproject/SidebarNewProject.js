import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react'
import React from 'react'
import { CodeNodeWrapper } from './nodes/other/CodeNode';
import { DefaultNodeWrapper } from './nodes/simplenode/DefaultNode';
import { InputNodeWrapper } from './nodes/simplenode/InputNode';
import { OutputNodeWrapper } from './nodes/simplenode/OutputNode';

function SidebarNewProject() {

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
    };

    return (
        <aside 
            // style={{
            //     width: '12vw'
            // }}
        >
            <Accordion defaultIndex={[0, 1, 2]} allowToggle allowMultiple>
            <AccordionItem border="none">
                <h2>
                    <AccordionButton>
                    <Box flex="1" textAlign="left">
                        Simple
                    </Box>
                    <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel>
                    <DefaultNodeWrapper.Sidebar onDragStart={onDragStart} />
                    <InputNodeWrapper.Sidebar onDragStart={onDragStart} />
                    <OutputNodeWrapper.Sidebar onDragStart={onDragStart} />
                </AccordionPanel>
            </AccordionItem>
            <AccordionItem border="none">
                <h2>
                    <AccordionButton>
                    <Box flex="1" textAlign="left">
                        Code Node
                    </Box>
                    <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel>
                    <CodeNodeWrapper.Sidebar onDragStart={onDragStart} />
                </AccordionPanel>
            </AccordionItem>
            </Accordion>
        </aside>
    )
}

export default SidebarNewProject