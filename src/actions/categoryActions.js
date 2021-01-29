import uuid from 'react-uuid'
import {
  ADD_CATEGORY,
  ADD_CATEGORY_BY_CHECKBOX,
  LOAD_CATEGORY_LIST,
  CHECKBOX_CATEGORY_LIST,
  REMOVE_CATEGORY_BY_CHECKBOX,
  REMOVE_CATEGORY,
} from '../constants/categoryConstants'

export const addCategory = (category) => (dispatch) => {
  const newCategoryObject = {
    category,
    id: uuid(),
  }

  dispatch({ type: ADD_CATEGORY, payload: newCategoryObject })
}

export const loadCategoryList = (categoryList) => (dispatch) => {
  console.log('made it here mother fucker - category actions')
  console.log('categoryList', categoryList)
  dispatch({ type: LOAD_CATEGORY_LIST, payload: categoryList })
}

export const handleCheckEvent = (id, checked, value) => (dispatch) => {
  dispatch({ type: CHECKBOX_CATEGORY_LIST, payload: id })

  if (checked) {
    console.log('id, checked, value', id, checked, value)
    dispatch({
      type: ADD_CATEGORY_BY_CHECKBOX,
      payload: { id, category: value },
    })
  } else {
    dispatch({ type: REMOVE_CATEGORY_BY_CHECKBOX, payload: id })
  }
}

export const removeCategoryFromList = (id) => (dispatch) => {
  dispatch({
    type: REMOVE_CATEGORY,
    payload: id,
  })
}
