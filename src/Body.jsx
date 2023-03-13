import React, { useContext } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import MyContext from './Context'
import ColorBox from './ColorBox'
import MyMarker from './MyMarker'
import MarkerClusterGroup from 'react-leaflet-markercluster'

function ChangeView({ center }) {
  const map = useMap()
  map.setView(center, map.getZoom())
  return null
}

const colorCodes = [
  { status: 'Healthy', color: '#56ea47' },
  { status: 'Danger', color: '#e93a3a' },
  { status: 'Dead', color: '#8b8b8b' },
  { status: 'Warning', color: '#beb51e' },
]

const Body = () => {
  const { center, toolTipVisibilityRef, setToolTipVisibility, citiesRef } =
    useContext(MyContext)

  const handleCheckboxChange = (event) => {
    toolTipVisibilityRef.current = event.target.checked
    setToolTipVisibility(toolTipVisibilityRef.current)
  }

  return (
    <MapContainer
      center={center}
      zoom={4}
      scrollWheelZoom={false}
      style={{ height: '94vh', width: '100wh', zIndex: 0 }}
    >
      <ChangeView center={center} />
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <span
        style={{
          position: 'absolute',
          top: '30px',
          right: '20px',
          zIndex: 1000,
          backgroundColor: 'white',
          padding: '10px',
          borderRadius: '5px',
          opacity: '0.8',
          boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
        }}
      >
        <input
          id='show_label_checkbox'
          type='checkbox'
          checked={toolTipVisibilityRef.current}
          onChange={handleCheckboxChange}
        />
        <label
          htmlFor='show_label_checkbox'
          style={{ marginLeft: '2px', opacity: '1' }}
        >
          Show labels
        </label>
      </span>

      {citiesRef.current.map((it) => {
        const { id } = it
        return <MyMarker key={id} it={it} />
      })}

      <ColorBox colorCodes={colorCodes} />
    </MapContainer>
  )
}

export default Body
