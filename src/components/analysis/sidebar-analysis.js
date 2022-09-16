import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from "@chakra-ui/react";
import {
  ScatterChartWrapper,
  ExampleDataWrapped,
  FilterWrapper,
  GroupWrapper,
  MergeWrapper,
  SliceWrapper,
  SortWrapper,
  ExportDataWrapper,
  FileDataWrapper,
  HttpRequestWrapper,
  PasteDataWrapper,
  HistogramChartWrapper,
  BarChartWrapper,
  StatsWrapper,
  LineChartWrapper,
  GroupChartWrapper,
} from "./nodes";

export function SidebarAnalysis() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside>
      <Accordion defaultIndex={[0, 1, 2]} allowToggle allowMultiple>
        <AccordionItem border="none">
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Input
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <FileDataWrapper.Sidebar onDragStart={onDragStart} />
            <PasteDataWrapper.Sidebar onDragStart={onDragStart} />
            <HttpRequestWrapper.Sidebar onDragStart={onDragStart} />
            <ExampleDataWrapped.Sidebar onDragStart={onDragStart} />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Transform
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <SliceWrapper.Sidebar onDragStart={onDragStart} />
            <FilterWrapper.Sidebar onDragStart={onDragStart} />
            <MergeWrapper.Sidebar onDragStart={onDragStart} />
            <SortWrapper.Sidebar onDragStart={onDragStart} />
            <GroupWrapper.Sidebar onDragStart={onDragStart} />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Visualization
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <ScatterChartWrapper.Sidebar onDragStart={onDragStart} />
            <HistogramChartWrapper.Sidebar onDragStart={onDragStart} />
            <BarChartWrapper.Sidebar onDragStart={onDragStart} />
            <GroupChartWrapper.Sidebar onDragStart={onDragStart} />
            <LineChartWrapper.Sidebar onDragStart={onDragStart} />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Misc
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <ExportDataWrapper.Sidebar onDragStart={onDragStart} />
            <StatsWrapper.Sidebar onDragStart={onDragStart} />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}
