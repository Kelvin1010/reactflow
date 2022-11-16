import React from 'react';
import '../../style/style.css';
import HeadInteractive from './head/HeadInteractive';
import SearchProject from './head/SearchProject';
import Project from './projects/Project';

function Interactive() {
    return (
        <div className='interactive'>
            <div className='interaction-mildde'>
                {/* <HeadInteractive /> */}
                <Project />
            </div>
        </div>
    )
}

export default Interactive