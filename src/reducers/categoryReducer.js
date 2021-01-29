import {
  ADD_CATEGORY,
  ADD_CATEGORY_BY_CHECKBOX,
  CHECKBOX_CATEGORY_LIST,
  LOAD_CATEGORY_LIST,
  REMOVE_CATEGORY_BY_CHECKBOX,
  REMOVE_CATEGORY,
} from '../constants/categoryConstants'

export const categoryReducer = (state = [], action) => {
  const { type, payload } = action

  switch (type) {
    case ADD_CATEGORY:
    case ADD_CATEGORY_BY_CHECKBOX:
      return [payload, ...state]
    case REMOVE_CATEGORY_BY_CHECKBOX:
    case REMOVE_CATEGORY:
      return state.filter((category) => category.id !== payload)
    default:
      return state
  }
}

export const categoryListReducer = (state = null, action) => {
  const { type, payload } = action
  switch (type) {
    case LOAD_CATEGORY_LIST:
      return [...payload]
    case CHECKBOX_CATEGORY_LIST:
    case REMOVE_CATEGORY:
      return state.map((category) => {
        if (category.id === payload) {
          return { ...category, checked: !category.checked }
        }
        return category
      })

    default:
      return state
  }
}
