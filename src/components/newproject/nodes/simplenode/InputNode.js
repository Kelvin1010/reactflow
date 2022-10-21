import React from 'react'
import { NodeContainer } from '../../NodeContainer';

function InputNode({onCallback, id, isConnectable}) {
    return (
        <div>Input Node</div>
    )
}

function Sidebar({ onDragStart }) {
    return (
      <div className="dndnode" onDragStart={(event) => onDragStart(event, "input-node")} draggable>
        Input Node
      </div>
    );
}
  
export function InputNodeWrapper(props) {
    return (
      <NodeContainer {...props} label="Default Node">
        <InputNode />
      </NodeContainer>
    );
}

InputNodeWrapper.Sidebar = Sidebar;