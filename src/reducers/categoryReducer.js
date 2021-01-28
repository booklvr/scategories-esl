import {
  ADD_CATEGORY_FROM_CHECKBOX,
  ADD_CATEGORY_FROM_TEXT,
} from '../constants/categoryConstants'

export const categoryReducer = (state = [], action) => {
  const { type, payload } = action

  switch (type) {
    case ADD_CATEGORY_FROM_CHECKBOX:
    case ADD_CATEGORY_FROM_TEXT:
      return [...state, payload]

    default:
      return state
  }
}
