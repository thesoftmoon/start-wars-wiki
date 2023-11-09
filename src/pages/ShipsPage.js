import React from 'react'
import Layout from '../layout/Layout'
import ImageSlider from '../components/ImageSlider'

function ShipsPage() {
  return (
    <Layout>
        <ImageSlider
        moImage={'/img/hero-banner-characters-mo.jpg'}
        pcImage={'/img/hero-banner-section-ships-pc.jpg'}
        title={'Personajes'}
        sliderSize={'small'}
        text={'Conoce los personajes más icónicos del universo Star Wars'}
        btn={false}
        btnLink={'/characters'}
      />
    </Layout>
  )
}

export default ShipsPage