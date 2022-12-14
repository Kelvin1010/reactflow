import React, { useState } from 'react';
import { Analytics, MenuOpen, FileOpen } from '@mui/icons-material';
import '../../App.css';
import { Link } from 'react-router-dom';
import { SettingsIcon } from '@chakra-ui/icons';

function Sidebar({children}) {

  const[isOpen ,setIsOpen] = useState(false);
  const toggle = () => setIsOpen (!isOpen);
  const menuItem=[
    {
          path:"/analysis",
          name:"Analysis Data",
          icon:<Analytics/>
    },
    {
        path: "/settings",
        name: "Setting",
        icon: <SettingsIcon />
    }
  ]
  return (
    <div className="container">
        <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
            <div className="top_section">
                <h3 style={{display: isOpen ? "block" : "none"}} className="logo" color='white'>Features</h3>
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