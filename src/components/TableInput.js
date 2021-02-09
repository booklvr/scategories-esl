import React, { useState, useEffect, useRef } from 'react'
import { FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { changeWord, changeTeamIndex } from '../actions/teamActions'

const TableInput = ({ teamId, letter, isModal, index, current }) => {
  const inputEl = useRef(null)
  const dispatch = useDispatch()
  const teamsIndex = useSelector((state) => state.teamsIndex)

  console.log('teamsIndex', teamsIndex.index)
  console.log('index', index)

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
    setTimeout(() => {
      if (word) {
        dispatch(changeWord(teamId, word, letter, index))
      }
    }, 500)
  }

  // const handleKeyEnter = (event) => {
  //   if (event.key === 'Enter' && word) {
  //     dispatch(changeWord(teamId, word, letter, index))
  //   }
  // }
  const handleOnKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      console.log('tab or enter')
      // dispatch(changeTeamIndex(index))
    }
  }

  // const handleFocusEvent = (event) => {
  //   inputEl.focus()
  // }

  const handleClick = () => {
    dispatch(changeTeamIndex(index))
  }

  useEffect(() => {
    if (teamsIndex.index === index) {
      inputEl.current.focus()
    }
  }, [])

  let t1 = teamsIndex.index === index ? 1 : null
  let bgc =
    teamsIndex.index === index ? { backgroundColor: 'lightgreen' } : null

  return (
    <td>
      <FormControl
        ref={inputEl}
        className={isModal ? 'table-input is-modal' : 'table-input'}
        value={word}
        onChange={(e) => handleChangeWord(e)}
        onBlur={(e) => handleBlurEvent(e)}
        onKeyPress={handleOnKeyPress}
        onClick={() => handleClick()}
        tabIndex={t1}
        // onFocus={handleFocusEvent}
        style={bgc}
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
