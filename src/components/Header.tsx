import styled from "styled-components";

function Header() {
  return (
    <Container>
      <LogoImg
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvY8KSeVLVzsKJOsGiwdJl9diyZH49lTNzIHAy3pcDigpYGJ__hISu_bxuyO7zZ-D6WxI&usqp=CAU"
        alt="메인"
      />
      <SearchInput placeholder="통합 검색 (학과 게시판, 게시판 제목+댓글)" />
      <BtnContainer>
        <button>로그인</button>
        <button>회원가입</button>
      </BtnContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 60px;
  padding: 0 2%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: aliceblue;
  position: sticky;
  top: 0px;
`;
const LogoImg = styled.img`
  height: 100%;
`;
const SearchInput = styled.input`
  flex-grow: 1;
  font-size: 0.9em;
  padding: 0 15px;
  margin: 0 3%;
  width: 150px;
  height: 65%;
  border-radius: 20px;
  border: 1px solid black;
`;
const BtnContainer = styled.div`
  width: 200px;
  height: 75%;
  display: flex;
  justify-content: space-evenly;
  gap: 10px;

  & button {
    font-size: 1.1rem;
    flex-grow: 1;
    background-color: rgb(75, 75, 75);
    color: white;
    border: 0;
    border-radius: 10px;
  }
`;

export default Header;
