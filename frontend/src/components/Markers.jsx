import { useState, useEffect, useCallback } from 'react'
import { Marker } from 'react-map-gl'
import Supercluster from 'supercluster'

const sc = new Supercluster({ radius: 60, maxZoom: 16 })

export function ClusteredMarkers({ parcheggi, mapRef, onMarkerClick }) {
  const [clusters, setClusters] = useState([])

  const updateClusters = useCallback(() => {
    if (!mapRef) return
    const bounds = mapRef.getBounds()
    const bbox = [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()]
    const z = Math.floor(mapRef.getZoom())
    setClusters(sc.getClusters(bbox, z))
  }, [mapRef])

  useEffect(() => {
    if (!parcheggi.length) return
    const points = parcheggi.map(p => ({
      type: 'Feature',
      properties: { cluster: false, parcheggio: p },
      geometry: { type: 'Point', coordinates: [p.lng, p.lat] },
    }))
    sc.load(points)
    updateClusters()
  }, [parcheggi, updateClusters])

  useEffect(() => {
    if (!mapRef) return
    mapRef.on('move', updateClusters)
    return () => mapRef.off('move', updateClusters)
  }, [mapRef, updateClusters])

  return clusters.map(cluster => {
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
            const z = Math.min(sc.getClusterExpansionZoom(cluster.id), 20)
            mapRef.easeTo({ center: [lng, lat], zoom: z })
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

function SingleMarker({ parcheggio, onClick }) {
  return (
    <Marker longitude={parcheggio.lng} latitude={parcheggio.lat} onClick={onClick}>
      <div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', transition: 'transform .15s' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
      >
        <div style={{
          width: 32, height: 32,
          borderRadius: '50% 50% 50% 0',
          transform: 'rotate(-45deg)',
          background: '#1D9E75',
          boxShadow: '0 2px 8px rgba(0,0,0,.18)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,255,255,0.85)', transform: 'rotate(45deg)' }} />
        </div>
        <div style={{ width: 2, height: 10, background: 'rgba(0,0,0,.12)', borderRadius: '0 0 2px 2px' }} />
        <div style={{ width: 8, height: 3, background: 'rgba(0,0,0,.10)', borderRadius: '50%', marginTop: 1 }} />
      </div>
    </Marker>
  )
}

function ClusterMarker({ lng, lat, count, onClick }) {
  const tier   = count < 5 ? 0 : count < 20 ? 1 : 2
  const cores  = [32, 36, 44]
  const rings  = [44, 52, 62]
  const colors = ['#1D9E75', '#0F6E56', '#085041']
  const alphas = ['rgba(29,158,117,.18)', 'rgba(15,110,86,.18)', 'rgba(8,80,65,.18)']
  const label  = count > 99 ? '99+' : String(count)

  return (
    <Marker longitude={lng} latitude={lat} onClick={onClick}>
      <div
        style={{ width: rings[tier], height: rings[tier], display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'transform .15s', position: 'relative' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <div style={{ position: 'absolute', width: rings[tier], height: rings[tier], borderRadius: '50%', background: alphas[tier] }} />
        <div style={{ width: cores[tier], height: cores[tier], borderRadius: '50%', background: colors[tier], display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: tier === 2 ? 14 : 13, fontWeight: 500, position: 'relative', zIndex: 1 }}>
          {label}
        </div>
      </div>
    </Marker>
  )
}