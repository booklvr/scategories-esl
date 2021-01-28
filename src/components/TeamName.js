import React, { useState } from 'react'
import { FormControl } from 'react-bootstrap'

const TeamName = ({ changeTeamNamesHandler, teamName, index }) => {
  const [name, setName] = useState(teamName)

  console.log('name', name)

  return (
    <FormControl
      value={name}
      onChange={(e) => setName(e.target.value)}
      onBlur={(e) => changeTeamNamesHandler(name, index)}
    ></FormControl>
  )
}

export default TeamName
