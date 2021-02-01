import { RESET_TIMER, SET_SECONDS } from '../constants/timerConstants'
export const loadSeconds = (seconds) => (dispatch, getState) => {
  dispatch({ type: SET_SECONDS, payload: seconds })
  localStorage.setItem('timer', JSON.stringify(getState().timer))
}

export const reloadSeconds = () => (dispatch) => {
  dispatch({ type: RESET_TIMER })
}
