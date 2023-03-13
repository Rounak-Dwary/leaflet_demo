import React, { useContext, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  Navbar,
  NavbarBrand,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
import MyContext from './Context'
import 'leaflet/dist/leaflet.css'
import cities from './cities'

function CheckboxGroup() {
  const { citiesRef, setCities } = useContext(MyContext)
  const [checkboxes, setCheckboxes] = useState([
    { id: 0, label: 'Healthy', checked: true },
    { id: 1, label: 'Danger', checked: true },
    { id: 2, label: 'Dead', checked: true },
    { id: 3, label: 'Warning', checked: true },
  ])

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target
    setCheckboxes((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === Number(id) ? { ...checkbox, checked } : checkbox
      )
    )
    let newCities = citiesRef.current
    if (checked) {
      let addCities = cities.filter((city) => {
        return city.status === checkboxes[id].label
      })
      newCities = [...newCities, ...addCities]
    } else {
      newCities = newCities.filter((city) => {
        return city.status !== checkboxes[id].label
      })
    }
    citiesRef.current = newCities
    setCities(citiesRef.current)
  }

  return (
    <div style={{ display: 'inline-block', marginLeft: '10px' }}>
      {checkboxes.map((checkbox) => (
        <label
          htmlFor={checkbox.id}
          style={{ color: 'white', marginLeft: '2px' }}
          key={checkbox.id}
        >
          <input
            type='checkbox'
            id={checkbox.id}
            checked={checkbox.checked}
            onChange={handleCheckboxChange}
            style={{ marginRight: '5px' }}
          />
          {checkbox.label}
        </label>
      ))}
    </div>
  )
}
const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggle = () => setDropdownOpen((prevState) => !prevState)
  const { setCenter, location, setLocation } = useContext(MyContext)

  return (
    <Navbar style={{ marginBottom: 0 }} color='dark' dark>
      <NavbarBrand href='/'>
        <img
          alt='logo'
          src='https://viasatprod-63.adobecqms.net/content/dam/us-site/corporate/images/int_vsat_tm_rgb_wht_card.jpg'
          style={{
            height: 40,
            width: 100,
          }}
        />
      </NavbarBrand>
      <CheckboxGroup />

      <Dropdown
        isOpen={dropdownOpen}
        toggle={toggle}
        direction='down'
        className='ms-auto'
      >
        <DropdownToggle caret color='primary'>
          {location}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Choose Location...</DropdownItem>
          <DropdownItem
            onClick={() => {
              setLocation('America')
              setCenter([39.57741898170538, -98.70117187500001])
            }}
          >
            America
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              setLocation('Europe')
              setCenter([54.526, 15.2551])
            }}
          >
            Europe
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Navbar>
  )
}

export default Header
