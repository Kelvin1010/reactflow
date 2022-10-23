import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { contentDataNewProject } from '../../helper/newproject/stateRecoil';
import '../../style/style.css';

function InfoNode({data, updatefn, closefn}) {

    const contentData = useRecoilState(contentDataNewProject)

    const [values, setValues] = useState({
        content: contentData[0],
    })

    console.log(data?.data)


    useEffect(() => {
        const initialValues = {
            content: data?.data?.content,
        }
        setValues(initialValues)
    },[data])

    const handleChange = (e) => {
        const {name,value} = e.target;
        setValues({...values, [name]: value})
        // console.log(values)
    }

    const handleUpdate = () => {
        updatefn(values, data?.id)
    }

    return (
        <div className='infonode'>
            {/* <div className='infonode-value'>
                <span>Name Node:</span>
                <input onChange={handleChange} className={'infonode-text'} name='namenode' type={'text'} value={values.namenode} />
            </div> */}
            <div className='infonode-value'>
                <span>Content Node:</span>
                <textarea onChange={handleChange} rows={5} className={'infonode-text'} name='input' type={'text'} value={values?.content} />
            </div>
            <div>
                <div className='infonode-button'>
                    <button onClick={handleUpdate}>Update</button>
                </div>
                <div className='infonode-close'>
                    <button onClick={closefn}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default InfoNode