import React from 'react'
import Navbar from '../components/Navbar';

function Layout(props) {
  return (
    <div className='main-app'>
      <Navbar />
      {props.children}
    </div>
  )
}

export default Layout