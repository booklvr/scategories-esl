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

const categoryListFromLocalStorage = localStorage.getItem('categoryList')
  ? JSON.parse(localStorage.getItem('categoryList'))
  : undefined

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
  categoryList: categoryListFromLocalStorage,
  teams: teamsFromLocalStorage,
  alphabet: alphabetFromLocalStorage,
  timer: timerFromLocalStorage,
}

const middleware = [thunk]

const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 25,
})
const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
)

export default store
