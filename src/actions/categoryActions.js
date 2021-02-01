import uuid from 'react-uuid'
import {
  ADD_CATEGORY,
  ADD_CATEGORY_BY_CHECKBOX,
  REMOVE_CATEGORY,
  RESET_CATEGORIES,
} from '../constants/categoryConstants'

export const addCategory = (category) => (dispatch, getState) => {
  const newCategoryObject = {
    category,
    id: uuid(),
  }

  dispatch({ type: ADD_CATEGORY, payload: newCategoryObject })

  localStorage.setItem('categories', JSON.stringify(getState().category))
}

// export const loadCategoryList = (categoryList) => (dispatch) => {
//   dispatch({ type: LOAD_CATEGORY_LIST, payload: categoryList })
// }

export const handleCheckEvent = (id, checked, value) => (
  dispatch,
  getState
) => {
  // dispatch({ type: CHECKBOX_CATEGORY_LIST, payload: id })

  if (checked) {
    dispatch({
      type: ADD_CATEGORY_BY_CHECKBOX,
      payload: { id, category: value },
    })
    localStorage.setItem('categories', JSON.stringify(getState().category))
    localStorage.setItem(
      'categoryList',
      JSON.stringify(getState().categoryList)
    )
  } else {
    dispatch({ type: REMOVE_CATEGORY, payload: id })
    localStorage.setItem('categories', JSON.stringify(getState().category))
    localStorage.setItem(
      'categoryList',
      JSON.stringify(getState().categoryList)
    )
  }
}

export const removeCategoryFromList = (id) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_CATEGORY,
    payload: id,
  })
  localStorage.setItem('categories', JSON.stringify(getState().category))
}

export const resetCategories = () => (dispatch, getState) => {
  dispatch({ type: RESET_CATEGORIES })
  localStorage.setItem('categories', JSON.stringify(getState().category))
}
