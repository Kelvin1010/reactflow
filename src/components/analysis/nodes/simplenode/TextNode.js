import React from 'react'
import { NodeContainer } from '../../node-container';

function TextNode() {
  return (
    <div>TextNode</div>
  )
}

export default TextNode


function Sidebar({ onDragStart }) {
    return (
      <div className="dndnode" onDragStart={(event) => onDragStart(event, "text-node")} draggable>
        Text Node
      </div>
    );
}
  
export function TextNodeWrapper(props) {
    return (
        <NodeContainer {...props} label="Text Node" isLeftHandle>
          <TextNode />
        </NodeContainer>
    );
}
TextNodeWrapper.Sidebar = Sidebar;