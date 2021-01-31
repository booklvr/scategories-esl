import React, { useState } from 'react'
import { FormControl } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { changeWord } from '../actions/teamActions'

const TableInput = ({ teamId, letter }) => {
  const dispatch = useDispatch()

  const [word, setWord] = useState('')

  const handleChangeWord = (e) => {
    if (
      word.length === 1 &&
      e.nativeEvent.inputType === 'deleteContentBackward'
    ) {
      setWord('')
    }
    if (e.target.value.startsWith(letter)) {
      setWord(e.target.value)
    } 
  }

  const handleBlurEvent = () => {
    if (word) {
      dispatch(changeWord(teamId, word, letter))
    }
  }

  return (
    <td>
      <FormControl
        className='px-2 table-input'
        value={word}
        onChange={(e) => handleChangeWord(e)}
        onBlur={() => handleBlurEvent()}
      ></FormControl>
    </td>
  )
}

TableInput.propTypes = {
  teamId: PropTypes.string.isRequired,
  letter: PropTypes.string.isRequired,
}

export default TableInput
