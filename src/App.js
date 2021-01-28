import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import CreateGameScreen from './screens/CreateGameScreen'
import PlayGameScreen from './screens/PlayGameScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={CreateGameScreen} exact />
          <Route path='/play' component={PlayGameScreen} exact />
        </Container>
      </main>

      <Footer />
    </Router>
  )
}

export default App
