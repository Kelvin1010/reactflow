import React from 'react'

const setColumns = {
    x: "xColumn",
    y: "yColumn",
    z: "zColumn"
}

function MoveColumnsOfData(input, { xColumn, yColumn, zColumn, kColumn, hColumn, tColumn }) {
    if (!Array.isArray(input)) {
        return [];
    }

    return input?.map((i) => ({ x: i[xColumn], y: i[yColumn], y: i[zColumn], z: i[kColumn], h: i[hColumn], t: i[tColumn] }));
}

export default MoveColumnsOfData