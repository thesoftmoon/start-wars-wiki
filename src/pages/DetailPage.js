import React, { useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import ImageSlider from '../components/ImageSlider'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function DetailPage() {

    const { id } = useParams();
    const [data, setData] = useState(null);


    useEffect(() => {
        fetchData(`https://swapi.dev/api/people/${id}`);
      }, []);
      
      const fetchData = async (url) => {
        try {
          Swal.fire({
            title: 'Cargando',
            text: 'Por favor, espera...',
            allowOutsideClick: false,
            showConfirmButton: false,
          });
          Swal.showLoading();
      
          const response = await axios.get(url);
          setData(response.data);
      
          Swal.close();
        } catch (error) {
          console.error('Error fetching data:', error);
          Swal.close();
        }
      };
    

    if (data == null) {
        return (
            <Layout>
                <ImageSlider
                    moImage={'/img/hero-banner-characters-mo.jpg'}
                    pcImage={'/img/hero-banner-section-characters-pc.jpg'}
                    title={'Cargando personaje'}
                    sliderSize={'small'}
                />
                <div className='d-flex align-items-center justify-content-center h-100'><h1>Cargando...</h1></div>
            </Layout>
        )
    }

    return (
        <Layout>
            <ImageSlider
                moImage={'/img/hero-banner-characters-mo.jpg'}
                pcImage={'/img/hero-banner-section-characters-pc.jpg'}
                title={data.name}
                sliderSize={'small'}
                btn={false}
            />
            <div className="row d-flex justify-content-center my-5">
                <div className="col-12 col-md-6">
                    <ul className="list-group text-center">
                        <li className="list-group-item">Altura: <strong>{data.height}</strong></li>
                        <li className="list-group-item">Peso: <strong>{data.mass}</strong></li>
                        <li className="list-group-item">Color de pelo: <strong>{data.hair_color}</strong></li>
                        <li className="list-group-item">Color de piel: <strong>{data.skin_color}</strong></li>
                        <li className="list-group-item">Color de ojos: <strong>{data.eye_color}</strong></li>
                        <li className="list-group-item">Año de nacimiento: <strong>{data.birth_year}</strong></li>
                        <li className="list-group-item">Genero: <strong>{data.gender}</strong></li>
                    </ul>
                </div>
            </div>
        </Layout>
    )
}

export default DetailPage