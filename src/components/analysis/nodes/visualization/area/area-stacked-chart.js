import React, { useEffect, useState } from 'react'
import { getIncomers, useEdges, useNodes, useReactFlow } from 'react-flow-renderer';
import { useRecoilValue } from 'recoil';
import { atomState } from '../../../../../atom';
import { NodeContainer } from '../../../node-container';
import { Box, FormControl, FormLabel, Select, Stack } from "@chakra-ui/react";
import { Area } from '@ant-design/plots';



const options = {
    reponsive: true,
};
  
const initialState = {
    xColumn: "",
    yColumn: "",
    zColumn: "",
};



function AreaStackedChart({ onCallback, id }) {

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
        var output = areaStackedChartTransform(atomParent.data.output, initialInput);
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
        var output = areaStackedChartTransform(atomParent.data.output, { ...input, [name]: value });
        setInput({ ...input, [name]: value });
        setOutput(output);
        onCallback({ input: { ...input, [name]: value }, output: atomParent.data.output });
    }

    const data = output;

    const config = {
        data,
        xField: 'x',
        yField: 'y',
        seriesField: 'z',
        slider: {
          start: 0.1,
          end: 0.9,
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
                <Area {...config} />
            </Stack>
            )}
        </Box>
    )
}

export default AreaStackedChart


function areaStackedChartTransform(input, { xColumn, yColumn, zColumn }) {
    if (!Array.isArray(input)) {
      return [];
    }
  
    return input?.map((i) => ({ x: i[xColumn], y: i[yColumn], z: i[zColumn] }));
}

function Sidebar({ onDragStart }) {
    return (
      <div className="dndnode" onDragStart={(event) => onDragStart(event, "area-stacked-chart")} draggable>
        Biểu đồ Area xếp chồng
      </div>
    );
}
  
export function AreaStackedChartWrapper(props) {
    return (
      <NodeContainer {...props} label="Biểu đồ Area xếp chồng" isLeftHandle className="chart-container">
        <AreaStackedChart />
      </NodeContainer>
    );
}
  
AreaStackedChartWrapper.Sidebar = Sidebar;