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
} from '../constants/teamsConstants'

// export const loadTeams = (nTeams) => (dispatch, getState) => {
//   let newTeams = []
//   for (let i = 0; i < nTeams; i++) {
//     newTeams.push(`team ${i + 1}`)
//   }
// export const loadTeams = (nTeams) => (dispatch, getState) => {
//   let newTeams = []
//   for (let i = 0; i < nTeams; i++) {
//     newTeams.push(`team ${i + 1}`)
//   }

//   dispatch({ type: LOAD_TEAMS, payload: newTeams })
//   localStorage.setItem('teams', JSON.stringify(getState().teams))
// }

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

export const changeWord = (teamId, word, letter) => (dispatch) => {
  dispatch({ type: ADD_WORD, payload: { teamId, word, letter } })
  dispatch({ type: CHANGE_INDEX, payload: { teamId, sign: 1 } })
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
