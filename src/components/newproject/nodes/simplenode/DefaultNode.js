import React from 'react'
import { NodeContainer } from '../../NodeContainer';

function DefaultNode({onCallback, id, isConnectable}) {
    return (
        <div>DefaultNode</div>
    )
}

function Sidebar({ onDragStart }) {
    return (
      <div className="dndnode" onDragStart={(event) => onDragStart(event, "default-node")} draggable>
        Default Node
      </div>
    );
}
  
export function DefaultNodeWrapper(props) {
    return (
      <NodeContainer {...props} label="Default Node">
        <DefaultNode />
      </NodeContainer>
    );
}

DefaultNodeWrapper.Sidebar = Sidebar;