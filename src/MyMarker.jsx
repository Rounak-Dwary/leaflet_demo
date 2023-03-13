import React, { useContext } from 'react'
import { Marker, Popup, Tooltip } from 'react-leaflet'
import L from 'leaflet'
import MyContext from './Context'

const MyMarker = ({ it }) => {
  const { toolTipVisibilityRef } = useContext(MyContext)
  const { id, latitude, longitude, city, status } = it

  let iconUrl = require('./image san/hub_green.png')
  switch (status) {
    case 'Warning':
      iconUrl = require('./image san/hub_yellow.png')
      break
    case 'Danger':
      iconUrl = require('./image san/hub_red.png')
      break
    case 'Dead':
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
    <Marker position={[latitude, longitude]} icon={icon} title='Message'>
      <Popup>You are at {city}</Popup>
      {toolTipVisibilityRef.current && (
        <Tooltip direction='bottom' opacity={0.8} offset={[0, 5]} permanent>
          Marker {id}
        </Tooltip>
      )}
    </Marker>
  )
}

export default MyMarker
