import React, { useState } from 'react';
import { Analytics, MenuOpen, FileOpen, CreateNewFolder } from '@mui/icons-material';
import '../../App.css';
import { Link } from 'react-router-dom';

function Sidebar({children}) {

  const[isOpen ,setIsOpen] = useState(false);
  const toggle = () => setIsOpen (!isOpen);
  const menuItem=[
    {
        path:"/newproject",
        name:"New Project",
        icon:<CreateNewFolder/>
    },
    {
          path:"/analysis",
          name:"Analysis Data",
          icon:<Analytics/>
    },
    {
        path:"/openfile",
        name:"Open File To Draw",
        icon:<FileOpen/>
    },
  ]
  return (
    <div className="container">
        <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
            <div className="top_section">
                <h3 style={{display: isOpen ? "block" : "none"}} className="logo">Options</h3>
                <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                    <MenuOpen onClick={toggle}/>
                </div>
            </div>
            {
                menuItem.map((item, index)=>(
                    <Link to={item.path} key={index} className="link" activeclassName="active">
                        <div className="icon">{item.icon}</div>
                        <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                    </Link>
                ))
            }
        </div>
    </div>
  )
}

export default Sidebar