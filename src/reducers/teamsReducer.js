import uuid from 'react-uuid'
import {
  CHANGE_TEAM_NAMES,
  ADD_TEAMS,
  REMOVE_TEAMS,
  ADD_WORD,
  REMOVE_WORD,
  CHANGE_INDEX,
  START_NEW_GAME,
  RESET_TEAMS,
  RESET_TEAMS_INDEX,
  CHANGE_TEAM_INDEX,
} from '../constants/teamsConstants'

export const teamsReducer = (
  state = [
    {
      name: 'team 1',
      id: uuid(),
      index: 0,
      alphabet: [],
      current: false,
    },
    {
      name: 'team 2',
      id: uuid(),
      index: 0,
      alphabet: [],
      current: false,
    },
  ],
  action
) => {
  const { type, payload } = action

  switch (type) {
    case CHANGE_TEAM_NAMES:
      return [...state].map((team) => ({
        ...team,
        name: team.id === payload.id ? payload.name : team.name,
      }))
    case REMOVE_TEAMS:
      return [...state].slice(0, payload * -1)
    case ADD_TEAMS:
      return [...state, ...payload]

    case START_NEW_GAME:
      return [...state].map((team) => ({
        ...team,
        index: 0,
        current: false,
        alphabet: payload.map((letter) => ({
          letter: letter,
          complete: false,
          word: '',
        })),
      }))
    // case ADD_WORD:
    //   return [...state].map((team, i, arr) => {
    //     if (payload.index == i - 1) {
    //       return { ...team, current: true }
    //     } else if (i === 0 && payload.index === arr.length - 1) {
    //       return { ...team, current: true }
    //     } else if (team.id === payload.teamId) {
    //       return {
    //         ...team,
    //         current: false,
    //         alphabet: [
    //           ...team.alphabet.map((lt) => {
    //             if (lt.letter === payload.letter) {
    //               return {
    //                 ...lt,
    //                 word: payload.word,
    //                 complete: true,
    //               }
    //             } else {
    //               return lt
    //             }
    //           }),
    //         ],
    //       }
    //     } else {
    //       return { ...team, current: false }
    //     }
    //   })
    case ADD_WORD:
      return [...state].map((team, i, arr) => {
        if (team.id === payload.teamId) {
          return {
            ...team,
            current: false,
            alphabet: [
              ...team.alphabet.map((lt) => {
                if (lt.letter === payload.letter) {
                  return {
                    ...lt,
                    word: payload.word,
                    complete: true,
                  }
                } else {
                  return lt
                }
              }),
            ],
          }
        } else {
          return { ...team }
        }
      })
    case CHANGE_INDEX:
      return [...state].map((team) => {
        if (team.id === payload.teamId) {
          return { ...team, index: team.index + 1 * payload.sign }
        }
        return { ...team }
      })
    case CHANGE_TEAM_INDEX:
      return [...state].map((team) => {
        if (team.id === payload.teamId) {
          return { ...team, current: true }
        }
        return { ...team, current: false }
      })
    case RESET_TEAMS_INDEX:
      return [...state].map((team, index) => {
        if (index === 0) {
          return { ...team, current: true }
        }
        return { ...team, current: false }
      })
    case REMOVE_WORD:
      return [...state].map((team) => {
        if (team.id === payload.teamId) {
          return {
            ...team,
            alphabet: [
              ...team.alphabet.map((lt) => {
                if (lt.letter === payload.letter) {
                  return {
                    ...lt,
                    word: '',
                    complete: false,
                  }
                } else {
                  return lt
                }
              }),
            ],
          }
        } else {
          return team
        }
      })
    case RESET_TEAMS:
      return [
        {
          name: 'team 1',
          id: uuid(),
          index: 0,
          alphabet: [],
        },
        {
          name: 'team 2',
          id: uuid(),
          index: 0,
          alphabet: [],
        },
      ]
    default:
      return state
  }
}
