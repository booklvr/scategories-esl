import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import uuid from 'react-uuid'
import { Col, Form } from 'react-bootstrap'
import {
  addCategory,
  loadCategoryList,
  handleCheckEvent,
} from '../actions/categoryActions'
import categories from '../data/categories'

const Categories = () => {
  const dispatch = useDispatch()

  const categoryList = useSelector((state) => state.categoryList)

  const onCheckHandler = ({ target: { id, checked, value } }) => {
    // dispatch(handleCheckEvent(e.target.id, e.target.checked, e.target.value))
    dispatch(handleCheckEvent(id, checked, value))
  }

  useEffect(() => {
    const categoryList = categories.map((category) => {
      return {
        checked: false,
        category,
        id: uuid(),
      }
    })

    dispatch(loadCategoryList(categoryList))
  }, [])

  return (
    <Col md={5} style={{ border: '2px solid black', minHeight: '650px' }}>
      <h3 style={{ textAlign: 'center', borderBottom: '1px solid black' }}>
        Options
      </h3>
      <Form>
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
