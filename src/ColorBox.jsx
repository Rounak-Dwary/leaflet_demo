import React from 'react'

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

export default ColorBox
