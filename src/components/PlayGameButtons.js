import React, { Fragment } from 'react'
import { Col, Row, Button, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { resetTeams } from '../actions/teamActions'
import { resetCategories } from '../actions/categoryActions'

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
  }
  return (
    <Container className=''>
      <Row>
        <Col
          xl={6}
          className='play-btn-container py-2 d-flex justify-content-center align-items-center'
        >
          <LinkContainer to={`/play?random=false`}>
            <Button
              disabled={categories.length === 0 ? true : false}
              className='flex-grow-1'
            >
              Play
            </Button>
          </LinkContainer>
        </Col>
        <Col
          xl={6}
          className='play-btn-container py-2 d-flex justify-content-center align-items-center'
        >
          <LinkContainer to={`/play?random=true`}>
            <Button className='flex-grow-1'>Play Random</Button>
          </LinkContainer>
        </Col>
      </Row>
      <Row>
        <Col
          xl={6}
          className='play-btn-container py-2 d-flex justify-content-center align-items-center'
        >
          <Button className='flex-grow-1' onClick={handleReset}>
            Reset
          </Button>
        </Col>
        <Col
          xl={6}
          className='play-btn-container py-2 d-flex justify-content-center align-items-center'
        >
          <Button onClick={handleShowModal} className='flex-grow-1'>
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
