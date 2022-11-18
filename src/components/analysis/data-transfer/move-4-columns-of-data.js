import React from 'react'

function Move4ColumnsOfData(input, { xColumn, yColumn, zColumn, kColumn }) {
    if (!Array.isArray(input)) {
        return [];
    }
    
    return input?.map((i) => ({ x: i[xColumn], y: i[yColumn], z: i[zColumn], k: i[kColumn] }));
}

export default Move4ColumnsOfData