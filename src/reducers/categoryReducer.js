import uuid from 'react-uuid'
import {
  ADD_CATEGORY,
  ADD_CATEGORY_BY_CHECKBOX,
  REMOVE_CATEGORY,
  RESET_CATEGORIES,
} from '../constants/categoryConstants'
import categories from '../data/categories'

export const categoryReducer = (state = [], action) => {
  const { type, payload } = action

  switch (type) {
    case ADD_CATEGORY:
    case ADD_CATEGORY_BY_CHECKBOX:
      return [payload, ...state]
    // case REMOVE_CATEGORY_BY_CHECKBOX:
    case REMOVE_CATEGORY:
      return state.filter((category) => category.id !== payload)
    case RESET_CATEGORIES:
      return []
    default:
      return state
  }
}

export const categoryListReducer = (
  state = categories.map((category) => ({
    category: category,
    checked: false,
    id: uuid(),
  })),
  action
) => {
  const { type, payload } = action
  switch (type) {
    case ADD_CATEGORY_BY_CHECKBOX:
      return [...state].map((category) => {
        if (category.id === payload.id) {
          return {
            ...category,
            checked: true,
          }
        } else {
          return category
        }
      })
    case REMOVE_CATEGORY:
      return [...state].map((category) => {
        if (category.id === payload) {
          return {
            ...category,
            checked: false,
          }
        } else {
          return category
        }
      })
    case RESET_CATEGORIES:
      return [...state].map((category) => ({ ...category, checked: false }))
    default:
      return state
  }
}
