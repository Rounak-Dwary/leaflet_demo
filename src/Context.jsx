import React from 'react'
const MyContext = React.createContext({
  centre: [],
  setCentre: () => {},
  location: '',
  setLocation: () => {},
})
export default MyContext
