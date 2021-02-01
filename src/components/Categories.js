import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import uuid from 'react-uuid'
import { Row, Col, Form, Button } from 'react-bootstrap'
import {
  addCategory,
  loadCategoryList,
  handleCheckEvent,
} from '../actions/categoryActions'
import categories from '../data/categories'

const Categories = () => {
  const dispatch = useDispatch()

  const categoryList = useSelector((state) => state.categoryList)
  const activeList = useSelector((state) => state.category)
  const [category, setCategory] = useState([])

  const handleKeyEnter = (event) => {
    if (event.key === 'Enter' && category !== '') {
      dispatch(addCategory(category))
      setCategory('')
    }
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

  // useEffect(() => {
  //   const categoryList = categories.map((category) => {
  //     return {
  //       checked: activeList.map((item) => item.category).includes(category)
  //         ? true
  //         : false,
  //       category,
  //       id: uuid(),
  //     }
  //   })

  //   dispatch(loadCategoryList(categoryList))
  // }, [activeList])

  return (
    <Col md={5} className='category-column'>
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
            <Form.Group key={uuid()} controlId='formBasicCheckbox'>
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
    </Col>
  )
}

export default Categories
