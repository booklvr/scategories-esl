import React, { useState } from 'react'
import { FormControl } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { changeLetter } from '../actions/alphabetActions'

const LetterInput = ({ letter, index }) => {
  const dispatch = useDispatch()

  const [newLetter, setNewLetter] = useState(letter)

  return (
    <FormControl
      className='letter-input'
      value={newLetter}
      onChange={(e) => setNewLetter(e.target.value)}
      onBlur={() => dispatch(changeLetter(newLetter, index))}
    ></FormControl>
  )
}

LetterInput.propTypes = {
  letter: PropTypes.string.isRequired,
}

export default LetterInput
