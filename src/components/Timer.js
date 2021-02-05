import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Col, Row, Container } from 'react-bootstrap'

const Timer = () => {
  const timer = useSelector((state) => state.timer)

  const [timeLeft, setTimeLeft] = useState(timer.timeLeft)
  const [start, setStart] = useState(timer.start)

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) return

    if (!timer.start) return

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

  useEffect(() => {})

  return (
    <Container className='timer'>
      {timer.showTimer ? (
        <Row className=' header-container d-flex justify-content-center'>
          <Col className='d-flex justify-content-center' md={3}>
            {Math.floor(timeLeft / 60)}
          </Col>
          <Col className='d-flex justify-content-center' md={1}>
            :
          </Col>
          <Col className='d-flex justify-content-center' md={3}>
            {timeLeft % 60}
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
