import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Container, Table, Row } from 'react-bootstrap'
import uuid from 'react-uuid'

import TableInput from '../components/TableInput'

const PlayGameScreen = () => {
  const categories = useSelector((state) => state.category)
  const letters = useSelector((state) => state.alphabet)

  const teams = useSelector((state) => state.teams)

  console.log(categories)
  console.log(teams)
  console.log(letters)

  function useQuery() {
    return new URLSearchParams(useLocation().search)
  }
  let query = useQuery()
  console.log(query.get('random'))

  return (
    <div className='playGameContainer'>
      <Row>
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
        <h1>Play Scategories</h1>
      </Row>

      <Table striped bordered>
        <thead>
          <tr>
            <th className='letter-col'></th>
            {teams &&
              teams.map((team) => (
                <th className='px-1' key={uuid()}>
                  {team} <div>1</div>
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {letters &&
            letters.map((letter) => (
              <tr key={uuid()}>
                <td className='letter'>{letter}</td>
                {teams.map(() => (
                  <TableInput key={uuid()} />
                ))}
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  )
}

export default PlayGameScreen
