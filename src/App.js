import './styles/Global.scss';
import { Routes, Route} from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';
        
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage'
import ShipsPage from './pages/ShipsPage'
import PlanetsPage from './pages/PlanetsPage'
import CharacterPage from './pages/CharacterPage'
import DetailPage from './pages/DetailPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/ships" element={<ShipsPage />} />
      <Route path="/planets" element={<PlanetsPage />} />
      <Route path="/characters" element={<CharacterPage />} />
      <Route path="/characters/:id" element={<DetailPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
