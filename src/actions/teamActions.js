import uuid from 'react-uuid'
import {
  ADD_TEAMS,
  ADD_WORD,
  CHANGE_TEAM_NAMES,
  CHANGE_INDEX,
  LOAD_TEAMS,
  REMOVE_TEAMS,
  REMOVE_WORD,
  START_NEW_GAME,
  RESET_TEAMS,
  RESET_TEAMS_INDEX,
  CHANGE_TEAM_INDEX,
} from '../constants/teamsConstants'

export const loadTeams = () => (dispatch) => {
  dispatch({ type: LOAD_TEAMS })
}

export const changeTeamName = (name, id) => (dispatch, getState) => {
  dispatch({ type: CHANGE_TEAM_NAMES, payload: { name, id } })
  localStorage.setItem('teams', JSON.stringify(getState().teams))
}

export const changeNumberOfTeams = (teamsLength, numberOfTeams) => (
  dispatch,
  getState
) => {
  if (numberOfTeams < teamsLength) {
    dispatch({ type: REMOVE_TEAMS, payload: teamsLength - numberOfTeams })
  } else if (numberOfTeams > teamsLength) {
    const newTeams = []
    for (let i = 0; i < numberOfTeams - teamsLength; i++) {
      newTeams.push({
        name: `team ${parseInt(i + numberOfTeams)}`,
        id: uuid(),
        index: 0,
        alphabet: {
          letters: [],
          complete: false,
          word: '',
        },
      })
    }

    dispatch({ type: ADD_TEAMS, payload: newTeams })
    localStorage.setItem('teams', JSON.stringify(getState().teams))
  }
}

export const startNewGame = () => (dispatch, getState) => {
  dispatch({ type: START_NEW_GAME, payload: getState().alphabet })
}

export const changeWord = (teamId, word, letter, index) => (dispatch) => {
  console.log('action index', index)
  dispatch({ type: ADD_WORD, payload: { teamId, word, letter, index } })
  dispatch({ type: CHANGE_INDEX, payload: { teamId, sign: 1 } })
  // dispatch({
  //   type: CHANGE_TEAM_INDEX,
  //   payload: { index, length: getState().teams.length },
  // })
}

export const removeWord = (teamId, letter) => (dispatch) => {
  dispatch({ type: REMOVE_WORD, payload: { teamId, letter } })
  dispatch({ type: CHANGE_INDEX, payload: { teamId, sign: -1 } })
}

export const resetTeams = () => (dispatch, getState) => {
  dispatch({ type: RESET_TEAMS })
  localStorage.setItem('teams', JSON.stringify(getState().teams))
}

// export const loadTeamsForGame = () => (dispatch, getState) => {
//   dispatch({
//     type: CHANGE_TEAM_NAMES,
//     payload: { teams: getState().teams, letters: getState().alphabet },
//   })
// }

export const resetTeamsIndex = () => (dispatch) => {
  console.log('lets fuck up this bitch')
  dispatch({ type: RESET_TEAMS_INDEX })
}

export const changeTeamIndex = (teamId) => (dispatch) => {
  console.log('action teamId', teamId)
  dispatch({ type: CHANGE_TEAM_INDEX, payload: { teamId } })
}
export const nextTeamIndex = (teamId) => (dispatch, getState) => {
  const teams = getState().teams
  const index = teams.findIndex((team) => team.id === teamId)
  console.log('index', index)
  const nextIndex = index < teams.length - 1 ? index + 1 : 0

  dispatch({
    type: CHANGE_TEAM_INDEX,
    payload: { teamId: teams[nextIndex].id },
  })
}
