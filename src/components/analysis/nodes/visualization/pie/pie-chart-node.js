import { Box, FormControl, FormLabel, Select, Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { getIncomers, useEdges, useNodes, useReactFlow } from 'react-flow-renderer';
import { useRecoilValue } from 'recoil';
import { atomState } from '../../../../../atom';
import { NodeContainer } from '../../../node-container';
import { Pie } from '@ant-design/plots';

const options = {
    reponsive: true,
};

const initialState = {
    xColumn: "",
    yColumn: "",
};


function PieChartNode({ onCallback, id }) {

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
          var output = pie(atomParent.data.output, initialInput);
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
        var output = pie(atomParent.data.output, { ...input, [name]: value });
        setInput({ ...input, [name]: value });
        setOutput(output);
        onCallback({ input: { ...input, [name]: value }, output: atomParent.data.output });
    }
    
    const data = output;

    const config = {
        appendPadding: 10,
        data,
        angleField: 'y',
        colorField: 'x',
        radius: 0.8,
        label: {
          type: 'outer',
          content: '{name} {percentage}',
        },
        interactions: [
          {
            type: 'pie-legend-active',
          },
          {
            type: 'element-active',
          },
        ],
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
                  <Pie {...config} />
              </Stack>
          )}
        </Box>
    )
}

export default PieChartNode



function pie(input, { xColumn, yColumn }) {
    if (!Array.isArray(input)) {
      return [];
    }
    return input?.map((i) => ({ x: i[xColumn], y: i[yColumn] }));
}
  
function Sidebar({ onDragStart }) {
    return (
      <div className="dndnode" onDragStart={(event) => onDragStart(event, "pie-chart")} draggable>
        Biểu đồ tròn
      </div>
    );
}
 

export function PieChartWrapper(props) {
    return (
      <NodeContainer {...props} label="Biểu đồ tròn" isLeftHandle className="chart-container">
        <PieChartNode />
      </NodeContainer>
    );
}
  
PieChartWrapper.Sidebar = Sidebar;