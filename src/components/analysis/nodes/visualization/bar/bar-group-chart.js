import React, { useEffect, useState } from 'react'
import { NodeContainer } from '../../../node-container';
import { Box, FormControl, FormLabel, Select, Stack } from "@chakra-ui/react";
import { getIncomers, useEdges, useNodes, useReactFlow } from "react-flow-renderer";
import { useRecoilValue } from 'recoil';
import { atomState } from '../../../../../atom';
import { Bar, Column } from '@ant-design/plots';
import { Move3ColumnsOfData } from '../../../data-transfer/move-columns-of-data';


const options = {
    reponsive: true,
};
  
const initialState = {
    xColumn: "",
    yColumn: "",
    zColumn: "",
};


function BarGroupChart({ onCallback, id }) {

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
        var output =  Move3ColumnsOfData(atomParent.data.output, initialInput);
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
        var output =  Move3ColumnsOfData(atomParent.data.output, { ...input, [name]: value });
        setInput({ ...input, [name]: value });
        setOutput(output);
        onCallback({ input: { ...input, [name]: value }, output: atomParent.data.output });
    }

    const data = output;

    const config = {
        data,
        isGroup: true,
        xField: 'x',
        yField: 'y',
        seriesField: 'z',
        marginRatio: 0,
        label: {
          position: 'right',
          // 'left', 'middle', 'right'
          offset: 4,
        },
        barStyle: {
          radius: [2, 2, 0, 0],
        },
    };

    return (
        <Box>
            {columns.length <= 0 ? (
                <Box position="relative">
                <div>??? k???t n???i dataset...</div>
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
                <Bar {...config} />
                </Stack>
            )}
        </Box>
    )
}

export default BarGroupChart
  
function Sidebar({ onDragStart }) {
    return (
      <div className="dndnode" onDragStart={(event) => onDragStart(event, "bar-group-chart")} draggable>
        Bi???u ????? c???t nh??m ngang
      </div>
    );
}
  
export function BarGroupChartWrapper(props) {
    return (
      <NodeContainer {...props} label="Bi???u ????? c???t nh??m ngang" isLeftHandle className="chart-container">
        <BarGroupChart />
      </NodeContainer>
    );
}
  
BarGroupChartWrapper.Sidebar = Sidebar;