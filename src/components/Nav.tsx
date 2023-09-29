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
  height: auto;
  display: flex;
  padding: 15px 15px;
  justify-content: flex-start;
  align-items: center;
  background-color: aliceblue;
  gap: 15px;

  & button {
    max-width: 140px;
    height: 40px;
    padding: 0 10px;
    font-size: 1.1rem;
    font-weight: bolder;
    flex-grow: 1;
    border-radius: 20px;
    border: 0;
    background-color: #acecac;
  }

  @media screen and (max-width: 500px) {
    flex-wrap: wrap;
    & button {
      width: calc(
        50% - 30px
      ); /* 화면이 작을 때 버튼을 2개씩 나누기 위한 스타일 */
      max-width: 50%;
    }
  }
`;

export default Nav;
