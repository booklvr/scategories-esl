import { CHANGE_LETTER, LOAD_ALPHABET } from '../constants/alphabetConstants'

export const alphabetReducer = (state = null, action) => {
  const { type, payload } = action

  switch (type) {
    case LOAD_ALPHABET:
      return [...payload]
    case CHANGE_LETTER:
      return [...state].map((letter, index) => {
        if (payload.index === index) {
          return payload.letter
        }
        return letter
      })

    default:
      return state
  }
}
