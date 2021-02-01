import { SET_SECONDS } from '../constants/timerConstants'
export const loadSeconds = (seconds) => (dispatch) => {
  dispatch({ type: SET_SECONDS, payload: seconds })
}

export const reloadSeconds = () => (dispatch, getState) => {
  const seconds = getState().timer
  dispatch({ type: SET_SECONDS, payload: seconds })
}
