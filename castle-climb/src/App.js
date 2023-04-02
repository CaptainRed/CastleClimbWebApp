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
        <Col xs={6} sm={5} md={3} className="charSection">
          <h1 className="h1">CHARACTERS</h1>
        </Col>
        <Col xs={6} sm={7} md={9} className="weapSection">
          <h1 className="h1">WEAPONS</h1>
          <DisplayWeps />
        </Col>
      </Row>
    </Container>
  );

}


export default App;
