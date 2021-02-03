import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'

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

// Actions
import { removeCategoryFromList } from '../actions/categoryActions'
import { loadLetters } from '../actions/alphabetActions'
import { changeNumberOfTeams } from '../actions/teamActions'

// Components
import TeamName from '../components/TeamName'
import Categories from '../components/Categories'
import PlayGameButtons from '../components/PlayGameButtons'
import RandomCategory from '../components/RandomCategory'
import Template from '../components/Template'
import SettingsForm from '../components/SettingsForm'

const CreateGameScreen = () => {
  const dispatch = useDispatch()
  const categories = useSelector((state) => state.category)
  const letters = useSelector((state) => state.alphabet)
  const teams = useSelector((state) => state.teams)
  const timer = useSelector((state) => state.timer)

  const [numberOfTeams, setNumberOfTeams] = useState(teams.length)
  const [numberOfRounds, setNumberOfRounds] = useState(letters.length)
  const [minutes, setMinutes] = useState(Math.floor(timer.timeLeft / 60))
  const [seconds, setSeconds] = useState(timer.timeLeft % 60)
  const [showModal, setShowModal] = useState(false)

  // const removeCategory = (id) => {
  //   dispatch(removeCategoryFromList(id))
  // }

  const handleTimerBlurEvent = () => {
    const totalSeconds = parseInt(seconds) + parseInt(minutes * 60)
    dispatch(loadSeconds(totalSeconds))
  }

  const handleCheckboxClick = () => {
    dispatch(toggleShowTimer(!timer.showTimer))
  }

  // const handleReset = () => {
  //   setNumberOfRounds(10)
  //   setNumberOfTeams(2)
  //   dispatch(resetTeams())
  //   dispatch(resetCategories())
  // }

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
    }
  }, [seconds])

  return (
    <Fragment>
      <Row>
        <Col sm={12} md={6} className='p-3'>
          <Template />
        </Col>

        <Col sm={12} md={6} className='p-3'>
          <h2>Create your game</h2>

          <Row>
            <Col sm={12} md={6} className='p-3 form-input-container'>
              <SettingsForm
                numberOfTeams={numberOfTeams}
                setNumberOfTeams={setNumberOfTeams}
                numberOfRounds={numberOfRounds}
                setNumberOfRounds={setNumberOfRounds}
              />
            </Col>
            <Col md={12} lg={6} className='p-3'>
              <PlayGameButtons
                categories={categories}
                setNumberOfRounds={setNumberOfRounds}
                setNumberOfTeams={setNumberOfTeams}
                handleShowModal={handleShowModal}
              />
            </Col>
          </Row>

          <Categories />
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
          <p className='mb-2 px-5 mx-5'>
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
            <h4>Step 2</h4>
            <p>Choose whether or not to use a timer, and set your countdown.</p>
            <Row>
              <Col md={4} className='timer-check-group'>
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
                  <Col></Col>
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

          <Container className='instruction-group'>
            <h4>Step 3</h4>
            <p>
              Choose which categories you wish to use, and click{' '}
              <Button style={{ cursor: 'default' }}>Play</Button>
            </p>
            <p>
              If you would like to use the entire category list click{' '}
              <Button style={{ cursor: 'default' }}>play random</Button>
            </p>
          </Container>
          <h3 style={{ textAlign: 'center' }}>How to play</h3>
          <Container className='instruction-group'>
            <h4>Instructions</h4>
            <Row>
              <Col md={6}>
                <ul>
                  <li>
                    Press <Button>Start</Button> to begin the game
                  </li>
                  <li>
                    The goal of the game is to write down words that match the
                    category at the top of the screen.
                  </li>
                  <li>
                    The first team to reach to reach the bottom of their column
                    wins.
                  </li>
                  <li>
                    For each round you can only write down a word that starts
                    with that rows letter.
                  </li>
                </ul>
                <p>For Example</p>
                <ul>
                  <li>
                    In the first round each team must write down a letter
                    starting with the letter <span>{letters[0]}</span> that
                    matches the category.
                  </li>
                  <li>
                    In round two, if {teams[0].name} was able to write down a
                    word starting with <span>{letters[0]}</span> than{' '}
                    {teams[0].name} would have to write down a word starting
                    with <span>{letters[1]}</span> but the other teams would
                    still have to write down a word starting with the letter{' '}
                    <span>{letters[0]}</span>
                  </li>
                </ul>
                <p></p>
              </Col>
              <Col md={6}>
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
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}

export default CreateGameScreen
