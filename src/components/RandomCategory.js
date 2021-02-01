import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { reloadSeconds } from '../actions/timerActions'

const RandomCategory = () => {
  const dispatch = useDispatch()
  const categories = useSelector((state) => state.category)
  const [randomCategories, setRandomCategories] = useState(null)
  const [index, setIndex] = useState(0)
  const [start, setStart] = useState(false)

  let shuffle = (array) => {
    return [...array].sort(() => Math.random() - 0.5)
  }

  const handleBackClick = () => {
    if (index > 0) {
      setIndex(index - 1)
    } else {
      setIndex(categories.length - 1)
    }

    dispatch(reloadSeconds())
  }

  const handleNextClick = () => {
    if (!start) {
      setStart(true)
      dispatch(reloadSeconds())
      return
    }

    if (index < categories.length - 1) {
      setIndex(index + 1)
    } else {
      setIndex(0)
    }

    dispatch(reloadSeconds())
  }

  useEffect(() => {
    setRandomCategories(shuffle(categories))
  }, [])

  return (
    <div className='header-container'>
      <Button
        className='header-btn'
        disabled={start === false ? true : false}
        onClick={handleBackClick}
      >
        Back
      </Button>
      {randomCategories && (
        <div className='random-category'>
          {randomCategories[index].category}
        </div>
      )}
      <Button className='header-btn' onClick={handleNextClick}>
        {start ? 'Next' : 'Start'}
      </Button>
    </div>
  )
}

export default RandomCategory
