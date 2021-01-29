import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
  categoryReducer,
  categoryListReducer,
} from './reducers/categoryReducer'
import { alphabetReducer } from './reducers/alphabetReducer'
import { teamsReducer } from './reducers/teamsReducer'

const reducer = combineReducers({
  category: categoryReducer,
  categoryList: categoryListReducer,
  alphabet: alphabetReducer,
  teams: teamsReducer,
})

const categoriesFromLocalStorage = localStorage.getItem('categories')
  ? JSON.parse(localStorage.getItem('categories'))
  : []

const teamsFromLocalStorage = localStorage.getItem('teams')
  ? JSON.parse(localStorage.getItem('teams'))
  : []

const alphabetFromLocalStorage = localStorage.getItem('alphabet')
  ? JSON.parse(localStorage.getItem('alphabet'))
  : []

const initialState = {
  category: categoriesFromLocalStorage,
  teams: teamsFromLocalStorage,
  alphabet: alphabetFromLocalStorage,
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
