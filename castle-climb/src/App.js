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
        <Col xs={5} sm={4} md={2} className="charSection">
          <h1>CHARACTERS</h1>
        </Col>
        <Col xs={7} sm={8} md={10} className="weapSection">
          <h1>WEAPONS</h1>
          <DisplayWeps />
        </Col>
      </Row>
    </Container>
  );

}


export default App;
