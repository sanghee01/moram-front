import { styled } from "styled-components";

function Nav() {
  return (
    <>
      <Container>
        <button>커뮤니티</button>
        <button>공지사항</button>
        <button>문의하기</button>
        <button>소개합니다</button>
      </Container>
    </>
  );
}
const Container = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  padding: 0 15px;
  justify-content: flex-start;
  align-items: center;
  background-color: aliceblue;
  gap: 15px;

  & button {
    width: auto;
    height: 40px;
    font-size: 1.1rem;
    padding: 10px 30px;
    border-radius: 20px;
    border: 0;
    background-color: #acecac;
  }
`;

export default Nav;
