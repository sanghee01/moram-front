import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { userState } from "../state";
import axios from "axios";

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState<any>(userState); //유저 정보

  const logout = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_APIADDRESS}/user/logout`
      );
      alert("로그아웃 되었습니다.");
      setUser(null);
    } catch (error: any) {
      alert(error.response?.data || "알 수 없는 에러 발생");
    }
  };
  return (
    <Container>
      <Nav>
        <LogoImg onClick={() => navigate("/")} src="assets/logo.png" />
        <RightContainer>
          <SearchInput placeholder="통합 검색" />
          <BtnContainer>
            {user ? (
              <>
                {/* 로그인 상태일 시 컴포넌트 */}
                <button onClick={() => navigate("/profile")}>
                  {user.nickname}
                </button>
                <button onClick={() => logout()}>로그아웃</button>
              </>
            ) : (
              <>
                {/* 비로그인 상태일 시 컴포넌트 */}
                <button onClick={() => navigate("/login")}>로그인</button>
                <button onClick={() => navigate("/register")}>회원가입</button>
              </>
            )}
          </BtnContainer>
        </RightContainer>
      </Nav>
      <Tabs>
        <Tab>
          <Link to="/community?reload=true">커뮤니티</Link>
        </Tab>
        <Tab>
          <Link to="/notice">공지사항</Link>
        </Tab>
        <Tab>
          <Link to="/qna">문의하기</Link>
        </Tab>
        <Tab>
          <Link to="/intro">모람모람</Link>
        </Tab>
      </Tabs>
    </Container>
  );
}

const Container = styled.div`
  position: sticky;
  top: 0px;
  z-index: 10;
`;

const Nav = styled.div`
  height: 80px;
  padding: 0 15%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: aliceblue;

  @media screen and (max-width: 900px) {
    padding: 0 5%;
  }
  @media screen and (max-width: 450px) {
    padding: 0 2%;
  }
`;

const LogoImg = styled.img`
  height: 100%;

  &:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 1300px) {
    height: 85%;
  }
  @media screen and (max-width: 700px) {
    height: 70%;
  }
`;

const RightContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: right;
  gap: 10px;
`;

const SearchInput = styled.input`
  width: 50%;
  padding: 7px 15px;
  border-radius: 8px;
  border: none;
  background-color: rgba(0, 0, 0, 0.1);
  outline: none;

  @media screen and (max-width: 1300px) {
    width: 70%;
  }
  @media screen and (max-width: 450px) {
    font-size: 0.9rem;
  }
`;
const BtnContainer = styled.div`
  display: flex;
  gap: 10px;
  & button {
    width: 80px;
    background-color: rgb(75, 75, 75);
    color: white;
    border: 0;
    border-radius: 8px;
    font-size: 0.9rem;
  }
  & button:hover {
    filter: contrast(130%);
  }
  & button:active {
    filter: hue-rotate(300deg);
  }

  @media screen and (max-width: 900px) {
    & button {
      width: 70px;
      font-size: 0.9rem;
    }
    & button:nth-child(2) {
      display: none;
    }
  }
`;

const Tabs = styled.div`
  background-color: #0e2b49;
  padding: 0 20%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  @media screen and (max-width: 1000px) {
    padding: 0 10%;
  }
  @media screen and (max-width: 600px) {
    padding: 0 5%;
    font-size: 0.9rem;
  }
`;

const Tab = styled.span`
  & a {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: white;
    font-weight: bolder;
    padding: 15px 0;
  }
  & a:hover {
    background-color: #0e243e;
  }
`;

export default Header;
