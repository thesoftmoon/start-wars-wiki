import React, { useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import ImageSlider from '../components/ImageSlider'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import Swal from 'sweetalert2';


function CharacterPage() {

  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [displayDialog, setDisplayDialog] = useState(false);
  const [secondApiData, setSecondApiData] = useState(null);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });

  const [globalFilterValue, setGlobalFilterValue] = useState('');

  const detailsTemplate = () => {
    if (selectedItem) {
      return (
        <div>
          <ul>
            <li>Nombre: {selectedItem.name}</li>
            <li>Altura: {selectedItem.height}</li>
            <li>Peso: {selectedItem.mass}</li>
            <li>Color de pelo: {selectedItem.hair_color}</li>
            <li>Color de piel: {selectedItem.skin_color}</li>
            <li>Color de ojos: {selectedItem.eye_color}</li>
            <li>Año de nacimiento: {selectedItem.birth_year}</li>
            <li>Genero: {selectedItem.gender}</li>
            <li>Planeta: {secondApiData ? secondApiData.name : (<div>Cargando...</div>)}</li>
          </ul>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`https://swapi.dev/api/people/`)
      setData(data);
    })();
  }, []);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const showDetails = async (item) => {
    setSelectedItem(item);
    Swal.fire({
      title: 'Cargando',
      text: 'Por favor, espera...',
      allowOutsideClick: false,
      showConfirmButton: false,
    });
    Swal.showLoading();
    try {
      const response = await axios.get(item.homeworld);
      setSecondApiData(response.data);
      setDisplayDialog(true);
    } catch (error) {
      console.log('error second call' + error)
    }
    setDisplayDialog(true);
    Swal.close();
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

  const viewMoreBodyTemplate = (rowData) => {
    return (
      <Button label="Ver Más" icon="pi pi-eye" onClick={() => showDetails(rowData)} />
    );
  };

  const header = renderHeader();

  return (
    <Layout>
      <ImageSlider
        moImage={'/img/hero-banner-characters-mo.jpg'}
        pcImage={'/img/hero-banner-section-characters-pc.jpg'}
        title={'Personajes'}
        sliderSize={'small'}
        text={'Conoce los personajes más icónicos del universo Star Wars'}
      />
      {data.results ? (
        <div className="row d-flex justify-content-center my-4">
        <div className="col-12 col-md-8">
          <DataTable
            value={data.results}
            tableStyle={{ minWidth: '50rem' }}
            paginator
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
            rows={5}
            dataKey="id" filters={filters}
            header={header} emptyMessage="No encontrado..."
          >
            <Column field="name" header="Nombre"></Column>
            <Column header="Detalles" body={viewMoreBodyTemplate} />
          </DataTable>

          <Dialog
            visible={displayDialog}
            onHide={() => setDisplayDialog(false)}
            header="Detalles"
          >
            {detailsTemplate()}
          </Dialog>
        </div>
        </div>
      ) : (
        <div className='d-flex align-items-center justify-content-center h-100'><h1>Cargando...</h1></div>


      )}
    </Layout>
  )
}

export default CharacterPage