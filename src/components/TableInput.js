import React, { useState, useEffect, useRef } from 'react'
import { FormControl } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { changeWord, nextTeamIndex } from '../actions/teamActions'

const TableInput = ({ teamId, letter, isModal, current, index }) => {
  const inputEl = useRef(null)
  const dispatch = useDispatch()
  const [background, setBackground] = useState(null)

  const [word, setWord] = useState('')

  const handleChangeWord = (e) => {
    if (
      word.length === 1 &&
      e.nativeEvent.inputType === 'deleteContentBackward'
    ) {
      setWord('')
    }
    if (e.target.value.toLowerCase().startsWith(letter)) {
      setWord(e.target.value)
    }
  }

  const handleBlurEvent = (e) => {
    setBackground({ backgroundColor: null })
    if (word) {
      dispatch(changeWord(teamId, word, letter, index))
    }
  }

  const handleKeyDownEvent = (e) => {
    e = e || event

    if (!word && (e.which || e.keyCode) == 9) {
      dispatch(nextTeamIndex(teamId))
    } else if (word && (e.which || e.keyCode) == 9) {
      dispatch(changeWord(teamId, word, letter, index))
      dispatch(nextTeamIndex(teamId))
    }

    if (e.key === 'Enter' && word) {
      dispatch(changeWord(teamId, word, letter, index))
      dispatch(nextTeamIndex(teamId))
    }
  }

  const handleClickEvent = (e) => {
    e.target.focus()
    setBackground({ backgroundColor: '#cfeed9' })
  }

  useEffect(() => {
    if (current) {
      inputEl.current.focus()
    }
  }, [current])

  useEffect(() => {
    setBackground(
      document.activeElement === inputEl.current
        ? { backgroundColor: '#cfeed9' }
        : { backgroundColor: null }
    )
  }, [inputEl, current])

  return (
    <td>
      <FormControl
        ref={inputEl}
        className={isModal ? 'table-input is-modal' : 'table-input'}
        value={word}
        onChange={(e) => handleChangeWord(e)}
        onBlur={(e) => handleBlurEvent(e)}
        onKeyDown={(e) => handleKeyDownEvent(e)}
        onMouseUp={(e) => handleClickEvent(e)}
        style={background}
      ></FormControl>
    </td>
  )
}

TableInput.propTypes = {
  teamId: PropTypes.string.isRequired,
  letter: PropTypes.string.isRequired,
  isModal: PropTypes.bool.isRequired,
  current: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
}

TableInput.defaultProps = {
  isModal: false,
}
export default TableInput
