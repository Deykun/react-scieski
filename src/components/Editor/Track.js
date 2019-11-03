import React from 'react'

const Track = ({id, status, title, activity, date, distance}) => {
  return <li>
    <h1>{distance} - {activity}</h1>
    <p>{title}</p>
  </li>
}

export default Track
