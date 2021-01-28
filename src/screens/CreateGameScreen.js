import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
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

import { addCategoryByText } from '../actions/categoryActions'
import { loadLetters } from '../actions/alphabetActions'
import { loadTeams } from '../actions/teamActions'

import TeamName from '../components/TeamName'

const CreateGameScreen = () => {
  // const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  // const commonLetters = 'toiswcbphfmderlnagukvyjqxz'
  const [numberOfTeams, setNumberOfTeams] = useState(2)
  const [numberOfRounds, setNumberOfRounds] = useState(10)

  
  const dispatch = useDispatch()
  const categories = useSelector((state) => state.category)
  const letters = useSelector((state) => state.alphabet)
  const teams = useSelector((state) => state.teams)

  console.log(teams)

  // const [teams, setTeams] = useState([])
  const [category, setCategory] = useState([])

  // dispatch(loadLetters(numberOfRounds))
  // const [categories, setCategories] = useState([])

  const handleAddCategoryInput = () => {
    // setCategories(() => [...categories, category])
    dispatch(addCategoryByText(category))
    setCategory('')
  }

  // const changeTeamNamesHandler = (name, index) => {
  //   // setTeams(() => {
  //   //   const newArray = [...teams]
  //   //   newArray[index] = name
  //   //   return newArray
  //   // })
  // }

  useEffect(() => {
    dispatch(loadLetters(numberOfRounds))
  }, [numberOfRounds])

  useEffect(() => {
    dispatch(loadTeams(numberOfTeams))
  }, [numberOfTeams])

  return (
    <Container fluid>
      <Row>
        <Col sm='12' md='6'>
          <h2>Scategories Template</h2>
          <Table striped bordered>
            <thead>
              <tr>
                <th></th>
                {teams &&
                  teams.map((team, index) => (
                    <th className='px-1' key={uuid()}>
                      <TeamName index={index} teamName={team} />
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {letters &&
                letters.map((letter) => (
                  <tr key={uuid()}>
                    <td>{letter}</td>
                    {teams.map(() => (
                      <td key={uuid()}></td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>

        <Col sm='12' md='6'>
          <h2>Create your game</h2>
          <Form>
            <Row>
              <Col sm='12' md='6'>
                <Form.Group as={Row}>
                  <Form.Label column sm='2'>
                    Teams
                  </Form.Label>
                  <Col sm='10'>
                    <Form.Control
                      min={1}
                      max={6}
                      type='number'
                      value={numberOfTeams}
                      onChange={(e) => setNumberOfTeams(e.target.value)}
                    />
                  </Col>
                </Form.Group>
              </Col>
              <Col sm='12' md='6'>
                <Form.Group as={Row} controlId='formPlaintextEmail'>
                  <Form.Label column sm='2'>
                    Rounds
                  </Form.Label>
                  <Col sm='10'>
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
            </Row>

            <Form.Group as={Row} controlId='formHorizontalEmail'>
              <Form.Label column sm={3}>
                Add a category
              </Form.Label>
              <Col lg={6}>
                <Form.Control
                  type='text'
                  placeholder='new Category'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Col>
              <Col lg={3}>
                <Button
                  className='mb-2'
                  onClick={(e) => handleAddCategoryInput(e)}
                >
                  Add
                </Button>
              </Col>
            </Form.Group>
          </Form>
          <Row>
            <Col
              md={6}
              style={{ border: '2px solid black', minHeight: '650px' }}
            >
              <h3
                style={{ textAlign: 'center', borderBottom: '1px solid black' }}
              >
                Categories
              </h3>
              <ListGroup>
                {categories.length > 0 &&
                  categories.map((category, index) => (
                    <ListGroup.Item key={uuid()}>{category}</ListGroup.Item>
                  ))}
              </ListGroup>
            </Col>
            <Col
              md={5}
              style={{ border: '2px solid black', minHeight: '650px' }}
            >
              <h3
                style={{ textAlign: 'center', borderBottom: '1px solid black' }}
              >
                Options
              </h3>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default CreateGameScreen
