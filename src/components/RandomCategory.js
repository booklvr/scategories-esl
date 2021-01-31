import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const RandomCategory = () => {
  const categories = useSelector((state) => state.category)
  const [randomCategories, setRandomCategories] = useState(null)
  const [index, setIndex] = useState(0)

  let shuffle = (array) => {
    return [...array].sort(() => Math.random() - 0.5)
  }

  const handleBackClick = () => {
    if (index > 0) {
      setIndex(index - 1)
    } else {
      setIndex(categories.length - 1)
    }
  }

  const handleNextClick = () => {
    if (index < categories.length - 1) {
      setIndex(index + 1)
    } else {
      setIndex(0)
    }
  }

  useEffect(() => {
    setRandomCategories(shuffle(categories))
  }, [])

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
