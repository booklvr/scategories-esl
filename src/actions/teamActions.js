import { LOAD_TEAMS, CHANGE_TEAM_NAMES } from '../constants/teamsConstants'

export const loadTeams = (nTeams) => (dispatch, getState) => {
  let newTeams = []
  for (let i = 0; i < nTeams; i++) {
    newTeams.push(`team ${i + 1}`)
  }

  dispatch({ type: LOAD_TEAMS, payload: newTeams })
  localStorage.setItem('teams', JSON.stringify(getState().teams))
}

export const changeTeamName = (index, name) => (dispatch, getState) => {
  dispatch({ type: CHANGE_TEAM_NAMES, payload: { index, name } })
  localStorage.setItem('teams', JSON.stringify(getState().teams))
}
