import React from 'react'
import { NodeContainer } from '../../NodeContainer';

function CodeNode({onCallback, id, isConnectable}) {
    return (
        <div>Code Node</div>
    )
}

function Sidebar({ onDragStart }) {
    return (
      <div className="dndnode" onDragStart={(event) => onDragStart(event, "code-node")} draggable>
        Code Node
      </div>
    );
}

export function CodeNodeWrapper(props) {
    return (
      <NodeContainer {...props} label="Code Node" isLeftHandle>
        <CodeNode />
      </NodeContainer>
    );
}

CodeNodeWrapper.Sidebar = Sidebar;