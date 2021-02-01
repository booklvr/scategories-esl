import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { reloadSeconds } from '../actions/timerActions'

const RandomCategory = ({ isRandom }) => {
  const dispatch = useDispatch()
  const categories = useSelector((state) => state.category)
  const categoryList = useSelector((state) => state.categoryList)

  const [randomCategories, setRandomCategories] = useState(null)
  const [arrayLength, setArrayLength] = useState(null)
  const [index, setIndex] = useState(0)

  let shuffle = (array) => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      // And swap it with the current element.
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }

    return array
  }

  const handleBackClick = () => {
    if (index > 0) {
      setIndex(index - 1)
    } else {
      setIndex(arrayLength - 1)
    }
    dispatch(reloadSeconds())
  }

  const handleNextClick = () => {
    if (index < arrayLength - 1) {
      setIndex(index + 1)
    } else {
      setIndex(0)
    }
  }

  useEffect(() => {
    if (isRandom) {
      setRandomCategories(() => {
        const fullSet = categoryList.map(({ id, category }) => ({
          id,
          category,
        }))
        return shuffle(fullSet)
      })
    } else {
      setRandomCategories(shuffle(categories))
    }
  }, [isRandom])

  useEffect(() => {
    if (randomCategories) setArrayLength(randomCategories.length)
  }, [randomCategories])

  return (
    <div className='header-container'>
      <Button className='header-btn' onClick={handleBackClick}>
        Back
      </Button>
      {randomCategories && (
        <div className='random-category'>
          {randomCategories[index].category}
        </div>
      )}
      <Button className='header-btn' onClick={handleNextClick}>
        Next
      </Button>
    </div>
  )
}

export default RandomCategory
