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
import Template from '../components/Template'
import SettingsForm from '../components/SettingsForm'
import InstructionModal from '../components/InstructionModal'

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

  // const handleTimerBlurEvent = () => {
  //   const totalSeconds = parseInt(seconds) + parseInt(minutes * 60)
  //   dispatch(loadSeconds(totalSeconds))
  // }

  // const handleCheckboxClick = () => {
  //   dispatch(toggleShowTimer(!timer.showTimer))
  // }

  // const handleReset = () => {
  //   setNumberOfRounds(10)
  //   setNumberOfTeams(2)
  //   dispatch(resetTeams())
  //   dispatch(resetCategories())
  // }

  const handleCloseModal = () => setShowModal(false)
  const handleShowModal = () => setShowModal(true)

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
      <InstructionModal
        handleCloseModal={handleCloseModal}
        handleShowModal={handleShowModal}
        showModal={showModal}
        numberOfTeams={numberOfTeams}
        setNumberOfTeams={setNumberOfTeams}
        numberOfRounds={numberOfRounds}
        setNumberOfRounds={setNumberOfRounds}
      />
    </Fragment>
  )
}

export default CreateGameScreen
