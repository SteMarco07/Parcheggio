import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useStore } from './store.jsx'
import Navbar from './components/Navbar.jsx';
import PaginaParcheggi from './pages/PaginaParcheggi.jsx';
import PaginaPrenotazioni from './pages/PaginaPrenotazioni.jsx';

function App() {
  const { loadFromLocalStorage } = useStore();

  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  return (
    <BrowserRouter>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div className="min-h-screen flex flex-col bg-gray-100">
        <div className="h-16 flex-none" aria-hidden />
        <Routes>
          <Route path="/parcheggi" element={<PaginaParcheggi />} />
          <Route path="/prenotazioni" element={<PaginaPrenotazioni />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

