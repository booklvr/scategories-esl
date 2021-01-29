import { CHANGE_TEAM_NAMES, LOAD_TEAMS } from '../constants/teamsConstants'

export const teamsReducer = (state = null, action) => {
  const { type, payload } = action

  switch (type) {
    case LOAD_TEAMS:
      return [...payload]
    case CHANGE_TEAM_NAMES:
      return [
        ...[...state].map((team, index) => {
          if (index === payload.index) {
            return payload.name
          }
          return team
        }),
      ]

    default:
      return state
  }
}
