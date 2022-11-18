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
  StatsWrapper,
  LineChartWrapper,
  GroupChartWrapper,
} from "./nodes";
import { CodeNodeWrapper } from "./nodes/simplenode/CodeNode";
import { ImageNodeWrapper } from "./nodes/simplenode/ImageNode";
import { TextNodeWrapper } from "./nodes/simplenode/TextNode";
import PieChartNode, { PieChartWrapper } from "./nodes/visualization/pie/pie-chart-node";
import { AreaChartOutlined, BarChartOutlined, DotChartOutlined, LineChartOutlined, PieChartOutlined, BorderInnerOutlined } from '@ant-design/icons';
import { BarChartWrapper } from "./nodes/visualization/column/bar-chart-node";
import { AreaBasicChartWrapper } from "./nodes/visualization/area/area-chart-basic-node";
import ScatterPlotChartNode, { ScatterPlotChartWrapper } from "./nodes/visualization/scatter/scatter-plot-chart-node";
import { MultipleLinePlotAnimationWrapper } from "./nodes/visualization/line/multiple-line-plot-animation";
import { StepLineChartWrapper } from "./nodes/visualization/line/step-line-chart";
import { AreaStackedChartWrapper } from "./nodes/visualization/area/area-stacked-chart";
import { ColumnBasicSliderChartWrapper } from "./nodes/visualization/column/column-basic-slider-chart";
import { ColumnStackedChartWrapper } from "./nodes/visualization/column/column-stacked-chart";
import { ColumnGroupChartWrapper } from "./nodes/visualization/column/column-group-chart";
import { PercentColumnChartWrapper } from "./nodes/visualization/column/percent-column-chart";
import { BarWrapper } from "./nodes/visualization/bar/bar-chart";
import { BarStackedChartWrapper } from "./nodes/visualization/bar/bar-stacked-chart";
import { BarGroupChartWrapper } from "./nodes/visualization/bar/bar-group-chart";
import { PercentBarChartWrapper } from "./nodes/visualization/bar/percent-bar-chart";
import { BubblePlotChartWrapper } from "./nodes/visualization/scatter/bubble-plot-chart";
import { Bubble3dChartWrapper } from "./nodes/visualization/scatter/bubble-3d-chart";
import { HeatmapShapezieChartWrapper } from "./nodes/visualization/heatmap/heatmap-shapesize-chart";

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
                Simple Node
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>
            <CodeNodeWrapper.Sidebar onDragStart={onDragStart} />
            <TextNodeWrapper.Sidebar onDragStart={onDragStart} />
            <ImageNodeWrapper.Sidebar onDragStart={onDragStart}/>
          </AccordionPanel>
        </AccordionItem>
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
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <AreaChartOutlined /> Area
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <AreaBasicChartWrapper.Sidebar onDragStart={onDragStart} />
                <AreaStackedChartWrapper.Sidebar onDragStart={onDragStart} />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <LineChartOutlined /> Line
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <LineChartWrapper.Sidebar onDragStart={onDragStart} />
                <MultipleLinePlotAnimationWrapper.Sidebar onDragStart={onDragStart} />
                <StepLineChartWrapper.Sidebar onDragStart={onDragStart} />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <BarChartOutlined /> Column
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <BarChartWrapper.Sidebar onDragStart={onDragStart} />
                <ColumnBasicSliderChartWrapper.Sidebar onDragStart={onDragStart} />
                <ColumnStackedChartWrapper.Sidebar onDragStart={onDragStart} />
                <ColumnGroupChartWrapper.Sidebar onDragStart={onDragStart} />
                <PercentColumnChartWrapper.Sidebar onDragStart={onDragStart} />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <BarChartOutlined /> Bar
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <BarWrapper.Sidebar onDragStart={onDragStart} />
                <BarStackedChartWrapper.Sidebar onDragStart={onDragStart} />
                <BarGroupChartWrapper.Sidebar onDragStart={onDragStart} />
                <PercentBarChartWrapper.Sidebar onDragStart={onDragStart} />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <PieChartOutlined /> Pie
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <PieChartWrapper.Sidebar onDragStart={onDragStart} />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <DotChartOutlined /> Scatter and Bubble
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <DotChartOutlined /> Scatter
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel>
                  <ScatterChartWrapper.Sidebar onDragStart={onDragStart} />
                  <ScatterPlotChartWrapper.Sidebar onDragStart={onDragStart} />
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <DotChartOutlined /> Bubble
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel>
                  <BubblePlotChartWrapper.Sidebar onDragStart={onDragStart} />
                  <Bubble3dChartWrapper.Sidebar onDragStart={onDragStart} />
                </AccordionPanel>
              </AccordionItem>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <BorderInnerOutlined /> Heatmap
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <HeatmapShapezieChartWrapper.Sidebar onDragStart={onDragStart} />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    <BorderInnerOutlined /> Radar
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                hhhh
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Others
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <HistogramChartWrapper.Sidebar onDragStart={onDragStart} />
                <GroupChartWrapper.Sidebar onDragStart={onDragStart} />
              </AccordionPanel>
            </AccordionItem>
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
