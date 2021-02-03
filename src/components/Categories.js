import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import uuid from 'react-uuid'
import { Row, Col, Form, Button, Container, ListGroup } from 'react-bootstrap'
import {
  addCategory,
  handleCheckEvent,
  removeCategoryFromList,
} from '../actions/categoryActions'
import categories from '../data/categories'

const Categories = () => {
  const dispatch = useDispatch()

  const categoryList = useSelector((state) => state.categoryList)
  const categories = useSelector((state) => state.category)
  const [category, setCategory] = useState([])

  const handleKeyEnter = (event) => {
    if (event.key === 'Enter' && category !== '') {
      dispatch(addCategory(category))
      setCategory('')
    }
  }

  const removeCategory = (id) => {
    dispatch(removeCategoryFromList(id))
  }

  const handleAddButtonClick = () => {
    if (category !== '') {
      dispatch(addCategory(category))
      setCategory('')
    }
  }

  const onCheckHandler = ({ target: { id, checked, value } }) => {
    dispatch(handleCheckEvent(id, checked, value))
  }

  return (
    <Container className='container-container p-3'>
      <Row className='justify-content-md-center'>
        <Col className='category-column p-3' lg={12} xl={6}>
          <div className='category-container p-3'>
            <h3>Categories</h3>
            <ListGroup variant='flush'>
              {categories &&
                categories.map(({ category, id }) => (
                  <ListGroup.Item
                    className='d-flex justify-content-between mx-3'
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
          </div>
        </Col>
        <Col lg={12} xl={6} className='category-column p-3'>
          <div className='category-container p-3'>
            <h3>add to categories</h3>
            <Form>
              <Form.Row className='my-4'>
                <Col md={9}>
                  <Form.Control
                    type='text'
                    placeholder='new Category'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    onKeyPress={handleKeyEnter}
                  />
                </Col>

                <Col md={3}>
                  <Button onClick={handleAddButtonClick}>Add</Button>
                </Col>
              </Form.Row>

              {categoryList &&
                categoryList.map(({ checked, category, id }) => (
                  <Form.Group
                    className='pl-3'
                    key={uuid()}
                    controlId='formBasicCheckbox'
                  >
                    <Form.Check
                      type='checkbox'
                      checked={checked}
                      label={category}
                      id={id}
                      value={category}
                      onChange={(e) => onCheckHandler(e)}
                    ></Form.Check>
                  </Form.Group>
                ))}
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Categories
