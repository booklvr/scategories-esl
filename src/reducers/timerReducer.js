import { SET_SECONDS } from '../constants/timerConstants'

export const timerReducer = (state = 30, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_SECONDS:
      return payload

    default:
      return state
  }
}
