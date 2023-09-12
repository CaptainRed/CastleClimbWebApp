import React, { Component, useState, useEffect } from 'react';
import { Col, Row, Button, Image, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import "../App.css";

function PostWeaps()
{


  // create weap section
  // Name, desc, submit
  // drop down menu later when there are more things
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  const handleName = (event) => {
    setName(event.target.value);
  }

  const handleDesc = (event) => {
    setDesc(event.target.value);
  }

  const handleClick = async () => {
    try {
      await handlePost(name, desc);
    } catch (error) {
      console.error("Please", error.message);
    }

  }

  async function postEntry(entryName, desc) {
    const postData = {
      Name: entryName,
      Description: desc,
    };
    console.log(JSON.stringify(postData));
    try {
      const response = await fetch(`https://owezknebkxhyd2vsxkncvq7rbq0ijtwi.lambda-url.us-west-2.on.aws/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData), // Do not wrap postData in an object
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
    } catch (error) {
      console.error('Error Posting Entry!', error.message);
    }
}

  const handlePost = async (Name, Desc) => {
    try {
      await postEntry(Name, Desc);
    } catch (error) {
      console.error("idk ID not found?", error.message);
    }
  };


  return (

    <form>
      Weapon Name:<input
        type="text"
        id="name"
        name="name"
        onChange={handleName}
        value={name}></input>
      Weapon Description:<input type="text"
        id="desc"
        name="desc"
        onChange={handleDesc}
        value={desc}></input>
      <Button onClick={handleClick}>SUBMIT</Button>
    </form>
  )
}

export default PostWeaps;
