import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { reloadSeconds } from '../actions/timerActions'

const RandomCategory = () => {
  const dispatch = useDispatch()
  const categories = useSelector((state) => state.category)
  const categoryList = useSelector((state) => state.categoryList)
  const [randomCategories, setRandomCategories] = useState(null)
  const [index, setIndex] = useState(0)
  const [start, setStart] = useState(false)

  function useQuery() {
    return new URLSearchParams(useLocation().search)
  }
  let query = useQuery()
  const isRandom = query.get('random')
  console.log('queryResult', isRandom)

  // useEffect(() => {
  //   dispatch(startNewGame())
  //   setLoadTeams(true)
  //   if (queryResult === 'true') {
  //     setIsRandom(true)
  //   } else {
  //     setIsRandom(false)
  //   }
  // }, [])

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
    if (isRandom === 'true') {
      setRandomCategories(shuffle(categoryList))
    } else {
      setRandomCategories(shuffle(categories))
    }
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
