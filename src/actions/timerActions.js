import {
  RESET_TIMER,
  SET_SECONDS,
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
