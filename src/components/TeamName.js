import React, { useState } from 'react'
import { FormControl } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { changeTeamName } from '../actions/teamActions'

const TeamName = ({ teamName, id }) => {
  const dispatch = useDispatch()

  const [name, setName] = useState(teamName)

  return (
    <FormControl
      className='team-name'
      value={name}
      onChange={(e) => setName(e.target.value)}
      onBlur={() => dispatch(changeTeamName(name, id))}
    ></FormControl>
  )
}

TeamName.propTypes = {
  teamName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}

export default TeamName
