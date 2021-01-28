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

import TeamName from '../components/TeamName'

const CreateGameScreen = () => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  // const commonLetters = 'toiswcbphfmderlnagukvyjqxz'

  const dispatch = useDispatch()
  const categories = useSelector((state) => state.category)

  console.log(categories)

  const [numberOfTeams, setNumberOfTeams] = useState(1)
  const [numberOfRounds, setNumberOfRounds] = useState(10)
  const [teams, setTeams] = useState([])
  const [letters, setLetters] = useState([])
  const [category, setCategory] = useState([])
  // const [categories, setCategories] = useState([])

  const handleAddCategoryInput = () => {
    // setCategories(() => [...categories, category])
    dispatch(addCategoryByText(category))
    setCategory('')
  }

  const getLetters = (array, size) => {
    let m = array.length
    let n = size
    let t, i

    // While there remain elements to shuffle…
    while (n) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--)

      // And swap it with the current element.
      t = array[m]
      array[m] = array[i]
      array[i] = t
      n--
    }

    return array.slice(0, size)
  }

  const changeTeamNamesHandler = (name, index) => {
    setTeams(() => {
      const newArray = [...teams]
      newArray[index] = name
      return newArray
    })
  }

  useEffect(() => {
    setTeams(() => {
      let newTeams = []
      for (let i = 0; i < numberOfTeams; i++) {
        newTeams.push(`team ${i + 1}`)
      }
      return newTeams
    })
  }, [numberOfTeams])

  useEffect(() => {
    setLetters(() => getLetters([...alphabet], numberOfRounds))
  }, [numberOfRounds, numberOfTeams])

  return (
    <Container fluid>
      <Row>
        <Col sm='12' md='6'>
          <h2>Scategories Template</h2>
          <Table striped bordered>
            <thead>
              <tr>
                <th></th>
                {!numberOfTeams ? (
                  <th>Add teams</th>
                ) : (
                  teams.map((team, index) => (
                    <th key={uuid()}>
                      <TeamName
                        changeTeamNamesHandler={changeTeamNamesHandler}
                        index={index}
                        teamName={team}
                      />
                    </th>
                  ))
                )}
              </tr>
            </thead>
            <tbody>
              {letters.map((letter, letterIndex) => (
                <tr key={uuid()}>
                  <td>{letter}</td>
                  {teams.map((team, teamIndex) => (
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
