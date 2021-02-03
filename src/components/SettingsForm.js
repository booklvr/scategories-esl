import React, { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Form, Row, Col, Container } from 'react-bootstrap'

// Actions
// import { changeNumberOfTeams } from '../actions/teamActions'
import { loadSeconds, toggleShowTimer } from '../actions/timerActions'

const SettingsForm = ({
  numberOfTeams,
  setNumberOfTeams,
  numberOfRounds,
  setNumberOfRounds,
}) => {
  const dispatch = useDispatch()
  const timer = useSelector((state) => state.timer)
  const teams = useSelector((state) => state.teams)
  const [minutes, setMinutes] = useState(Math.floor(timer.timeLeft / 60))
  const [seconds, setSeconds] = useState(timer.timeLeft % 60)

  const handleTimerBlurEvent = () => {
    const totalSeconds = parseInt(seconds) + parseInt(minutes * 60)
    dispatch(loadSeconds(totalSeconds))
  }

  const handleCheckboxClick = () => {
    dispatch(toggleShowTimer(!timer.showTimer))
  }

  return (
    <Container>
      <Form>
        <Row>
          <Col md={12} xxl={6} className='p-3 pb-xl-0'>
            <Form.Group as={Row} className='align-items-center'>
              <Col md={4}>
                <Form.Label>Teams</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  min={1}
                  max={6}
                  type='number'
                  value={numberOfTeams}
                  onChange={(e) =>
                    setNumberOfTeams(e.target.value > 6 ? 6 : e.target.value)
                  }
                />
              </Col>
            </Form.Group>
          </Col>
          <Col md={12} xxl={6} className='p-3 py-xl-0'>
            <Form.Group as={Row} className='align-items-center'>
              <Col md={4}>
                <Form.Label>Rounds</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  value={numberOfRounds}
                  type='number'
                  min={5}
                  max={26}
                  onChange={(e) => setNumberOfRounds(e.target.value)}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4} className='p-3 py-xl-0'>
            <Form.Group>
              <Row className='d-flex align-items-center'>
                <Col md={4}>
                  <Form.Label>Timer</Form.Label>
                </Col>
                <Col md={4}>
                  <label className='switch'>
                    <input
                      checked={timer.showTimer}
                      onChange={handleCheckboxClick}
                      type='checkbox'
                    />
                    <span className='slider'></span>
                  </label>
                </Col>
              </Row>
            </Form.Group>
          </Col>
          {timer.showTimer && (
            <Fragment>
              <Col md={4} className=''>
                <Form.Group>
                  <Row className='d-flex align-items-center'>
                    <Col md={3}>
                      <Form.Label>Min</Form.Label>
                    </Col>
                    <Col md={7} className=''>
                      <Form.Control
                        className=''
                        md={8}
                        value={minutes}
                        min={0}
                        type='number'
                        onChange={(e) => setMinutes(e.target.value)}
                        onBlur={handleTimerBlurEvent}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
              <Col md={1}></Col>

              <Col md={4} className=''>
                <Form.Group>
                  <Row className='d-flex align-items-center'>
                    <Col md={3}>
                      <Form.Label>Sec</Form.Label>
                    </Col>
                    <Col md={7} className=''>
                      <Form.Control
                        className=''
                        value={seconds}
                        type='number'
                        min={0}
                        onChange={(e) => setSeconds(e.target.value)}
                        onBlur={handleTimerBlurEvent}
                        step={5}
                      />
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
            </Fragment>
          )}
        </Row>
      </Form>
    </Container>
  )
}

export default SettingsForm
