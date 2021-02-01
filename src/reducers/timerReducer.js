import { RESET_TIMER, SET_SECONDS } from '../constants/timerConstants'

export const timerReducer = (
  state = { timeLeft: 30, start: false },
  action
) => {
  const { type, payload } = action

  switch (type) {
    case SET_SECONDS:
      return { ...state, timeLeft: payload }
    case RESET_TIMER:
      return { ...state, start: true }
    default:
      return state
  }
}
