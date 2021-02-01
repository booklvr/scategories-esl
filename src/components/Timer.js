import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Form, Row } from 'react-bootstrap'

const Timer = () => {
  const seconds = useSelector((state) => state.timer)

  const [timeLeft, setTimeLeft] = useState(seconds)

  console.log(timeLeft)

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) return

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId)
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft])

  return (
    <Col md={2}>
      <Form as={Row} className='timer header-container'>
        <Col className='minutes' md={5}>
          {Math.floor(timeLeft / 60)}
        </Col>
        <Col md={1}>:</Col>
        <Col className='seconds' md={5}>
          {timeLeft % 60}
        </Col>
      </Form>
    </Col>
  )
}

export default Timer
