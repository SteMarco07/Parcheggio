import { useState, useEffect, useCallback } from 'react'
import { useMap } from 'react-map-gl'
import Supercluster from 'supercluster'
import { Marker } from 'react-map-gl'



const supercluster = new Supercluster({
  radius: 60,
  maxZoom: 16,
})

function ClusteredMarkers({ parcheggi, onMarkerClick }) {
  const { current: map } = useMap()
  const [clusters, setClusters] = useState([])

  const updateClusters = useCallback(() => {
    if (!map) return

    const bounds = map.getBounds()
    const bbox = [
      bounds.getWest(),
      bounds.getSouth(),
      bounds.getEast(),
      bounds.getNorth(),
    ]
    const zoom = Math.floor(map.getZoom())
    setClusters(supercluster.getClusters(bbox, zoom))
  }, [map])

  // Sostituisci i due useEffect esistenti con questi tre

  // 1. Carica i punti quando cambiano i parcheggi
  useEffect(() => {
    if (!parcheggi.length) return
    const points = parcheggi.map((p) => ({
      type: 'Feature',
      properties: { cluster: false, parcheggio: p },
      geometry: { type: 'Point', coordinates: [p.lng, p.lat] },
    }))
    supercluster.load(points)
    updateClusters()
  }, [parcheggi, updateClusters])

  // 2. Ascolta moveend E zoomend
  useEffect(() => {
    if (!map) return
    map.on('moveend', updateClusters)
    map.on('zoomend', updateClusters)   // ← mancava questo
    return () => {
      map.off('moveend', updateClusters)
      map.off('zoomend', updateClusters)
    }
  }, [map, updateClusters])

  // 3. Primo calcolo dopo che la mappa è pronta
  useEffect(() => {
    if (!map) return
    if (map.isStyleLoaded()) {
      updateClusters()
    } else {
      map.once('load', updateClusters)  // ← aspetta il load se non è ancora pronta
    }
  }, [map, updateClusters])

  return clusters.map((cluster) => {
    const [lng, lat] = cluster.geometry.coordinates
    const { cluster: isCluster, point_count, parcheggio } = cluster.properties

    if (isCluster) {
      return (
        <ClusterMarker
          key={`cluster-${cluster.id}`}
          lng={lng}
          lat={lat}
          count={point_count}
          onClick={() => {
            const expansionZoom = Math.min(
              supercluster.getClusterExpansionZoom(cluster.id),
              20
            )
            map.easeTo({ center: [lng, lat], zoom: expansionZoom })
          }}
        />
      )
    }

    return (
      <SingleMarker
        key={`marker-${parcheggio.id}`}
        parcheggio={parcheggio}
        onClick={() => onMarkerClick(parcheggio)}
      />
    )
  })
}

// Marker singolo 


function SingleMarker({ parcheggio, onClick }) {
  return (
    <Marker longitude={parcheggio.lng} latitude={parcheggio.lat} onClick={onClick}>
      <div style={{
        width: 14,
        height: 14,
        borderRadius: '50%',
        background: '#1D9E75',
        border: '2px solid #fff',
        boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
        cursor: 'pointer',
      }} />
    </Marker>
  )
}

// Marker Cluster
function ClusterMarker({ lng, lat, count, onClick }) {
  const size = Math.min(20 + (count / 5) * 10, 56)

  return (
    <Marker longitude={lng} latitude={lat} onClick={onClick}>
      <div style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: '#185FA5',
        border: '2.5px solid #fff',
        boxShadow: '0 2px 6px rgba(0,0,0,0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: '#fff',
        fontSize: 12,
        fontWeight: 500,
      }}>
        {count}
      </div>
    </Marker>
  )
}

export default ClusteredMarkers