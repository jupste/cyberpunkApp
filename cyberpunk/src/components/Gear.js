import React from 'react'

const Gear = ({ gear }) => {
  return (
    <li>
    <ul>{gear.name}</ul>
    <ul>{gear.cost}</ul>
    <ul>{gear.type}</ul>
    </li>

  )
}

export default Gear
