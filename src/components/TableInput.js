import React, { useState, useEffect, useRef } from 'react'
import { FormControl } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import {
  changeWord,
  changeTeamIndex,
  nextTeamIndex,
} from '../actions/teamActions'

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
    if (e.target.value.startsWith(letter)) {
      setWord(e.target.value)
    }
  }

  const handleBlurEvent = (e) => {
    // console.log(e.relatedTarget.classList.contains('table-input'))
    console.log(e.relatedTarget)
    if (e.relatedTarget !== null) {
      console.log('its an input box')
    } else {
      console.log('you clicked something weird')
    }
    // if (e.nativeEvent.target == ) {
    //   console.log('clicked another input')
    // } else {
    //   console.log('clicked something else')
    // }
    setBackground(setBackground({ backgroundColor: null }))
    if (word) {
      dispatch(changeWord(teamId, word, letter, index))
    }
  }

  const handleKeyEnter = (event) => {
    if (event.key === 'Enter' && word) {
      dispatch(changeWord(teamId, word, letter, index))
    }
  }

  // const onClickHandler = () => {
  //   // dispatch(changeTeamIndex(teamId))
  // }

  const handleFocusEvent = () => {
    setBackground({ backgroundColor: '#cfeed9' })
  }

  useEffect(() => {
    if (current) {
      inputEl.current.focus()
    }
  }, [current])

  useEffect(() => {
    inputEl.current.addEventListener('focus', () => {})
  }, [])

  // useEffect(() => {
  //   setBackground(
  //     document.activeElement === inputEl.current
  //       ? { backgroundColor: '#4bbf73' }
  //       : { backgroundColor: 'blue' }
  //   )
  // }, [inputEl, current])

  // let t1 = 1
  // let bgc = current ? { backgroundColor: '#4bbf73' } : null
  // console.log(document.activeElement)
  // console.log(inputEl.current)
  // let bgc =
  //   document.activeElement === inputEl.current
  //     ? { backgroundColor: '#4bbf73' }
  //     : null

  return (
    <td>
      <FormControl
        ref={inputEl}
        className={isModal ? 'table-input is-modal' : 'table-input'}
        value={word}
        onChange={(e) => handleChangeWord(e)}
        onBlur={(e) => handleBlurEvent(e)}
        onKeyPress={handleKeyEnter}
        // onClick={onClickHandler}
        style={background}
        // tabIndex={t1}
        onFocus={handleFocusEvent}
      ></FormControl>
    </td>
  )
}

TableInput.propTypes = {
  teamId: PropTypes.string.isRequired,
  letter: PropTypes.string.isRequired,
  isModal: PropTypes.bool.isRequired,
}

TableInput.defaultProps = {
  isModal: false,
}
export default TableInput
