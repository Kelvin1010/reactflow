import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react'
import React from 'react'
import ReadFile from './ReadFile'

function SidebarAutoDraw() {
  return (
    <aside>
      <Accordion defaultIndex={[0, 1]} allowToggle allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Open File
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <div>
              <ReadFile />
            </div>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </aside>
  )
}

export default SidebarAutoDraw