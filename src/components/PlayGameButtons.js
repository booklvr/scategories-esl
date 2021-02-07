import React, { Fragment } from 'react'
import { Col, Row, Button, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { resetTeams } from '../actions/teamActions'
import { resetCategories } from '../actions/categoryActions'
import { resetTime } from '../actions/timerActions'
import { loadLetters } from '../actions/alphabetActions'

const PlayGameButtons = ({
  setNumberOfRounds,
  setNumberOfTeams,
  handleShowModal,
  categories,
}) => {
  const dispatch = useDispatch()

  const handleReset = () => {
    setNumberOfRounds(10)
    setNumberOfTeams(2)
    dispatch(resetTeams())
    dispatch(resetCategories())
    dispatch(loadLetters(10))
    dispatch(resetTime())
  }
  return (
    <Container className=''>
      <Row>
        <Col xl={6} className='py-2 d-flex'>
          <LinkContainer
            to={`/play?random=false`}
            className='d-flex justify-content-center align-items-center'
          >
            <Button
              disabled={categories.length === 0 ? true : false}
              className='flex-grow-1 bg-success'
            >
              Play
            </Button>
          </LinkContainer>
        </Col>
        <Col xl={6} className='py-2 d-flex'>
          <LinkContainer
            to={`/play?random=true`}
            className='d-flex justify-content-center align-items-center'
          >
            <Button className='flex-grow-1 btn-success'>Play Random</Button>
          </LinkContainer>
        </Col>
      </Row>
      <Row>
        <Col xl={6} className='py-2 d-flex'>
          <Button className='flex-grow-1 btn-danger' onClick={handleReset}>
            Reset
          </Button>
        </Col>
        <Col xl={6} className='py-2 d-flex'>
          <Button onClick={handleShowModal} className='flex-grow-1 btn-info'>
            how to play
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

PlayGameButtons.propTypes = {
  setNumberOfRounds: PropTypes.func.isRequired,
  setNumberOfTeams: PropTypes.func.isRequired,
  handleShowModal: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
}

export default PlayGameButtons
