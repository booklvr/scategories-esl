import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
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

import { addCategory, removeCategoryFromList } from '../actions/categoryActions'
import { loadLetters } from '../actions/alphabetActions'
import { loadTeams } from '../actions/teamActions'

import TeamName from '../components/TeamName'
import Categories from '../components/Categories'

const CreateGameScreen = () => {
  // const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  // const commonLetters = 'toiswcbphfmderlnagukvyjqxz'
  const [numberOfTeams, setNumberOfTeams] = useState(2)
  const [numberOfRounds, setNumberOfRounds] = useState(10)

  const dispatch = useDispatch()
  const categories = useSelector((state) => state.category)
  const letters = useSelector((state) => state.alphabet)
  const teams = useSelector((state) => state.teams)

  // const [teams, setTeams] = useState([])
  const [category, setCategory] = useState([])

  const handleAddCategoryInput = () => {
    // setCategories(() => [...categories, category])
    dispatch(addCategory(category))
    setCategory('')
  }

  const handleKeyEnter = (event) => {
    if (event.key === 'Enter') {
      handleAddCategoryInput()
    }
  }

  const removeCategory = (id) => {
    dispatch(removeCategoryFromList(id))
  }

  useEffect(() => {
    dispatch(loadLetters(numberOfRounds))
  }, [numberOfRounds])

  useEffect(() => {
    dispatch(loadTeams(numberOfTeams))
  }, [numberOfTeams])

  return (
    <Container className='createGameContainer' fluid>
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
              <Form.Label column sm={2}>
                Add a category
              </Form.Label>
              <Col lg={5}>
                <Form.Control
                  type='text'
                  placeholder='new Category'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  onKeyPress={handleKeyEnter}
                />
              </Col>
              <Col lg={5}>
                <LinkContainer to={`/play?random=false`}>
                  <Button className='mb-2 play-btn'>Play</Button>
                </LinkContainer>
                <LinkContainer to={`/play?random=true`}>
                  <Button className='mb-2 play-btn play-random'>
                    Play Random
                  </Button>
                </LinkContainer>
              </Col>
            </Form.Group>
          </Form>
          <Row className='justify-content-md-center'>
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
