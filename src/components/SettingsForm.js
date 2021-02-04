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
          <Col lg={12} xl={6} className='p-md-2 p-xl-3'>
            <Form.Group as={Row} className='align-items-center'>
              <Col md={4} className='pl-1'>
                <Form.Label>Teams</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  className='p-1'
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
          <Col lg={12} xl={6} className='p-2 p-xl-3'>
            <Form.Group as={Row} className='align-items-center'>
              <Col md={4} className='pl-1'>
                <Form.Label>Rounds</Form.Label>
              </Col>
              <Col md={8}>
                <Form.Control
                  className='p-1'
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
          <Col xl={12} xxl={4} className='p-3 py-xl-0'>
            <Form.Group>
              <Row className='d-flex align-items-center'>
                <Col md={6} xl={3} className=''>
                  <Form.Label className=''>Timer</Form.Label>
                </Col>
                <Col md={6} xl={3} className='ml-3'>
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
            <Col xl={12} xxl={8} className=''>
              <Row>
                <Col md={6} className=''>
                  <Form.Group>
                    <Row className='d-flex align-items-center'>
                      <Col md={4} className=''>
                        <Form.Label className=''>Min</Form.Label>
                      </Col>
                      <Col md={8} className='pl-0'>
                        <Form.Control
                          className='p-2'
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

                <Col md={6} className=''>
                  <Form.Group>
                    <Row className='d-flex align-items-center'>
                      <Col md={4}>
                        <Form.Label>Sec</Form.Label>
                      </Col>
                      <Col md={8} className='pl-0'>
                        <Form.Control
                          className='p-2'
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
              </Row>
            </Col>
          )}
        </Row>
      </Form>
    </Container>
  )
}

export default SettingsForm
