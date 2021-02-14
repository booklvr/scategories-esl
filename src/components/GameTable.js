import React, { useState, useEffect } from 'react'
import uuid from 'react-uuid'
import PropTypes from 'prop-types'

import { useDispatch, useSelector } from 'react-redux'

import { Table, Button } from 'react-bootstrap'

// actions
import {
  removeWord,
  startNewGame,
  changeTeamIndex,
} from '../actions/teamActions'

// components
import TableInput from '../components/TableInput'

const GameTable = ({ isModal }) => {
  const dispatch = useDispatch()

  const letters = useSelector((state) => state.alphabet)
  // const teamsIndex = useSelector((state) => state.teamsIndex)
  const teams = useSelector((state) => state.teams)
  const [loadTeams, setLoadTeams] = useState(false)
  // const [teamIndex, setTeamIndex] = useState(0)

  useEffect(() => {
    if (isModal) {
      dispatch(startNewGame())
    }
    setLoadTeams(true)
  }, [])

  return (
    <div className='table-container'>
      {loadTeams && (
        <Table striped bordered className={isModal ? 'isModal' : null}>
          <colgroup>
            <col span='1' className='letter-column' />
          </colgroup>
          <thead>
            <tr>
              <th className='letter'></th>
              {teams.map(({ name }) => (
                <th className='px-1' key={uuid()}>
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {letters &&
              letters.map((letter, letterIndex) => (
                <tr key={uuid()}>
                  <td className='letter'>{letter}</td>
                  {teams.map((team, index) => {
                    if (team.alphabet[letterIndex].complete) {
                      return (
                        <td key={uuid()} className='table-word'>
                          {team.alphabet[letterIndex].word}
                          <Button
                            tabIndex={-1}
                            className='remove-btn'
                            onClick={() => {
                              dispatch(removeWord(team.id, letter))
                              dispatch(changeTeamIndex(team.id))
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
                          index={index}
                          current={team.current}
                          isModal={isModal}
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

GameTable.propTypes = {
  isModal: PropTypes.bool.isRequired,
}

GameTable.defaultProps = {
  isModal: false,
}

export default GameTable
