import { LOAD_ALPHABET } from '../constants/alphabetConstants'

export const alphabetReducer = (state = null, action) => {
  const { type, payload } = action

  console.log('payload', payload)

  switch (type) {
    case LOAD_ALPHABET:
      return [...payload]

    default:
      return state
  }
}
