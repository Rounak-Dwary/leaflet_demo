import React, { useContext } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import MyContext from './Context'
import cities from './cities'

const icon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/290/290785.png',
  iconSize: [25, 25],
  shadowSize: [30, 40],
  shadowAnchor: [4, 40],
})
function ChangeView({ center }) {
  const map = useMap()
  map.setView(center, map.getZoom())
  return null
}

const Body = () => {
  const { center } = useContext(MyContext)
  return (
    <MapContainer
      center={center}
      zoom={4}
      scrollWheelZoom={false}
      style={{ height: '93vh', width: '100wh' }}
    >
      <ChangeView center={center} />
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {cities.map((it) => {
        const { id, latitude, longitude, city } = it
        return (
          <Marker key={id} position={[latitude, longitude]} icon={icon}>
            <Popup>You are at {city}</Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
}

export default Body
