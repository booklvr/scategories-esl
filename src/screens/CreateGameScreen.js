import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import uuid from 'react-uuid'
import {
  Container,
  Row,
  Col,
  Table,
  Form,
  Button,
  ListGroup,
} from 'react-bootstrap'

import {
  removeCategoryFromList,
  resetCategories,
} from '../actions/categoryActions'
import { loadLetters } from '../actions/alphabetActions'
import {
  loadTeams,
  changeNumberOfTeams,
  resetTeams,
} from '../actions/teamActions'

import TeamName from '../components/TeamName'
import Categories from '../components/Categories'
import LetterInput from '../components/LetterInput'

const CreateGameScreen = () => {
  // const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  // const commonLetters = 'toiswcbphfmderlnagukvyjqxz'

  const dispatch = useDispatch()
  const categories = useSelector((state) => state.category)
  const letters = useSelector((state) => state.alphabet)
  const teams = useSelector((state) => state.teams)

  const [numberOfTeams, setNumberOfTeams] = useState(teams.length)
  const [numberOfRounds, setNumberOfRounds] = useState(10)
  const [seconds, setSeconds] = useState(30)

  const removeCategory = (id) => {
    dispatch(removeCategoryFromList(id))
  }

  const handleSecondsBlurEvent = () => {
    console.log('fucking blurred')
  }

  const handleReset = () => {
    setNumberOfRounds(10)
    setNumberOfTeams(2)
    dispatch(resetTeams())
    dispatch(resetCategories())
  }

  useEffect(() => {
    dispatch(loadLetters(numberOfRounds))
  }, [numberOfRounds])

  useEffect(() => {
    dispatch(changeNumberOfTeams(teams.length, numberOfTeams))
  }, [numberOfTeams])

  // useEffect(() => {
  //   dispatch(loadTeams())
  // }, [])

  return (
    <Container className='createGameContainer' fluid>
      <Row>
        <Col sm='12' md='6'>
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
        </Col>

        <Col sm={12} md={6}>
          <h2>Create your game</h2>
          <Form>
            <Row className='ml-4'>
              <Col sm={6} lg={2} className='form-input-container'>
                <Form.Group as={Row}>
                  <Form.Label column sm={5}>
                    Teams
                  </Form.Label>
                  <Col className='form-input-col' sm={4}>
                    <Form.Control
                      min={1}
                      max={6}
                      type='number'
                      value={numberOfTeams}
                      onChange={(e) =>
                        setNumberOfTeams(
                          e.target.value > 6 ? 6 : e.target.value
                        )
                      }
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col sm={6} lg={2} className='form-input-container'>
                <Form.Group as={Row}>
                  <Form.Label column sm={5}>
                    Rounds
                  </Form.Label>
                  <Col sm={4} className='form-input-col'>
                    <Form.Control
                      value={numberOfRounds}
                      type='number'
                      min={5}
                      max={26}
                      onChange={(e) => setNumberOfRounds(e.target.value)}
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col sm={6} lg={2} className='form-input-container'>
                <Form.Group as={Row}>
                  <Form.Label column sm={5}>
                    Timer(sec)
                  </Form.Label>
                  <Col className='form-input-col' sm={4}>
                    <Form.Control
                      value={seconds}
                      type='number'
                      min={5}
                      onChange={(e) => setSeconds(e.target.value)}
                      onBlur={handleSecondsBlurEvent}
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col
                lg={5}
                className='px-0 ml-2 d-flex justify-content-around create-game-btn-group'
              >
                <LinkContainer to={`/play?random=false`}>
                  <Button
                    disabled={categories.length === 0 ? true : false}
                    className='mb-2  play-btn'
                  >
                    Play
                  </Button>
                </LinkContainer>
                <LinkContainer to={`/play?random=true`}>
                  <Button className='mb-2  play-btn play-random'>
                    Play Random
                  </Button>
                </LinkContainer>

                <Button className='mb-2  play-btn' onClick={handleReset}>
                  Reset
                </Button>
              </Col>
            </Row>
          </Form>
          <Row className='mt-3 justify-content-md-center'>
            <Col className='mr-5 category-column' md={5}>
              <h3>Categories</h3>
              <ListGroup>
                {categories.length > 0 &&
                  categories.map(({ category, id }) => (
                    <ListGroup.Item
                      className='d-flex justify-content-between'
                      key={id}
                    >
                      {category}{' '}
                      <div
                        className='remove-btn'
                        onClick={() => removeCategory(id)}
                      >
                        <i className='fas fa-times'></i>
                      </div>
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </Col>
            <Categories />
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default CreateGameScreen
