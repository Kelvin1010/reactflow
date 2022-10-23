import React, { useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight';
import { NodeContainer } from '../../NodeContainer';
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Select } from '@chakra-ui/react';
import { contentNewProject } from '../../../../helper/newproject/atom';
import { useRecoilState } from 'recoil';

function CodeNode({onCallback, id, isConnectable}) {

  const [languageCodes, setLanguageCode] = useState('');
  const [data,setData] = useRecoilState(contentNewProject);

  console.log(data)
  setData(data)
    return (
        <div>
          <div 
            style={{
              display:'flex',
              justifyContent:'space-between',
              alignItems:'center'
            }}
          >
            <p>Write your code</p>
            <Select w={150} h={5} placeholder='languages' value={languageCodes} onChange={e => setLanguageCode(e.target.value)}>
              <option>javascript</option>
              <option>java</option>
              <option>python</option>
            </Select>
          </div>
          <SyntaxHighlighter
            wrapLines={true}
            showInlineLineNumbers={true}
            language={languageCodes}
            style={docco}
          >
            {data}
          </SyntaxHighlighter>
        </div>
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