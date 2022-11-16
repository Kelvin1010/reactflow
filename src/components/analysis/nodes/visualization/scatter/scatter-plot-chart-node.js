import { Scatter } from '@ant-design/plots';
import { Box, FormControl, FormLabel, Image, Select, Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { getIncomers, useEdges, useNodes, useReactFlow } from 'react-flow-renderer';
import { useRecoilValue } from 'recoil';
import { atomState } from '../../../../../atom';
import { NodeContainer } from '../../../node-container';


const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
};
  
const initialState = {
    xColumn: "",
    yColumn: "",
};



function ScatterPlotChartNode({ onCallback, id }) {

    const { getNode } = useReactFlow();
    const allNodes = useNodes();
    const allEdges = useEdges();
    const [input, setInput] = useState(initialState);
    const [columns, setColumns] = useState([]);
    const [output, setOutput] = useState([]);
    const nodeParent = getIncomers(getNode(id), allNodes, allEdges)[0];
    const atoms = useRecoilValue(atomState);
    const atomParent = atoms.find((n) => n.id === nodeParent?.id);

    useEffect(() => {
        if (atomParent?.data) {
        var columnsParent = Object.keys(atomParent.data?.output?.[0] ?? {});
        var initialInput = {
            xColumn: columnsParent.includes(input.xColumn) ? input.xColumn : columnsParent[0],
            yColumn: columnsParent.includes(input.yColumn) ? input.yColumn : columnsParent[0],
        };
        var output = scatterplot(atomParent.data.output, initialInput);
        setInput(initialInput);
        setOutput(output);
        onCallback({ output: atomParent.data.output, input: initialInput });
        setColumns(columnsParent);
        }

        if (!atomParent) {
        setOutput([]);
        setColumns([]);
        onCallback({ output: null, input: null });
        }
    }, [atomParent?.data]);

    function handleChangeInput(event) {
        var { value, name } = event.target;
        var output = scatterplot(atomParent.data.output, { ...input, [name]: value });
        setInput({ ...input, [name]: value });
        setOutput(output);
        onCallback({ input: { ...input, [name]: value }, output: atomParent.data.output });
    }

    const data = output;

    const config = {
        data,
        xField: 'x',
        yField: 'y',
        size: 5,
        pointStyle: {
          stroke: '#777777',
          lineWidth: 1,
          fill: '#5B8FF9',
        },
        regressionLine: {
          type: 'pow', // linear, exp, loess, log, poly, pow, quad
        },
    };


    return (
        <Box>
            {columns.length <= 0 ? (
                <Box position="relative">
                <div>← kết nối dataset...</div>
                </Box>
            ) : (
                <Stack>
                  <FormControl>
                      <FormLabel>Title data</FormLabel>
                      <Select name="xColumn" value={input.xColumn} onChange={handleChangeInput}>
                      {columns.map((value) => (
                          <option key={value} value={value}>
                          {value}
                          </option>
                      ))}
                      </Select>
                  </FormControl>
                  <FormControl>
                      <FormLabel>Value data</FormLabel>
                      <Select name="yColumn" value={input.yColumn} onChange={handleChangeInput}>
                      {columns.map((value) => (
                          <option key={value} value={value}>
                          {value}
                          </option>
                      ))}
                      </Select>
                  </FormControl>
                  <Scatter {...config} />
              </Stack>
          )}
        </Box>
    )
}

export default ScatterPlotChartNode


function scatterplot(input, { xColumn, yColumn }) {
    if (!Array.isArray(input)) {
      return [];
    }
    return input?.map((i) => ({ x: i[xColumn], y: i[yColumn] }));
}
  
function Sidebar({ onDragStart }) {
    return (
      <div className="dndnode" onDragStart={(event) => onDragStart(event, "scatter-plot-chart")} draggable>
        Biểu đồ phân tán Plot 
      </div>
    );
}
  
export function ScatterPlotChartWrapper(props) {
    return (
      <NodeContainer {...props} label="Biểu đồ phân tán Plot" isLeftHandle className="chart-container">
        <ScatterPlotChartNode />
      </NodeContainer>
    );
}
  
ScatterPlotChartWrapper.Sidebar = Sidebar;