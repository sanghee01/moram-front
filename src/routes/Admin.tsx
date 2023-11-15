import { styled } from "styled-components";
import { Link, Outlet } from "react-router-dom";

function Admin() {
  return (
    <>
      <Container>
        <Tabs>
          <Tab>
            <Link to="">유저 관리</Link>
          </Tab>
          <Tab>
            <Link to="allPosts">게시물 관리</Link>
          </Tab>
          <Tab>
            <Link to="allComments">댓글 관리</Link>
          </Tab>
          <Tab>
            <Link to="reports">신고 관리</Link>
          </Tab>
        </Tabs>
        <Outlet />
      </Container>
    </>
  );
}

export default Admin;

const Container = styled.div`
  display: flex;
  height: 200vh;
`;

const Tabs = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f3f3f3;
  width: 20%;
`;

const Tab = styled.span`
  & a {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    font-weight: bolder;
    padding: 15px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
  & a:hover {
    background-color: #ececec;
  }
`;
