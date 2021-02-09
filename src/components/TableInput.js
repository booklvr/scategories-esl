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
  if (current) {
    console.log(teamId, current)
  }

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
      console.log('index', index)
      dispatch(changeWord(teamId, word, letter, index))
    }
    // else {
    //   console.log('what the fuck')
    //   dispatch(nextTeamIndex(teamId))
    // }
  }

  const handleKeyEnter = (event) => {
    if (event.key === 'Enter' && word) {
      console.log('index', index)
      dispatch(changeWord(teamId, word, letter, index))
    }
  }

  const onClickHandler = () => {
    dispatch(changeTeamIndex(teamId))
  }

  // const handleClick = () => {
  //   dispatch(changeTeamIndex(index))
  // }

  useEffect(() => {
    if (current) {
      inputEl.current.focus()
    }
  }, [current])

  // useEffect(() => {
  //   setBackground(
  //     document.activeElement === inputEl.current
  //       ? { backgroundColor: '#4bbf73' }
  //       : { backgroundColor: 'blue' }
  //   )
  // }, [inputEl, current])

  let t1 = 1
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
        onClick={onClickHandler}
        style={background}
        tabIndex={t1}
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
