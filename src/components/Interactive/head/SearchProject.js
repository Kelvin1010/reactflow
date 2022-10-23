import React, { useState } from 'react'
import { listProject } from '../../../FakeData';
import Project from '../projects/Project';

function SearchProject() {

  const [query, setQuery] = useState("");

  const keys = ["name"];

  const search = (data) => {
    return data?.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    )
  }

  const s = search(listProject)

  return (
    <div className='searchproject'>
      <div 
        style={{
          display:'flex',
          justifyContent:'space-between',
          marginBottom:'20px'
        }}
      >
        
        <div className='input-seach'>
          <input 
            type={'text'} 
            placeholder='Search Project...'
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
          <div className='searchOthers'>
            <div className='searchOthers-center'>
                Others
            </div>
        </div>
      </div>
      {(s?.length === 0) ? (
        <>
          <p>Not Found!</p>
        </>
      ):(
        <>
          <Project data={search(listProject)}/>
        </>
      )}
    </div>
  )
}

export default SearchProject