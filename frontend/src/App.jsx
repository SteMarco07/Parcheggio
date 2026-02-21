import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react'

import { useStore } from './store.jsx'
import Navbar from './components/Navbar.jsx';
import MappaParcheggi from './MappaParcheggi.jsx';

function App() {
  const { loadFromLocalStorage } = useStore();

  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <div className="min-h-screen flex flex-col bg-gray-100">
        <div className="h-16 flex-none" aria-hidden />
        <MappaParcheggi />
      </div>
    </>
  );
}

export default App;

