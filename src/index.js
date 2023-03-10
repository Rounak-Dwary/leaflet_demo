import React, { useRef, useState } from 'react'
import ReactDOM from 'react-dom/client'
import Header from './Header'
import MyContext from './Context'
import Body from './Body'
const App = () => {
  const [center, setCenter] = useState([39.57741898170538, -98.70117187500001])
  const [location, setLocation] = useState('America')
  const [toolTipVisibility, setToolTipVisibility] = useState(false)
  const toolTipVisibilityRef = useRef(toolTipVisibility)

  return (
    <MyContext.Provider
      value={{
        center,
        setCenter,
        location,
        setLocation,
        toolTipVisibilityRef,
        setToolTipVisibility,
      }}
    >
      <Header style={{ marginBottom: 0 }} />
      <Body style={{ marginTop: 0 }} />
    </MyContext.Provider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
