import React from 'react'
import { NodeContainer } from '../../NodeContainer';

function OutputNode({onCallback, id, isConnectable}) {
    return (
        <div>Output Node</div>
    )
}

function Sidebar({ onDragStart }) {
    return (
      <div className="dndnode" onDragStart={(event) => onDragStart(event, "output-node")} draggable>
        Output Node
      </div>
    );
}
  
export function OutputNodeWrapper(props) {
    return (
      <NodeContainer {...props} label="Output Node" isLeftHandle>
        <OutputNode/>
      </NodeContainer>
    );
}

OutputNodeWrapper.Sidebar = Sidebar;