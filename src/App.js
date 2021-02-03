import React from 'react'
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import { HashRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import CreateGameScreen from './screens/CreateGameScreen'
import PlayGameScreen from './screens/PlayGameScreen'

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <main className='p-3'>
        <Container fluid className='main'>
          <Route path='/' component={CreateGameScreen} exact />
          <Route path='/play' component={PlayGameScreen} exact />
        </Container>
      </main>

      <Footer />
    </Router>
  )
}

export default App
