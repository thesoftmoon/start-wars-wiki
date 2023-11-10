import React, { useState, useEffect } from 'react'
import Layout from '../layout/Layout'
import ImageSlider from '../components/ImageSlider'
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { FilterMatchMode } from 'primereact/api';
import Swal from 'sweetalert2';


import { InputText } from 'primereact/inputtext';

function ShipsPage() {

  const [data, setData] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState('');
  const [prevPageUrl, setPrevPageUrl] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });
  const [globalFilterValue, setGlobalFilterValue] = useState('');


  useEffect(() => {
    fetchData('https://swapi.dev/api/starships/');
  }, []);

  const fetchData = async (url) => {
    Swal.fire({
      title: 'Cargando',
      text: 'Por favor, espera...',
      allowOutsideClick: false,
      showConfirmButton: false,
    });
    Swal.showLoading();
    try {
      const response = await axios.get(url);
      setData(response.data.results);
      setNextPageUrl(response.data.next);
      setPrevPageUrl(response.data.previous);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    Swal.close();
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const handleNext = () => {
    if (nextPageUrl) {
      fetchData(nextPageUrl);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (prevPageUrl) {
      fetchData(prevPageUrl);
      setCurrentPage((prev) => prev - 1);
    }
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Buscar..." />
        </span>
      </div>
    );
  };

  const header = renderHeader();


  return (
    <Layout>
      <ImageSlider
        moImage={'/img/hero-banner-section-ships-mo.jpg'}
        pcImage={'/img/hero-banner-section-ships-pc.jpg'}
        title={'Personajes'}
        sliderSize={'small'}
        text={'Conoce los personajes más icónicos del universo Star Wars'}
        btn={false}
        btnLink={'/characters'}
      />

      {data.length > 0? (
        <div>
          <DataTable value={data}
            dataKey="id" filters={filters}
            tableStyle={{ minWidth: '50rem' }}
            header={header}
            emptyMessage="No encontrado...">
            <Column field="name" header="Nombre" />
            <Column field="manufacturer" header="Nombre" />
            <Column field="cost_in_credits" header="Nombre" />
            <Column field="length" header="Nombre" />
            <Column field="max_atmosphering_speed" header="Nombre" />
          </DataTable>
          <div className='row'>
            <div className='col-12 d-flex align-items-center justify-content-center'>
              <Button label="Anterior" onClick={handlePrev} disabled={!prevPageUrl} />
              <span className='mx-3'>Página {currentPage}</span>
              <Button label="Siguiente" onClick={handleNext} disabled={!nextPageUrl} />
            </div>
          </div>
        </div>
      ) : (
        <div className='d-flex align-items-center justify-content-center h-100'><h1>Cargando...</h1></div>
      )}


    </Layout>
  )
}

export default ShipsPage