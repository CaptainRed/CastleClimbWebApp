import './App.css';
import { Component, useState } from 'react';
import { Col, Row, Button, Image, Container } from 'react-bootstrap';
import React from 'react';
import DisplayWeps from './components/Weapons.js';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <Container fluid>
      <Row className="App" fluid>
        <Col xs={5} sm={6} md={3} className="charSection">
          <h2>CHARACTERS</h2>
        </Col>
        <Col xs={7} sm={6} md={9} className="weapSection">
          <h2>WEAPONS</h2>
          <DisplayWeps />
        </Col>
      </Row>
    </Container>
  );

}


export default App;
