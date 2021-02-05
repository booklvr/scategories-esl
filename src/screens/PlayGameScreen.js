import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Container, Table, Row, Col, Button } from 'react-bootstrap'
import uuid from 'react-uuid'
import { removeWord, startNewGame } from '../actions/teamActions'

import GameHeader from '../components/GameHeader'
import GameTable from '../components/GameTable'

const PlayGameScreen = () => {
  const dispatch = useDispatch()
  const [loadTeams, setLoadTeams] = useState(false)
  const [isRandom, setIsRandom] = useState(false)

  function useQuery() {
    return new URLSearchParams(useLocation().search)
  }
  let query = useQuery()
  const queryResult = query.get('random')

  useEffect(() => {
    // dispatch(startNewGame())
    setLoadTeams(true)
  }, [])

  return (
    <Container className=' play-game-container' fluid>
      <GameHeader />
      {loadTeams && <GameTable />}
    </Container>
  )
}

export default PlayGameScreen
