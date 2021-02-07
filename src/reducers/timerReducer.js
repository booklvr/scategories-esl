import {
  RESET_TIMER,
  RESET_TIMER_INPUT,
  SET_SECONDS,
  TIMER_DONE_ANIMATION_END,
  TIMER_DONE_ANIMATION_START,
  TOGGLE_SHOW_TIMER,
  TOGGLE_START_TIMER,
} from '../constants/timerConstants'

export const timerReducer = (
  state = { timeLeft: 30, start: false, showTimer: true, end: false },
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
    case RESET_TIMER_INPUT: {
      return { ...state, timeLeft: 30 }
    }
    case TIMER_DONE_ANIMATION_START:
      return { ...state, end: true, start: false }
    case TIMER_DONE_ANIMATION_END:
      return { ...state, end: false }

    default:
      return state
  }
}
