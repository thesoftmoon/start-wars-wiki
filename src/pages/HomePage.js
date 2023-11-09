import React from 'react'
import Layout from '../layout/Layout'
import ImageSlider from '../components/ImageSlider'

function HomePage() {
  return (
    <Layout>
      <ImageSlider
        moImage={'/img/hero-banner-characters-mo.jpg'}
        pcImage={'/img/hero-banner-characters-pc.jpg'}
        title={'Personajes'}
        text={'Conoce los personajes más icónicos del universo Star Wars'}
        btn={true}
        btnLink={'/characters'}
      />

<ImageSlider
        moImage={'/img/test-img-mo.jpg'}
        pcImage={'/img/hero-banner-ships-pc.jpg'}
        title={'Naves'}
        text={'Impresiónate por las más conocidas de las naves en la saga'}
        btn={true}
        btnLink={'/ships'}
      />

<ImageSlider
        moImage={'/img/test-img-mo.jpg'}
        pcImage={'/img/hero-banner-planets-pc.jpg'}
        title={'Planetas'}
        text={'Las locaciones más icónicas, conócelas todas'}
        btn={true}
        btnLink={'/planets'}
      />
    </Layout>
  )
}

export default HomePage