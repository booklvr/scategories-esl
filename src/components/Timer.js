import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Container } from 'react-bootstrap'

// COMPONENTS
import MuteButton from './MuteButton'

import {
  timerDoneAnimationStart,
  timerDoneAnimationEnd,
} from '../actions/timerActions'

// SOUNDS
import { timesUpSound, endSound } from '../assets/sounds/audio'

const Timer = () => {
  const dispatch = useDispatch()
  const timer = useSelector((state) => state.timer)

  const [timeLeft, setTimeLeft] = useState(timer.timeLeft)
  const [start, setStart] = useState(timer.start)
  const [timerFinished, setTimerFinished] = useState()

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) {
      endSound.play()
      return
    }

    if (!timer.start) return

    // sound
    if (timeLeft === 20) {
      timesUpSound.fade(0.01, 0.25, 20000)
      timesUpSound.play()
    }

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId)
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft, timer])

  useEffect(() => {
    setTimeLeft(timer.timeLeft)
    setStart(timer.start)
  }, [timer])

  useEffect(() => {
    if (timeLeft === 0) {
      dispatch(timerDoneAnimationStart())
      setTimerFinished(true)
      setTimeout(() => {
        setTimerFinished(false)
        dispatch(timerDoneAnimationEnd())
      }, 3000)
    }
    // return () => clearTimeout(timer1)
  }, [timeLeft])

  return (
    <Container className='timer'>
      {timer.showTimer ? (
        <Row
          className={
            timerFinished
              ? 'blink header-container d-flex justify-content-center'
              : 'header-container d-flex justify-content-center'
          }
        >
          <MuteButton></MuteButton>
          <Col className='d-flex justify-content-center' md={3}>
            {Math.floor(timeLeft / 60)}
          </Col>
          <Col className='d-flex justify-content-center' md={1}>
            :
          </Col>
          <Col className='d-flex justify-content-center' md={3}>
            {(() => {
              const time = timeLeft % 60
              return time.toLocaleString(undefined, { minimumIntegerDigits: 2 })
            })()}
          </Col>
        </Row>
      ) : (
        <Row
          className='header-container'
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '120px',
          }}
        >
          <h2 style={{ fontSize: '20px' }}>Scategories</h2>
        </Row>
      )}
    </Container>
  )
}

export default Timer
