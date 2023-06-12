import './App.css';
import { Component, useState } from 'react';
import { Col, Row, Button, Image, Container } from 'react-bootstrap';
import React from 'react';
import DisplayWeps from './components/Weapons.js';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <Container className="App" fluid="true">
      <Row className='gx-0'>
      <nav>
        <ul>
          <li className="leftItems"><a>Home</a></li>
          <li className="rightItems"><a>Login</a></li>

        </ul>
      </nav>
      </Row>
      <Row className='gx-0'>
        <Col xs={12} sm={6} md={3} className="charSection">
          <h2>CHARACTERS</h2>
        </Col>
        <Col xs={12} sm={6} md={9} className="weapSection">
          <h2>WEAPONS</h2>
          <DisplayWeps />
        </Col>
      </Row>
    </Container>
  );

}


export default App;
