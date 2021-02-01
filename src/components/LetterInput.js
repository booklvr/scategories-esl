import React, { useState } from 'react'
import { FormControl } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { changeLetter } from '../actions/alphabetActions'

const LetterInput = ({ letter, index }) => {
  const dispatch = useDispatch()

  const [newLetter, setNewLetter] = useState(letter)
  const [previousLetter] = useState(letter)

  const handleLetterChange = (e) => {
    if (e.nativeEvent.inputType === 'deleteContentBackward') {
      setNewLetter('')
    } else setNewLetter(e.nativeEvent.data)

    // else if (!newLetter) setNewLetter(e.target.value)
    // else setNewLetter(mem)
  }

  const handleBlurEvent = () => {
    if (newLetter === '') {
      dispatch(changeLetter(previousLetter, index))
    } else {
      dispatch(changeLetter(newLetter, index))
    }
  }

  return (
    <FormControl
      className='letter-input'
      value={newLetter}
      onChange={(e) => handleLetterChange(e)}
      onBlur={handleBlurEvent}
    ></FormControl>
  )
}

LetterInput.propTypes = {
  letter: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
}

export default LetterInput
