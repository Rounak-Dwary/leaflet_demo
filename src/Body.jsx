import React, { useContext } from 'react'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  Tooltip,
} from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import MyContext from './Context'
import cities from './cities'

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

const ColorBox = ({ colorCodes }) => {
  const colorCodeList = Object.entries(colorCodes).map(([key, value]) => (
    <li key={key}>
      <span
        style={{
          backgroundColor: value.color,
          width: '20px',
          height: '20px',
          display: 'inline-block',
        }}
      ></span>{' '}
      {value.status}
    </li>
  ))

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        zIndex: 1000,
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
      }}
    >
      <ul style={{ listStyle: 'none', margin: '0', padding: '0' }}>
        {colorCodeList}
      </ul>
    </div>
  )
}

const Body = () => {
  const { center, toolTipVisibilityRef, setToolTipVisibility } =
    useContext(MyContext)

  const handleCheckboxChange = (event) => {
    toolTipVisibilityRef.current = event.target.checked
    setToolTipVisibility(toolTipVisibilityRef.current)
  }

  const MyMarker = ({ it }) => {
    const { id, latitude, longitude, city, status } = it
    let iconUrl = require('./image san/hub_green.png')
    switch (status) {
      case 'warning':
        iconUrl = require('./image san/hub_yellow.png')
        break
      case 'danger':
        iconUrl = require('./image san/hub_red.png')
        break
      case 'dead':
        iconUrl = require('./image san/hub_grey.png')
        break

      default:
        iconUrl = require('./image san/hub_green.png')
    }
    const icon = L.icon({
      iconUrl: iconUrl,
      iconSize: [25, 25],
      shadowSize: [30, 40],
      shadowAnchor: [4, 40],
    })

    return (
      <Marker position={[latitude, longitude]} icon={icon}>
        <Popup>You are at {city}</Popup>
        {toolTipVisibilityRef.current && (
          <Tooltip direction='bottom' opacity={0.8} offset={[0, 5]} permanent>
            Marker {id}
          </Tooltip>
        )}
      </Marker>
    )
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
      <label
        style={{
          position: 'absolute',
          top: '65px',
          right: '40px',
          zIndex: 1000,
          textAlign: 'justify',
        }}
      >
        <input
          type='checkbox'
          checked={toolTipVisibilityRef.current}
          onChange={handleCheckboxChange}
        />
        {'  '}
        Show labels
      </label>

      {cities.map((it) => {
        const { id } = it
        return <MyMarker key={id} it={it} />
      })}

      <ColorBox colorCodes={colorCodes} />
    </MapContainer>
  )
}

export default Body
