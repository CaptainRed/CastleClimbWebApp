import React, { Component, useState, useEffect } from 'react';
import { Col, Row, Button, Image, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import PostWeap from "./PostWeap.js";
import "../App.css";
import Sword from "../images/PlaceSword.jpg";
import BroadSword from "../images/BroadSword.png";
import FireSword from "../images/FireKnightSword_Paint.png";
import MercSword from "../images/MercenarySword1_Paint.png";
import HeavySword from "../images/HeavySword_Paint.png";
// Weap...
function DisplayWeps() {

  const [active, setActive] = useState(false);

  function handleClick() {
    setActive(!active);
  }

  function propogate(e) {
    e.stopPropagation();
  }

  const [weapons, setWeapons] = useState([]);

  // DELETE singular weapon
  async function deleteEntry(entryID)
  {
    console.log(JSON.stringify({ Id: entryID }));
    try
    {
        const response = await fetch(`https://a6ssuwtzchtxo6mjjvlkhyz7ay0ihfrv.lambda-url.us-west-2.on.aws/?Id=${entryID}`, {
          method: 'DELETE',
          headers: { 'Content-Type' : 'application/json', },
          body: JSON.stringify({ Id: entryID }),
        });
    } catch (error) {
      console.error("Error Deleting Entry! ", error.message);
    }
  }

  const handleDelete = async (entryID) => {
    try {
      await deleteEntry(entryID);
    } catch (error) {
      console.error("idk ID not found?", error.message);
    }
  };

  // GET all weapons
  useEffect(() => {
    fetch('https://s7rm46k54v67cmg4qw64akbkom0pdzie.lambda-url.us-west-2.on.aws/')
      .then(response => response.json())
      .then(data => {
        const weapons: Weapon[] = data.map((weapon: any) => {
          return {
            id: weapon.Id,
            name: weapon.Name,
            desc: weapon.Desc
          }
        });
        setWeapons(data)
      })
      .catch(error => console.error(error));
  }, []);

  //onsole.log(weapons[0].name);

  const imageStyle = {
    //resizeMode: 'cover',
    //width: '90%',
    //height: '90%'
  }

  return (
    <Container className="weapSection">
      {weapons.map(weapon => (
        <div key={weapon.Id}>
          <h2>{weapon.Name}</h2>
          <p>{weapon.Desc}</p>
          <Button onClick={() => handleDelete(weapon.Id)}> DELETE </Button>
        </div>
      ))}
      <PostWeap />
    </Container>
  )
}

export default DisplayWeps;
