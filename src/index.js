import React, { useRef, useState } from 'react'
import ReactDOM from 'react-dom/client'
import Header from './Header'
import MyContext from './Context'
import Body from './Body'
import data from './cities'
const App = () => {
  const [center, setCenter] = useState([39.57741898170538, -98.70117187500001])
  const [location, setLocation] = useState('America')
  const [toolTipVisibility, setToolTipVisibility] = useState(false)
  const toolTipVisibilityRef = useRef(toolTipVisibility)
  const [cities, setCities] = useState(data)
  const citiesRef = useRef(cities)

  return (
    <MyContext.Provider
      value={{
        center,
        setCenter,
        location,
        setLocation,
        toolTipVisibilityRef,
        setToolTipVisibility,
        citiesRef,
        setCities,
      }}
    >
      <Header style={{ marginBottom: 0 }} />
      <Body style={{ marginTop: 0 }} />
    </MyContext.Provider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
