import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Slider.scss'

function ImageSlider(props) {
  return (
    <div className={props.sliderSize === 'small' ? 'image-slider-container-small' : 'image-slider-container'}>
      <div className='slider-txt'>
        <h1>{props.title}</h1>
        <p className='mb-4'>{props.text}</p>
        {props.btn === true && <Link className='primary-btn' to={props.btnLink}>Ver más</Link>}

      </div>
      <img src={props.moImage} className='img-fluid d-flex d-md-none' alt='...'></img>
      <img src={props.pcImage} className='img-fluid d-md-flex d-none' alt='...'></img>
    </div>
  )
}

export default ImageSlider