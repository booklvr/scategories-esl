/* global module */
import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import store from './store'
import './assets/bootstrap.min.css'
import './assets/index.scss'
import App from './App'

const root = document.getElementById('root')

function renderApp() {
  // const App = require('./App').default
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    root
  )
}

renderApp()

if (module.hot) {
  module.hot.accept(renderApp)
}
