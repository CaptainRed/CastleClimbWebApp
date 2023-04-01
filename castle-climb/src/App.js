import './App.css';
import { Component, useState } from 'react';
import React from 'react';
import DisplayWeps from './components/Weapons.js';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div className="App">
      <section className="charSection">
        <h1>CHARACTERS</h1>
      </section>
      <section className="weapSection">
        <h1>WEAPONS</h1>
        <DisplayWeps />
      </section>
    </div>
  );

}


export default App;
