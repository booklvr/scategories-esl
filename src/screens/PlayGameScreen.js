import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Container, Table, Row, Col, Button } from 'react-bootstrap'
import uuid from 'react-uuid'
import { removeWord, startNewGame } from '../actions/teamActions'

import TableInput from '../components/TableInput'
import RandomCategory from '../components/RandomCategory'

const PlayGameScreen = () => {
  const dispatch = useDispatch()
  const letters = useSelector((state) => state.alphabet)
  const teams = useSelector((state) => state.teams)
  const [loadTeams, setLoadTeams] = useState(false)
  const [isRandom, setIsRandom] = useState(false)

  console.log(isRandom)

  function useQuery() {
    return new URLSearchParams(useLocation().search)
  }
  let query = useQuery()
  const queryResult = query.get('random')
  console.log('queryResult', queryResult)

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
        <Col md={1} className='header-container'>
          <LinkContainer to='/'>
            <Button className='header-btn'>Go Back</Button>
          </LinkContainer>
        </Col>

        <Col md={10}>
          <RandomCategory isRandom={isRandom} />
        </Col>
      </Row>
      {loadTeams && (
        <Table striped bordered>
          <thead>
            <tr>
              <th className='letter-col'></th>
              {teams.map(({ name, index, id, alphabet }) => (
                <th className='px-1' key={id}>
                  {name}
                  <div className='header-letter'>
                    {alphabet[index].letter.toLowerCase()}
                  </div>
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
                    } else {
                      return (
                        <TableInput
                          // changeCurrentLetter={changeCurrentLetter}
                          // tabIndex='1'
                          teamId={team.id}
                          letter={letter}
                          key={uuid()}
                        />
                      )
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