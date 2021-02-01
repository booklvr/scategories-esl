import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
  categoryReducer,
  categoryListReducer,
} from './reducers/categoryReducer'
import { alphabetReducer } from './reducers/alphabetReducer'
import { teamsReducer } from './reducers/teamsReducer'
import { timerReducer } from './reducers/timerReducer'

const reducer = combineReducers({
  category: categoryReducer,
  categoryList: categoryListReducer,
  alphabet: alphabetReducer,
  teams: teamsReducer,
  timer: timerReducer,
})

const categoriesFromLocalStorage = localStorage.getItem('categories')
  ? JSON.parse(localStorage.getItem('categories'))
  : []

const teamsFromLocalStorage = localStorage.getItem('teams')
  ? JSON.parse(localStorage.getItem('teams'))
  : undefined
// const teamsFromLocalStorage = undefined

const alphabetFromLocalStorage = localStorage.getItem('alphabet')
  ? JSON.parse(localStorage.getItem('alphabet'))
  : []

const timerFromLocalStorage = localStorage.getItem('timer')
  ? JSON.parse(localStorage.getItem('timer'))
  : undefined

const initialState = {
  category: categoriesFromLocalStorage,
  teams: teamsFromLocalStorage,
  alphabet: alphabetFromLocalStorage,
  timer: timerFromLocalStorage,
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
