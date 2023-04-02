import { Component, useState } from 'react';
import { Col, Row, Button, Image, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import "../App.css";
import Sword from "../images/PlaceSword.jpg";
import BroadSword from "../images/BroadSword.png";
import FireSword from "../images/FireKnightSword_Paint.png";
import MercSword from "../images/MercenarySword1_Paint.png";
import HeavySword from "../images/HeavySword_Paint.png";

function DisplayWeps ()
{
  const [weaps, changeWeap] = useState([
    {
      id: 1,
      name: "Broad Sword",
      value: 100,
      description: "The most basic weapon that everyone starts with at the beginning of the game.",
      img: BroadSword
    },
    {
      id: 2,
      name: "Fire Knight Sword",
      value: 1000,
      description: "A weapon that inflicts fire damage on your opponents.",
      img: FireSword
    },
    {
      id: 3,
      name: "Mercenary Sword",
      value: 10000000,
      description: "A major upgrade to the basic weapon in the game that inflicts heavy damage on your opponents.",
      img: MercSword
    },
    {
      id: 4,
      name: "Heavy Sword",
      value: 100000,
      description: "A very rare sword that will one shot most enemies in the early game.",
      img: HeavySword
    }
  ]);

  return weaps.map((weapon) => (
    <Weap weap={weapon}/>
  ));
}

function Weap(props) {

  const [active, setActive] = useState(false);

  function handleClick() {
    setActive(!active);
  }

  /*const weapDisplay = {
    backgroundImage: props.weap.img,
    backgroundSize: 'cover'
  }*/

  function propogate(e) {
    e.stopPropagation();
  }

  const imageStyle = {
    //resizeMode: 'cover',
    //width: '90%',
    //height: '90%'
  }

  return (
    <Container onClick={handleClick} className="weapSection">
      {active ? (
        <Row className="weap">
          <Col xs={3} sm={3} md={3}>
            <ul className="weapInfo">
              <li>{props.weap.name}</li>
              <li>Value: {props.weap.value}</li>
            </ul>
          </Col>
          <Col xs={9} sm={9} md={9}>
            <p>{props.weap.description}</p>
          </Col>
        </Row>
      ) : (
          <Row className="weap">
            <Col xs={3} sm={3} md={3}>
              <Image src={props.weap.img} fluid />
            </Col>
            <Col xs={3} sm={3} md={3}>
              <p>{props.weap.name}</p>
              <p>Value: {props.weap.value}</p>
            </Col>
            <Col xs={3} sm={3} md={3}>
              <Button onClick={(e) => propogate(e)} fluid>Mint This Sword!</Button>
            </Col>
          </Row>
      )}
    </Container>
  );
}

export default DisplayWeps;
