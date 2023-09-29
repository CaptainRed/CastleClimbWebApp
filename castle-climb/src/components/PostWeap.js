import React, { Component, useState, useEffect } from 'react';
import { Col, Row, Button, Image, Container } from 'react-bootstrap';
import {useCollapse} from 'react-collapsed';
import PropTypes from 'prop-types';
import "../App.css";

function PostWeaps()
{
  const { getCollapseProps, getToggleProps } = useCollapse();
  const [isExpanded, setExpanded] = useState(false);

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
      await postEntry(name, desc);
    } catch (error) {
      console.error("Please", error.message);
    }
  }

  function handleCollapse() {
    setExpanded(!isExpanded);
  }


  async function postEntry(entryName, entryDesc) {
    
  const postData = {
    Name: entryName,
    Description: entryDesc
  };

  //console.log(JSON.stringify(postData));

  try {
    console.log("fetching...");
    const response = await fetch(`https://mub7u2c3e6hvt6n2z7eyneremy0kcbxm.lambda-url.us-west-2.on.aws/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
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


  return (
    <div className="collapsible">
      <div className="header" {...getToggleProps({onClick: handleCollapse})}>
        {isExpanded ? 'CLOSE' : 'ADD WEAPON'}
        </div>
        <div {...getCollapseProps()}>
          <form className="content">
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
        </div>
    </div>
  )
}

export default PostWeaps;
