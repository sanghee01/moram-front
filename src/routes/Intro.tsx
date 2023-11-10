import { useState } from "react";
import styled from "styled-components";

function Intro() {
  return(
  <Container><IntroTitle>모람모람을 소개합니다</IntroTitle></Container>)
  
}
 const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  `;
  
  const IntroTitle = styled.div`
  display: flex;
  width: 100%;
  `;

export default Intro;
