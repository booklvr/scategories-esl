import {
  RESET_TIMER,
  RESET_TIMER_INPUT,
  SET_SECONDS,
  TIMER_DONE_ANIMATION_END,
  TIMER_DONE_ANIMATION_START,
  TOGGLE_SHOW_TIMER,
  TOGGLE_START_TIMER,
} from '../constants/timerConstants'
export const loadSeconds = (seconds) => (dispatch, getState) => {
  dispatch({ type: SET_SECONDS, payload: seconds })
  localStorage.setItem('timer', JSON.stringify(getState().timer))
}

export const reloadSeconds = () => (dispatch) => {
  dispatch({ type: RESET_TIMER })
}

export const toggleShowTimer = (showTimer) => (dispatch, getState) => {
  dispatch({ type: TOGGLE_SHOW_TIMER, payload: showTimer })
  localStorage.setItem('timer', JSON.stringify(getState().timer))
}

export const startTimer = () => (dispatch) => {
  dispatch({ type: TOGGLE_START_TIMER })
}

export const resetTime = () => (dispatch, getState) => {
  dispatch({ type: RESET_TIMER_INPUT })
  localStorage.setItem('timer', JSON.stringify(getState().timer))
}

export const timerDoneAnimationStart = () => (dispatch) => {
  dispatch({ type: TIMER_DONE_ANIMATION_START })
}

export const timerDoneAnimationEnd = () => (dispatch) => {
  dispatch({ type: TIMER_DONE_ANIMATION_END })
}
