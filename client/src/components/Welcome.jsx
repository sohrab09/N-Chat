import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";


export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).employeeName
    );
  }, []);
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1 style={{color: 'black'}}> Welcome, <span style={{color: '#087F91'}}>{userName}</span></h1>
      <h3 style={{color: 'black', marginTop: '15px'}}>Please select a chat to start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
color: white;
flex-direction: column;
img {
  height: 20rem;
}
span {
  color: black;
}
`;
