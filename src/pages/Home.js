import React from 'react'
import { Header } from '../components/header'
import Interactive from '../components/Interactive/Interactive'
import Sidebar from '../components/sidebar/Sidebar'
import '../style/style.css';

function Home() {
  return (
    <>
        <Header />
        <div className='interaction'>
          <Sidebar />
          <Interactive />
        </div>
    </>
  )
}

export default Home