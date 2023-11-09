import React from 'react'
import '../styles/Footer.scss'

function Footer() {
  const pageName = 'Mern Blog Page';
  const currentYear = new Date().getFullYear();
  let mainFooterInfo = pageName + ' | ' + currentYear;
  return (
    <div className='footer-container'>
      <span>{mainFooterInfo}</span>
    </div>
  )
}


export default Footer