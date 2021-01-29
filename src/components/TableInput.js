import React, { useState } from 'react'
import { FormControl } from 'react-bootstrap'
// import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { changeTeamName } from '../actions/teamActions'

const TableInput = () => {
  // const dispatch = useDispatch()

  const [word, setWord] = useState('')
  const [complete, setComplete] = useState(false)

  const handleBlurEvent = () => {
    if (word.length) {
      setComplete(true)
    } else {
      setComplete(false)
    }
  }

  return (
    <td style={{ backgroundColor: `${complete ? 'grey' : ''}` }}>
      <FormControl
        className='px-2 table-input'
        style={{ backgroundColor: `${complete ? 'lightgrey' : ''}` }}
        value={word}
        onChange={(e) => setWord(e.target.value)}
        onBlur={() => handleBlurEvent()}
      ></FormControl>
    </td>
  )
}

// TableInput.propTypes = {
//   teamName: PropTypes.string.isRequired,
//   index: PropTypes.number.isRequired,
// }

export default TableInput
