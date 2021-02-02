import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import RandomCategory from '../components/RandomCategory'

import uuid from 'react-uuid'
import {
  Container,
  Row,
  Col,
  Table,
  Form,
  Button,
  ListGroup,
  Modal,
} from 'react-bootstrap'

import {
  removeCategoryFromList,
  resetCategories,
} from '../actions/categoryActions'
import { loadLetters } from '../actions/alphabetActions'
import {
  loadTeams,
  changeNumberOfTeams,
  resetTeams,
} from '../actions/teamActions'

import TeamName from '../components/TeamName'
import Categories from '../components/Categories'
import LetterInput from '../components/LetterInput'
import { loadSeconds, toggleShowTimer } from '../actions/timerActions'

const CreateGameScreen = () => {
  // const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  // const commonLetters = 'toiswcbphfmderlnagukvyjqxz'

  const dispatch = useDispatch()
  const categories = useSelector((state) => state.category)
  const letters = useSelector((state) => state.alphabet)
  const teams = useSelector((state) => state.teams)
  const timer = useSelector((state) => state.timer)

  const [numberOfTeams, setNumberOfTeams] = useState(teams.length)
  const [numberOfRounds, setNumberOfRounds] = useState(10)
  const [minutes, setMinutes] = useState(Math.floor(timer.timeLeft / 60))
  const [seconds, setSeconds] = useState(timer.timeLeft % 60)
  const [showModal, setShowModal] = useState(false)

  const removeCategory = (id) => {
    dispatch(removeCategoryFromList(id))
  }

  const handleTimerBlurEvent = () => {
    const totalSeconds = parseInt(seconds) + parseInt(minutes * 60)
    dispatch(loadSeconds(totalSeconds))
  }

  const handleCheckboxClick = () => {
    dispatch(toggleShowTimer(!timer.showTimer))
  }

  const handleReset = () => {
    setNumberOfRounds(10)
    setNumberOfTeams(2)
    dispatch(resetTeams())
    dispatch(resetCategories())
  }

  const handleCloseModal = () => setShowModal(false)
  const handleShowModal = () => setShowModal(true)

  useEffect(() => {
    dispatch(loadLetters(numberOfRounds))
  }, [numberOfRounds])

  useEffect(() => {
    dispatch(changeNumberOfTeams(teams.length, numberOfTeams))
  }, [numberOfTeams])

  useEffect(() => {
    if (seconds == 60) {
      setSeconds(0)
      setMinutes(minutes + 1)
    }
  }, [seconds])

  // useEffect(() => {
  //   dispatch(loadTeams())
  // }, [])

  return (
    <Container className='createGameContainer' fluid>
      <Row>
        <Col sm='12' md='6'>
          <h2>Scategories Template</h2>
          <Table striped bordered>
            <thead>
              <tr>
                <th className='letter-column'></th>
                {teams &&
                  teams.map((team) => (
                    <th className='px-1' key={uuid()}>
                      <TeamName id={team.id} teamName={team.name} />
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody className='table-body'>
              {letters &&
                letters.map((letter, index) => (
                  <tr key={uuid()}>
                    <td className='letter-column'>
                      <LetterInput index={index} letter={letter} />
                    </td>
                    {teams.map(() => (
                      <td key={uuid()}></td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>

        <Col sm={12} md={6} className='px-0 mx-0'>
          <h2>Create your game</h2>
          <Form>
            <Row>
              <Col sm={12} md={6} className='px-5 form-input-container'>
                <Row>
                  <Col md={6}>
                    <Form.Group as={Row}>
                      <Form.Label column sm={6}>
                        Teams
                      </Form.Label>
                      <Col className='form-input-col' sm={6}>
                        <Form.Control
                          min={1}
                          max={6}
                          type='number'
                          value={numberOfTeams}
                          onChange={(e) =>
                            setNumberOfTeams(
                              e.target.value > 6 ? 6 : e.target.value
                            )
                          }
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group as={Row}>
                      <Form.Label column sm={12} md={6}>
                        Rounds
                      </Form.Label>
                      <Col sm={6} className='form-input-col'>
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
                  <Col md={3} className='timer-check-group'>
                    <Form.Group
                      as={Row}
                      checked={timer.showTimer}
                      controlId='formBasicCheckbox'
                      className='timerAndCheckbox'
                      onChange={handleCheckboxClick}
                    >
                      <Form.Label className='timer-label' column sm={12} md={6}>
                        Timer
                      </Form.Label>
                      <Form.Check type='checkbox' />
                    </Form.Group>
                  </Col>
                  {timer.showTimer && (
                    <Fragment>
                      <Col md={4} className='timer-minutes'>
                        <Form.Group>
                          <Row className='timer-row'>
                            <Col md={3}>
                              <Form.Label>Min</Form.Label>
                            </Col>
                            <Col md={9}>
                              <Form.Control
                                className='timer-input'
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

                      <Col md={4} className='timer-seconds'>
                        <Form.Group>
                          <Row className='timer-row'>
                            <Col md={3}>
                              <Form.Label>Sec</Form.Label>
                            </Col>
                            <Col md={9}>
                              <Form.Control
                                className='timer-input'
                                value={seconds}
                                type='number'
                                min={5}
                                onChange={(e) => setSeconds(e.target.value)}
                                onBlur={handleTimerBlurEvent}
                              />
                            </Col>
                          </Row>
                        </Form.Group>
                      </Col>
                    </Fragment>
                  )}
                </Row>
              </Col>

              <Col sm={12} md={5}>
                <Row className='mb-3' className='play-btn-row'>
                  <Col md={6} className={'play-btn-container'}>
                    <LinkContainer to={`/play?random=false`}>
                      <Button
                        disabled={categories.length === 0 ? true : false}
                        className='play-btn'
                      >
                        Play
                      </Button>
                    </LinkContainer>
                  </Col>
                  <Col md={6} className={'play-btn-container'}>
                    <LinkContainer to={`/play?random=true`}>
                      <Button className='play-btn'>Play Random</Button>
                    </LinkContainer>
                  </Col>
                </Row>
                <Row className='play-btn-row'>
                  <Col md={6} className={'play-btn-container'}>
                    <Button className='play-btn' onClick={handleReset}>
                      Reset
                    </Button>
                  </Col>
                  <Col md={6} className={'play-btn-container'}>
                    <Button onClick={handleShowModal} className='play-btn'>
                      how to play
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
          <Row className='mt-3 justify-content-md-center'>
            <Col className='mr-5 category-column' md={5}>
              <h3>Categories</h3>
              <ListGroup>
                {categories.length > 0 &&
                  categories.map(({ category, id }) => (
                    <ListGroup.Item
                      className='d-flex justify-content-between'
                      key={id}
                    >
                      {category}{' '}
                      <div
                        className='remove-btn'
                        onClick={() => removeCategory(id)}
                      >
                        <i className='fas fa-times'></i>
                      </div>
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </Col>
            <Categories />
          </Row>
        </Col>
      </Row>
      <Modal
        className='modal'
        show={showModal}
        onHide={handleCloseModal}
        animation={true}
        size='xl'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Scategories
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3 style={{ textAlign: 'center' }}>Scategories</h3>
          <p className='fz-2'>
            Scategories is a great classroom game that requires almost no prep.
            Students really enjoy it and it is a great use of production english
            in the classroom.
          </p>
          <h3 style={{ textAlign: 'center' }}>What you will need</h3>
          <Container className='instruction-group'>
            <h4>Supplies</h4>
            <p>
              It is best to play this game with a small white board, whiteboard
              marker, and whiteboard eraser for each team, but paper and pens
              should suffice.
            </p>
          </Container>
          <h3 style={{ textAlign: 'center' }}>Setup the game</h3>
          <Container className='instruction-group'>
            <h4>Step 1</h4>
            <p>
              First decide how many rounds you will play and how many teams you
              will need.
            </p>
            <Row>
              <Col md={3}>
                <Form.Group as={Row}>
                  <Form.Label column sm={6}>
                    Teams
                  </Form.Label>
                  <Col className='form-input-col' sm={6}>
                    <Form.Control
                      min={1}
                      max={6}
                      type='number'
                      value={numberOfTeams}
                      onChange={(e) =>
                        setNumberOfTeams(
                          e.target.value > 6 ? 6 : e.target.value
                        )
                      }
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group as={Row}>
                  <Form.Label column sm={12} md={6}>
                    Rounds
                  </Form.Label>
                  <Col sm={6} className='form-input-col'>
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
          </Container>
          <Container className='instruction-group'>
            <h4>Step 3</h4>
            <p>Choose whether or not to use a timer, and set your countdown.</p>
            <Row>
              <Col md={3} className='timer-check-group'>
                <Form.Group
                  as={Row}
                  checked={timer.showTimer}
                  controlId='formBasicCheckbox'
                  className='timerAndCheckbox'
                  onChange={handleCheckboxClick}
                >
                  <Form.Label className='timer-label' column sm={12} md={6}>
                    Timer
                  </Form.Label>
                  <Form.Check disabled type='checkbox' />
                </Form.Group>
              </Col>

              <Fragment>
                <Col md={4} className='timer-minutes'>
                  <Form.Group>
                    <Row className='timer-row'>
                      <Col md={3}>
                        <Form.Label>Min</Form.Label>
                      </Col>
                      <Col md={9}>
                        <Form.Control
                          className='timer-input'
                          md={8}
                          value={minutes}
                          type='number'
                          onChange={(e) => setMinutes(e.target.value)}
                          onBlur={handleTimerBlurEvent}
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>

                <Col md={4} className='timer-seconds'>
                  <Form.Group>
                    <Row className='timer-row'>
                      <Col md={3}>
                        <Form.Label>Sec</Form.Label>
                      </Col>
                      <Col md={9}>
                        <Form.Control
                          className='timer-input'
                          value={seconds}
                          type='number'
                          min={5}
                          onChange={(e) => setSeconds(e.target.value)}
                          onBlur={handleTimerBlurEvent}
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>
              </Fragment>
            </Row>
          </Container>
          <h3 style={{ textAlign: 'center' }}>How to play</h3>
          <Container className='instruction-group'>
            <h4>Step 2</h4>
            <p>
              Choose which categories you wish to use, and click{' '}
              <Button style={{ cursor: 'default' }}>Play</Button>
            </p>
            <p>
              If you would like to use the entire category list click{' '}
              <Button style={{ cursor: 'default' }}>play random</Button>
            </p>
          </Container>
          <Container className='instruction-group'>
            <h4>Step 4</h4>
            <Row>
              <Col md={4}>
                <p>
                  Press <Button>Start</Button> to begin the game
                </p>
                <p></p>
              </Col>
              <Col md={8}>
                <RandomCategory isModal={true} />

                <Table striped bordered>
                  <thead>
                    <tr>
                      <th className='letter-column'></th>
                      {teams &&
                        teams.map((team) => (
                          <th className='px-1' key={uuid()}>
                            <TeamName id={team.id} teamName={team.name} />
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody className='table-body'>
                    {letters &&
                      letters.map((letter, index) => (
                        <tr key={uuid()}>
                          <td className='letter-column'>{letter}</td>
                          {teams.map(() => (
                            <td key={uuid()}></td>
                          ))}
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>

          <Container>
            <Row>
              <Col xs={12} md={8}>
                .col-xs-12 .col-md-8
              </Col>
              <Col xs={6} md={4}>
                .col-xs-6 .col-md-4
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default CreateGameScreen
