import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { reloadSeconds, startTimer } from '../actions/timerActions'
import { resetTeamsIndex } from '../actions/teamActions'

const RandomCategory = ({ isModal }) => {
  const dispatch = useDispatch()
  const categories = useSelector((state) => state.category)
  const categoryList = useSelector((state) => state.categoryList)
  const timer = useSelector((state) => state.timer)
  const [randomCategories, setRandomCategories] = useState(null)
  const [index, setIndex] = useState(0)
  const [start, setStart] = useState(false)
  const [timerFinished, setTimerFinished] = useState(false)

  function useQuery() {
    return new URLSearchParams(useLocation().search)
  }
  let query = useQuery()
  let isRandom = query.get('random')

  let shuffle = (array) => {
    return [...array].sort(() => Math.random() - 0.5)
  }

  const handleBackClick = () => {
    if (index > 0) {
      setIndex(index - 1)
    } else {
      setIndex(randomCategories.length - 1)
    }

    if (timer.showTimer) {
      dispatch(reloadSeconds())
      dispatch(resetTeamsIndex())
    }
  }

  const handleNextClick = () => {
    dispatch(resetTeamsIndex())
    if (!start) {
      setStart(true)
      if (timer.showTimer) {
        dispatch(reloadSeconds())
      }
    }

    if (index < randomCategories.length - 1) {
      setIndex(index + 1)
    } else {
      setIndex(0)
    }

    if (timer.showTimer) {
      dispatch(reloadSeconds())
    }
  }

  useEffect(() => {
    if (isRandom === 'true' || isModal) {
      setRandomCategories(shuffle(categoryList))
    } else {
      setRandomCategories(shuffle(categories))
    }
    dispatch(startTimer())
  }, [])

  useEffect(() => {
    if (timer.end) {
      setTimerFinished(true)
    } else {
      setTimerFinished(false)
    }
  }, [timer])

  return (
    <div
      className={
        timerFinished ? 'header-container blink p-3' : 'header-container p-3'
      }
    >
      <Button
        className='header-btn btn-success '
        disabled={start === false ? true : false}
        onClick={handleBackClick}
      >
        Back
      </Button>
      {randomCategories && (
        <div className={`random-category ${isModal ? 'is-modal' : ''}`}>
          {!start ? 'Press Start to Begin' : randomCategories[index].category}
        </div>
      )}
      <Button className='header-btn btn-success' onClick={handleNextClick}>
        {start ? 'Next' : 'Start'}
      </Button>
    </div>
  )
}

RandomCategory.propTypes = {
  isModal: PropTypes.bool.isRequired,
}

RandomCategory.defaultProps = {
  isModal: false,
}

export default RandomCategory
