import React, { Fragment } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'

const Header = () => {
  return (
    <header>
      <Navbar bg='info' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Scategories ESL</Navbar.Brand>
          </LinkContainer>
          {/* <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <Fragment>
                <LinkContainer to='/createGame'>
                  <Nav.Link eventKey='1' href='/createGame'>
                    Play
                  </Nav.Link>
                </LinkContainer>

                <NavDropdown title={'other sites'} id='username'>
                  <NavDropdown.Item>
                    <p>Classpoint</p>
                  </NavDropdown.Item>

                  <NavDropdown.Item>
                    <p>ConnectFour</p>
                  </NavDropdown.Item>
                </NavDropdown>
              </Fragment>
            </Nav>
          </Navbar.Collapse> */}
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
