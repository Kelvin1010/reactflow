import { Folder } from '@mui/icons-material';
import React from 'react';

const listProject = [
  {
    name: 'Project 1'
  },
  {
    name: 'Project 2'
  },
  {
    name: 'Project 3'
  },
  {
    name: 'Project 4'
  },
  {
    name: 'Project 5'
  },
  {
    name: 'Project 6'
  },
  {
    name: 'Project 7'
  },
  {
    name: 'Project 8'
  },
  {
    name: 'Project 9'
  },
  {
    name: 'Project 10'
  },
  {
    name: 'Project 11'
  },
  {
    name: 'Project 12'
  },
]

function Project() {
  return (
    <div className='project'>
        {listProject.map((item,idx) => (
          <div
            className='style-one-project'
          >
            <Folder />
            <li>{item.name}</li>
          </div>
        ))}
    </div>
  )
}

export default Project