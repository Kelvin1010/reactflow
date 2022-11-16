import React, { useEffect, useState } from 'react'
import { NodeContainer } from '../../../node-container';
import { Box, FormControl, FormLabel, Select, Stack } from "@chakra-ui/react";
import { getIncomers, useEdges, useNodes, useReactFlow } from "react-flow-renderer";
import { useRecoilValue } from 'recoil';
import { atomState } from '../../../../../atom';
import { Column, G2 } from '@ant-design/plots';



const options = {
    reponsive: true,
};
  
const initialState = {
    xColumn: "",
    yColumn: "",
    zColumn: "",
};


function PercentColumnChart({ onCallback, id }) {

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
        };
        var output = percentColumnChartTransform(atomParent.data.output, initialInput);
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
        var output = percentColumnChartTransform(atomParent.data.output, { ...input, [name]: value });
        setInput({ ...input, [name]: value });
        setOutput(output);
        onCallback({ input: { ...input, [name]: value }, output: atomParent.data.output });
    }

    const data = output;
    console.log(data)

    G2.registerInteraction('element-link', {
        start: [
          {
            trigger: 'interval:mouseenter',
            action: 'element-link-by-color:link',
          },
        ],
        end: [
          {
            trigger: 'interval:mouseleave',
            action: 'element-link-by-color:unlink',
          },
        ],
      });
      const config = {
        data,
        xField: 'x',
        yField: 'y',
        seriesField: 'z',
        isPercent: true,
        isStack: true,
        meta: {
          value: {
            min: 0,
            max: 1,
          },
        },
        label: {
          position: 'middle',
          content: (item) => {
            // return console.log(item)
            return `${(item?.y * 100).toFixed(2)}%`;
          },
          style: {
            fill: '#fff',
          },
        },
        tooltip: false,
        interactions: [
          {
            type: 'element-highlight-by-color',
          },
          {
            type: 'element-link',
          },
        ],
    }

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
                <Column {...config} />
                </Stack>
            )}
        </Box>
    )
}

export default PercentColumnChart


function percentColumnChartTransform(input, { xColumn, yColumn, zColumn }) {
    if (!Array.isArray(input)) {
      return [];
    }
  
    return input?.map((i) => ({ x: i[xColumn], y: i[yColumn], z: i[zColumn] }));
}
  
function Sidebar({ onDragStart }) {
    return (
      <div className="dndnode" onDragStart={(event) => onDragStart(event, "percent-column-chart")} draggable>
        Biểu đồ cột phần trăm
      </div>
    );
}
  
export function PercentColumnChartWrapper(props) {
    return (
      <NodeContainer {...props} label="Biểu đồ cột phần trăm" isLeftHandle className="chart-container">
        <PercentColumnChart />
      </NodeContainer>
    );
}
  
PercentColumnChartWrapper.Sidebar = Sidebar;