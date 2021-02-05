import {
  RESET_TIMER,
  SET_SECONDS,
  TOGGLE_SHOW_TIMER,
  TOGGLE_START_TIMER,
} from '../constants/timerConstants'

export const timerReducer = (
  state = { timeLeft: 30, start: false, showTimer: false },
  action
) => {
  const { type, payload } = action

  switch (type) {
    case SET_SECONDS:
      return { ...state, timeLeft: payload }
    case RESET_TIMER:
      return { ...state, start: true }
    case TOGGLE_SHOW_TIMER:
      return { ...state, showTimer: payload === true ? true : false }
    case TOGGLE_START_TIMER:
      return { ...state, start: false }
    default:
      return state
  }
}
