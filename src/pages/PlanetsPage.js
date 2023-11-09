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
import { Link } from 'react-router-dom';


function CharacterPage() {

  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [displayDialog, setDisplayDialog] = useState(false);
  const [secondApiData, setSecondApiData] = useState(null);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });

  const [globalFilterValue, setGlobalFilterValue] = useState('');

  function extractUrl(url) {
    const parts = url.split('/');
    return parts[parts.length - 2];
  }



  const detailsTemplate = () => {
    if (secondApiData) {
      const selectedItemHomeworld = selectedItem ? selectedItem.url : null;
      const filteredData = secondApiData.filter(
        (item) => item.homeworld === selectedItemHomeworld
      );

      if (filteredData.length === 0) {
        return <p>Ningún personaje reside en este planeta.</p>;
      }

      return (
        <div>
          <ul>
            {/* {filteredData.map((item, index) => (
              <li key={index}>
                {item.name}
                <Link to={`/characters/${extractUrl(item.url)}`}>Ver Detalles</Link>
              </li>
            ))} */}
          </ul>
        </div>
      );
    }
    return null;
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`https://swapi.dev/api/planets/`)
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
      const response = await axios.get(`https://swapi.dev/api/people/`);
      setSecondApiData(response.data.results);
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
        pcImage={'/img/hero-banner-section-planets-pc.jpg'}
        title={'Planetas'}
        sliderSize={'small'}
        text={'Las locaciones más icónicas, conócelas todas'}
      />
      {data.results ? (
        <div className="row d-flex justify-content-center my-4">
          <div className="col-12">
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
              <Column field="rotation_period" header="Periodo Rotacion"></Column>
              <Column field="orbital_period" header="Periodo orbital"></Column>
              <Column field="diameter" header="Diametro"></Column>
              <Column field="climate" header="Clima"></Column>
              <Column field="gravity" header="Gravedad"></Column>
              <Column field="terrain" header="Terreno"></Column>
              <Column field="surface_water" header="Agua"></Column>
              <Column field="population" header="Población"></Column>
              <Column header="Residentes" body={viewMoreBodyTemplate} />
            </DataTable>

            <Dialog
              visible={displayDialog}
              onHide={() => setDisplayDialog(false)}
              header="Residentes"
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