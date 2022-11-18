import { Image } from '@chakra-ui/react';
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
          {/* <Interactive /> */}
          <Image src='./logo-data-analysis-1.jpg' height={'92vh'} width={'100vw'} />
        </div>
    </>
  )
}

export default Home