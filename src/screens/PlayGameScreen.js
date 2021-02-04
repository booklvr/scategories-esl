import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Container, Table, Row, Col, Button } from 'react-bootstrap'
import uuid from 'react-uuid'
import { removeWord, startNewGame } from '../actions/teamActions'

import TableInput from '../components/TableInput'
import RandomCategory from '../components/RandomCategory'
import Timer from '../components/Timer'

const PlayGameScreen = () => {
  const dispatch = useDispatch()
  const letters = useSelector((state) => state.alphabet)
  const teams = useSelector((state) => state.teams)
  const [loadTeams, setLoadTeams] = useState(false)
  const [isRandom, setIsRandom] = useState(false)

  function useQuery() {
    return new URLSearchParams(useLocation().search)
  }
  let query = useQuery()
  const queryResult = query.get('random')

  useEffect(() => {
    dispatch(startNewGame())
    setLoadTeams(true)
    if (queryResult === 'true') {
      setIsRandom(true)
    } else {
      setIsRandom(false)
    }
  }, [])

  return (
    <div className='playGameContainer'>
      <Row>
        <Col md={2} className='header-container d-flex justify-content-center'>
          <LinkContainer to='/'>
            <Button className='header-btn btn-info'>Settings</Button>
          </LinkContainer>
        </Col>

        <Col md={8}>
          <RandomCategory isRandom={isRandom} />
        </Col>
        <Timer />
      </Row>
      {loadTeams && (
        <Table striped bordered>
          <thead>
            <tr>
              <th className='letter-col'></th>
              {teams.map(({ name, index, id, alphabet }) => (
                <th className='px-1' key={uuid()}>
                  {name}
                  {/* <div className='header-letter'>
                    {alphabet[index].letter.toLowerCase()}
                  </div> */}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {letters &&
              letters.map((letter, letterIndex) => (
                <tr key={uuid()}>
                  <td className='letter'>{letter}</td>
                  {teams.map((team) => {
                    if (team.alphabet[letterIndex].complete) {
                      return (
                        <td key={uuid()} className='table-word'>
                          {team.alphabet[letterIndex].word}
                          <Button
                            className='remove-btn'
                            onClick={() => {
                              dispatch(removeWord(team.id, letter))
                            }}
                          >
                            <i className='fas fa-times'></i>
                          </Button>
                        </td>
                      )
                    } else if (
                      letterIndex === 0 ||
                      team.alphabet[letterIndex - 1].complete
                    ) {
                      return (
                        <TableInput
                          // changeCurrentLetter={changeCurrentLetter}
                          // tabIndex='1'
                          teamId={team.id}
                          letter={letter}
                          key={uuid()}
                        />
                      )
                    } else {
                      return <td key={uuid()}></td>
                    }
                  })}
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default PlayGameScreen
