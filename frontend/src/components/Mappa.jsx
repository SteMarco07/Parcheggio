import { useEffect } from 'react'
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import { useStore } from '../store.jsx'

function MapSync() {
  const map = useMap()
  const { position, zoom } = useStore()

  useEffect(() => {
    if (map && position) {
      map.setView(position, zoom)
    }
  }, [map, position, zoom])

  return null
}

function ClickLogger() {
  const { modifyPosition, modifyZoom } = useStore()

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng
      const z = e.target.getZoom()
      modifyPosition([lat, lng])
      modifyZoom(z)
    }
  })

  return null
}

function Mappa() {
  const { position, zoom } = useStore()

  return (
    <MapContainer center={position} zoom={zoom} style={{ height: '100%', width: '100%', zIndex: 0 }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap' />
      <MapSync />
      <ClickLogger />
    </MapContainer>
  )
}

export default Mappa;