import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react'
import Navbar from './Navbar.jsx';


function App() {

  const [position, setPosition] = useState(JSON.parse(localStorage.getItem('lastClick'))
    || [45.55584514965588, 10.216172766008182])
  const [zoom, setZoom] = useState(JSON.parse(localStorage.getItem('lastZoom')) || 18)
  function ClickLogger() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng
        const zoom = e.target.getZoom()
        // console.log('Clicked at:', lat, lng)
        localStorage.setItem('lastClick', JSON.stringify({ lat, lng }))
        localStorage.setItem('lastZoom', JSON.stringify(zoom))
      }
    })
  }



  return (
    <>
      <Navbar />
      <div className="join join-horizontal gap-5">
        <div className = "join join-item" style={{ margin: '0 auto', marginTop: '20px', marginBottom: '20px', width: '1200px', height: '90vh' }}>
          <MapContainer center={position} zoom={zoom} style={{ height: '100%', width: '100%', zIndex: 0 }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <ClickLogger />
          </MapContainer>
        </div>
        <div className="join join-item gap-4">
          <h1>
            P
          </h1> 
          <h2>
            Parcheggio
          </h2>
          <div>
            {
                  
            }
          </div>
        </div>
      </div>

    </>
  );
}

export default App;
