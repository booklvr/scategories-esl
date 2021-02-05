import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { Container, Row, Col, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

// Actions
import { startNewGame } from '../actions/teamActions'

// Components
import RandomCategory from '../components/RandomCategory'
import Timer from '../components/Timer'

const GameHeader = () => {
  const dispatch = useDispatch()
  const [isRandom, setIsRandom] = useState(false)

  function useQuery() {
    return new URLSearchParams(useLocation().search)
  }
  let query = useQuery()
  const queryResult = query.get('random')

  useEffect(() => {
    dispatch(startNewGame())
    if (queryResult === 'true') {
      setIsRandom(true)
    } else {
      setIsRandom(false)
    }
  }, [])

  return (
    <Container fluid className='game-header'>
      <Row>
        <Col
          md={2}
          className='header-container d-flex justify-content-center p-3'
        >
          <LinkContainer to='/'>
            <Button className='header-btn btn-info'>Settings</Button>
          </LinkContainer>
        </Col>

        <Col md={8}>
          <RandomCategory isRandom={isRandom} />
        </Col>
        <Col md={2} className='p-0'>
          <Timer />
        </Col>
      </Row>
    </Container>
  )
}

export default GameHeader
