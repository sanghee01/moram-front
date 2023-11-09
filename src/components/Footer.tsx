import styled from "styled-components";

function Footer() {
  return (
    <Container>
      <div>팀명: 공공플플</div>
      <div>FE: 박재연, 이고운, 이상희 | BE: 박재연, 전준영, 이효진, 이연주</div>
      <div>Copyright © 모람모람. All Rights Reserved.</div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  padding: 30px 0;
  background-color: #f7f7f7;
  color: gray;
  font-size: 0.8rem;
  text-align: center;
  border-top: 1px solid lightgray;
`;

export default Footer;
