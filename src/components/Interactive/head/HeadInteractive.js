import { CreateNewFolder } from '@mui/icons-material';
import React from 'react';
import '../../../style/style.css';
import SearchProject from './SearchProject';

function HeadInteractive() {
  return (
    <div className='headInteractive'>
        <div className='headInteractive-middle'>
            <SearchProject />
        </div>
        <div className='headInteractive-right'>
            <div className='headInteractive-right-others'>
                Others
            </div>
        </div>
    </div>
  )
}

export default HeadInteractive