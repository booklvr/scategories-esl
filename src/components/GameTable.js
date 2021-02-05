import React from 'react'
import uuid from 'react-uuid'

import { useDispatch, useSelector } from 'react-redux'

import { Table, Button } from 'react-bootstrap'

// actions
import { removeWord } from '../actions/teamActions'

// components
import TableInput from '../components/TableInput'

const GameTable = () => {
  const dispatch = useDispatch()

  const letters = useSelector((state) => state.alphabet)
  const teams = useSelector((state) => state.teams)

  return (
    <div className='table-container'>
      <Table striped bordered>
        <col span='1' className='letter-column' />
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
    </div>
  )
}

export default GameTable
