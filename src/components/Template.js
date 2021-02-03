import React, { Fragment } from 'react'
import uuid from 'react-uuid'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
import LetterInput from '../components/LetterInput'
import TeamName from '../components/TeamName'

const Template = () => {
  const teams = useSelector((state) => state.teams)
  const letters = useSelector((state) => state.alphabet)

  return (
    <Fragment>
      <h2>Scategories Template</h2>
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
                <td className='letter-column'>
                  <LetterInput index={index} letter={letter} />
                </td>
                {teams.map(() => (
                  <td key={uuid()}></td>
                ))}
              </tr>
            ))}
        </tbody>
      </Table>
    </Fragment>
  )
}

export default Template
