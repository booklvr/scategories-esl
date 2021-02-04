import React from 'react'
import uuid from 'react-uuid'
import {
  Modal,
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import PropTypes from 'prop-types'

import SettingsForm from '../components/SettingsForm'
import RandomCategory from '../components/RandomCategory'
import TeamName from '../components/TeamName'
import Categories from '../components/Categories'

const InstructionModal = ({ handleCloseModal, showModal }) => {
  // const timer = useSelector((state) => state.timer)
  const letters = useSelector((state) => state.alphabet)
  const teams = useSelector((state) => state.teams)

  const reload = () => window.location.reload()

  return (
    <Modal
      className='modal'
      show={showModal}
      onHide={handleCloseModal}
      onExited={reload}
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
          <Row>
            <Col nd={6}>
              <h4>Step 1</h4>
              <p>
                First decide how many rounds you will play and how many teams
                you will need.
              </p>
              <h4>Step 2</h4>
              <p>
                Choose whether or not to use a timer, and set your countdown.
              </p>
            </Col>
            <Col nd={6}>
              <SettingsForm />
            </Col>
          </Row>
        </Container>
        {/* <Container className='instruction-group'>
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
        </Container> */}

        <Container className='instruction-group'>
          <Row>
            <Col md={4}>
              <h4>Step 3</h4>
              <p>Choose which categories you would like to play with.</p>
              <p>
                {' '}
                After you have chosen all your categories click{' '}
                <Button style={{ cursor: 'default' }}>Play</Button> to begin the
                game.
              </p>
              <p>Or</p>
              <p>
                Click the{' '}
                <Button style={{ cursor: 'default' }}>play random</Button> to
                play the game using all the categories from the list.
              </p>
            </Col>
            <Col md={8}>
              <Categories />
            </Col>
          </Row>
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
                  For each round you can only write down a word that starts with
                  that rows letter.
                </li>
              </ul>
              <p>For Example</p>
              <ul>
                <li>
                  In the first round each team must write down a letter starting
                  with the letter <span>{letters[0]}</span> that matches the
                  category.
                </li>
                <li>
                  In round two, if {teams[0].name} was able to write down a word
                  starting with <span>{letters[0]}</span> than {teams[0].name}{' '}
                  would have to write down a word starting with{' '}
                  <span>{letters[1]}</span> but the other teams would still have
                  to write down a word starting with the letter{' '}
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
  )
}

InstructionModal.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  numberOfTeams: PropTypes.number.isRequired,
  setNumberOfTeams: PropTypes.func.isRequired,
  numberOfRounds: PropTypes.number.isRequired,
  setNumberOfRounds: PropTypes.func.isRequired,
}

export default InstructionModal
