import { styled } from "styled-components";
import Users from "../components/Admin/Users";

function Admin() {
  return (
    <Container>
      <Users />
    </Container>
  );
}

export default Admin;

const Container = styled.div`
  width: 70%;
  margin: auto;
  margin-top: 50px;
  height: 100vh;
  @media screen and (max-width: 800px) {
    width: 90%;
    font-size: 0.8rem;
  }
`;
