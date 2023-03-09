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

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggle = () => setDropdownOpen((prevState) => !prevState)
  const { setCenter, location, setLocation } = useContext(MyContext)

  return (
    <>
      <Navbar style={{ marginBottom: 0 }} color='dark' dark>
        <NavbarBrand href='https://www.viasat.com/'>
          <img
            alt='logo'
            src='https://viasatprod-63.adobecqms.net/content/dam/us-site/corporate/images/int_vsat_tm_rgb_wht_card.jpg'
            style={{
              height: 40,
              width: 100,
            }}
          />
        </NavbarBrand>
        <Dropdown isOpen={dropdownOpen} toggle={toggle} direction='down'>
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
    </>
  )
}

export default Header
