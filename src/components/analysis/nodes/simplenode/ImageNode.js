import React from 'react'
import { NodeContainer } from '../../node-container';

function ImageNode() {
  return (
    <div>ImageNode</div>
  )
}

export default ImageNode


function Sidebar({ onDragStart }) {
    return (
      <div className="dndnode" onDragStart={(event) => onDragStart(event, "image-node")} draggable>
        Image Node
      </div>
    );
}
  
export function ImageNodeWrapper(props) {
    return (
        <NodeContainer {...props} label="Image Node" isLeftHandle>
          <ImageNode />
        </NodeContainer>
    );
}

ImageNodeWrapper.Sidebar = Sidebar;