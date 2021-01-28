import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { categoryReducer } from './reducers/categoryReducer'
import { alphabetReducer } from './reducers/alphabetReducer'
import { teamsReducer } from './reducers/teamsReducer'

const reducer = combineReducers({
  category: categoryReducer,
  alphabet: alphabetReducer,
  teams: teamsReducer,
})

const middleware = [thunk]

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
