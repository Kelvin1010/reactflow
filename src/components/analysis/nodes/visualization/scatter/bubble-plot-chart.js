import React, { useEffect, useState } from 'react'
import { NodeContainer } from '../../../node-container';
import { Box, FormControl, FormLabel, Select, Stack } from "@chakra-ui/react";
import { getIncomers, useEdges, useNodes, useReactFlow } from "react-flow-renderer";
import { useRecoilValue } from 'recoil';
import { atomState } from '../../../../../atom';
import { Scatter } from '@ant-design/plots';


const options = {
    reponsive: true,
};
  
const initialState = {
    xColumn: "",
    yColumn: "",
    zColumn: "",
    kColumn: "",
};

function BubblePlotChart({ onCallback, id }) {

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
            zColumn: columnsParent.includes(input.zColumn) ? input.zColumn : columnsParent[0],
            kColumn: columnsParent.includes(input.kColumn) ? input.kColumn : columnsParent[0],
        };
        var output =  bubblePlotChartTransform(atomParent.data.output, initialInput);
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
        var output =  bubblePlotChartTransform(atomParent.data.output, { ...input, [name]: value });
        setInput({ ...input, [name]: value });
        setOutput(output);
        onCallback({ input: { ...input, [name]: value }, output: atomParent.data.output });
    }

    const data = output;

    const processData = data.map((item) => {
        item['Average annual wage'] = item['Average annual wage'] * 1;
        item['probability'] = item['probability'] * 1;
        item['numbEmployed'] = item['numbEmployed'] * 1;
        return item;
    });
    const labels = ['Airline Pilots, Copilots and Flight Engineers', 'Benefits Managers'];
    const config = {
        appendPadding: 30,
        data: processData,
        xField: 'probability',
        yField: 'Average annual wage',
        colorField: 'education',
        size: [2, 16],
        sizeField: 'numbEmployed',
        shape: 'circle',
        yAxis: {
          nice: false,
          min: -20000,
          tickCount: 5,
          position: 'right',
          label: {
            formatter: (value) => {
              return Math.floor(value / 1000) + 'K';
            },
          },
          grid: {
            line: {
              style: {
                stroke: '#eee',
              },
            },
          },
          line: {
            style: {
              stroke: '#aaa',
            },
          },
        },
        tooltip: {
          fields: ['probability', 'Average annual wage', 'numbEmployed'],
        },
        legend: {
          position: 'top',
        },
        xAxis: {
          min: -0.04,
          max: 1.04,
          nice: false,
          grid: {
            line: {
              style: {
                stroke: '#eee',
              },
            },
          },
          line: false,
          label: false,
        },
        label: {
          formatter: (item) => {
            return labels.includes(item['short occupation']) ? item['short occupation'] : '';
          },
          offsetY: -10,
        },
        annotations: [
          {
            type: 'line',
            start: [-0.04, 100000],
            end: [1.04, 30000],
            style: {
              stroke: '#aaa',
            },
          },
          {
            type: 'text',
            position: ['1.03', 'max'],
            content: 'Average annual wage',
            style: {
              textAlign: 'right',
              fontWeight: '500',
              fill: 'rgb(92, 92, 92)',
            },
          },
          {
            type: 'text',
            position: ['1.03', 'min'],
            content: 'Most likely to \nbe automated ',
            style: {
              textAlign: 'right',
              fontWeight: '500',
              fill: 'rgb(92, 92, 92)',
            },
          },
          {
            type: 'text',
            position: ['-0.03', 'min'],
            content: 'Least likely to \nbe automated ',
            style: {
              textAlign: 'left',
              fontWeight: '500',
              fill: 'rgb(92, 92, 92)',
            },
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
                    <FormLabel>x-axis</FormLabel>
                    <Select name="xColumn" value={input.xColumn} onChange={handleChangeInput}>
                    {columns.map((value) => (
                        <option key={value} value={value}>
                        {value}
                        </option>
                    ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>y-axis</FormLabel>
                    <Select name="yColumn" value={input.yColumn} onChange={handleChangeInput}>
                    {columns.map((value) => (
                        <option key={value} value={value}>
                        {value}
                        </option>
                    ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>z-axis</FormLabel>
                    <Select name="zColumn" value={input.zColumn} onChange={handleChangeInput}>
                    {columns.map((value) => (
                        <option key={value} value={value}>
                        {value}
                        </option>
                    ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel>k-axis</FormLabel>
                    <Select name="kColumn" value={input.kColumn} onChange={handleChangeInput}>
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

export default BubblePlotChart


function bubblePlotChartTransform(input, { xColumn, yColumn, zColumn, kColumn }) {
    if (!Array.isArray(input)) {
      return [];
    }
  
    return input?.map((i) => ({ x: i[xColumn], y: i[yColumn], z: i[zColumn], k: i[kColumn] }));
}
  
function Sidebar({ onDragStart }) {
    return (
      <div className="dndnode" onDragStart={(event) => onDragStart(event, "bubble-chart")} draggable>
        Biểu đồ cột bubble
      </div>
    );
}
  
export function BubblePlotChartWrapper(props) {
    return (
      <NodeContainer {...props} label="Biểu đồ bubble" isLeftHandle className="chart-container">
        <BubblePlotChart />
      </NodeContainer>
    );
}
  
BubblePlotChartWrapper.Sidebar = Sidebar;