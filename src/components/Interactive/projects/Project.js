import { Folder } from '@mui/icons-material';
import React from 'react';
import { listProject } from '../../../FakeData';

function Project({data}) {
  return (
    <div className='project'>
        {data?.map((item,idx) => (
          <div
            className='style-one-project'
          >
            <Folder style={{
              fontSize:'40px'
            }}/>
            <li>{item.name}</li>
          </div>
        ))}
    </div>
  )
}

export default Project