import { LOAD_ALPHABET } from '../constants/alphabetConstants'

export const alphabetReducer = (state = null, action) => {
  const { type, payload } = action

  switch (type) {
    case LOAD_ALPHABET:
      return [...payload]

    default:
      return state
  }
}
