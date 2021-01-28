import { LOAD_TEAMS, CHANGE_TEAM_NAMES } from '../constants/teamsConstants'

export const loadTeams = (nTeams) => (dispatch) => {
  let newTeams = []
  for (let i = 0; i < nTeams; i++) {
    newTeams.push(`team ${i + 1}`)
  }

  dispatch({ type: LOAD_TEAMS, payload: newTeams })
}

export const changeTeamName = (index, name) => (dispatch) => {
  dispatch({ type: CHANGE_TEAM_NAMES, payload: { index, name } })
}
