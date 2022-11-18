import React from 'react';


function Move2ColumnsOfData(input, { xColumn, yColumn }) {
    if (!Array.isArray(input)) {
        return [];
    }
    
    return input?.map((i) => ({ x: i[xColumn], y: i[yColumn] }));
}

export default Move2ColumnsOfData
// {x:"xColumn", z:"yColumn"}
// [x:3, z:7]