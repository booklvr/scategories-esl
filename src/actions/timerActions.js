import { RESET_TIMER, SET_SECONDS } from '../constants/timerConstants'
export const loadSeconds = (seconds) => (dispatch) => {
  dispatch({ type: SET_SECONDS, payload: seconds })
}

export const reloadSeconds = () => (dispatch, getState) => {
  const { timeLeft } = getState().timer
  console.log('getStateSeconds', timeLeft)
  dispatch({ type: RESET_TIMER })
}
