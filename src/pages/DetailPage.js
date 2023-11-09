import React, { useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import ImageSlider from '../components/ImageSlider'
import { useParams } from 'react-router-dom';
import axios from 'axios';

function DetailPage() {

    const { id } = useParams();
    const [data, setData] = useState(null);
    const [planet, setPlanet] = useState(null);

    useEffect(() => {
        axios
            .get(`https://swapi.dev/api/people/${[id]}`)
            .then((res) => {
                const personData = res.data;
                setData(personData);
                if (personData && personData.homeworld) {
                    return axios.get(personData.homeworld);
                } else {
                    throw new Error("La URL no está disponible.");
                }
            })
            .then((res) => {
                const planetData = res.data;
                setPlanet(planetData);
            })
            .catch((err) => {
                console.log('error al cargar la data' + err)
                setData(null);
            });
    }, [id]);

    if (data == null && planet == null) {
        return (
            <Layout>
                <ImageSlider
                    moImage={'/img/hero-banner-characters-mo.jpg'}
                    pcImage={'/img/hero-banner-section-characters-pc.jpg'}
                    title={'Personajes'}
                    sliderSize={'small'}
                    text={'Conoce los personajes más icónicos del universo Star Wars'}
                    btn={false}
                    btnLink={'/characters'}
                />
                Cargando...
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
                        {planet &&
                            <li className="list-group-item">Planeta: <strong>{planet.name}</strong></li>
                        }
                    </ul>
                </div>
            </div>
        </Layout>
    )
}

export default DetailPage