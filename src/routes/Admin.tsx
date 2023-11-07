import { styled } from "styled-components";
import Users from "../components/Admin/Users";
import AllPosts from "../components/Admin/AllPosts";

function Admin() {
  return (
    <Container>
      {/* 추후 탭으로 분리할 예정 */}
      <Users />
      <AllPosts />
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
