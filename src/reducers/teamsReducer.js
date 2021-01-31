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
  // LOAD_TEAMS_FOR_GAME,
} from '../constants/teamsConstants'

import { LOAD_ALPHABET } from '../constants/alphabetConstants'

export const teamsReducer = (
  state = [
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
    // case LOAD_ALPHABET:
    //   return [...state].map((team) => ({
    //     ...team,
    //     alphabet: payload.map((letter) => ({
    //       letter: letter,
    //       complete: false,
    //       word: '',
    //     })),
    //   }))
    case START_NEW_GAME:
      return [...state].map((team) => ({
        ...team,
        index: 0,
        alphabet: payload.map((letter) => ({
          letter: letter,
          complete: false,
          word: '',
        })),
      }))
    case ADD_WORD:
      return [...state].map((team) => {
        if (team.id === payload.teamId) {
          return {
            ...team,
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
          return team
        }
      })
    case CHANGE_INDEX:
      return [...state].map((team) => {
        if (team.id === payload.teamId) {
          return { ...team, index: team.index + 1 * payload.sign }
        }
        return { ...team }
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
