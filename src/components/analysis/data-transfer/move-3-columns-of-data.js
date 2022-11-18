import React from 'react'

function Move3ColumnsOfData(input, { xColumn, yColumn, zColumn }) {
    if (!Array.isArray(input)) {
        return [];
    }
    
    return input?.map((i) => ({ x: i[xColumn], y: i[yColumn], z: i[zColumn] }));
}

export default Move3ColumnsOfData