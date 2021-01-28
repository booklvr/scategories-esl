import { CHANGE_TEAM_NAMES, LOAD_TEAMS } from '../constants/teamsConstants'

export const teamsReducer = (state = null, action) => {
  const { type, payload } = action

  console.log('payload', payload)

  console.log(state)

  switch (type) {
    case LOAD_TEAMS:
      return [...payload]
    case CHANGE_TEAM_NAMES:
      console.log('payload.index', payload.index)
      console.log('payload.name', payload.name)

      return [
        ...[...state].map((team, index) => {
          console.log(index, payload.index)
          console.log(team, payload.name)
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
