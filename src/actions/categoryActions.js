import {
  ADD_CATEGORY_FROM_CHECKBOX,
  ADD_CATEGORY_FROM_TEXT,
} from '../constants/categoryConstants'

export const addCategoryByText = (category) => (dispatch) => {
  dispatch({ type: ADD_CATEGORY_FROM_CHECKBOX, payload: category })
}
