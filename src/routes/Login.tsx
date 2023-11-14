import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../state";
import styled from "styled-components";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  /**input에서 사용하는 onChange 함수 */
  const onChange = (e: any) => {
    const {
      target: { id, value },
    } = e;
    if (id === "email") setEmail(value);
    if (id === "password") setPassword(value);
  };

  /**로그인 버튼 클릭 시 실행되는 함수 */
  const login = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_APIADDRESS}/login`,
        {
          email,
          password,
        }
      );
      const user = response.data.content;
      setUser(user);
      console.log(user);
      alert(response?.data.message);
      navigate(-1);
    } catch (error: any) {
      alert(error?.response?.data?.message || "알 수 없는 에러 발생.");
    }
  };

  return (
    <Container>
      <Logo src="/assets/logo.png" onClick={() => navigate("/")} />
      <Input
        id="email"
        type="email"
        placeholder="이메일"
        onChange={onChange}
        value={email}
        onKeyUp={(e) => {
          if (e.key === "Enter") login();
        }}
      />
      <Input
        id="password"
        type="password"
        placeholder="비밀번호"
        onChange={onChange}
        value={password}
        onKeyUp={(e) => {
          if (e.key === "Enter") login();
        }}
      />
      <LoginBtn onClick={() => login()}>로그인</LoginBtn>
      <SpanBox>
        <span>비밀번호 찾기</span>
        <span onClick={() => navigate("/register")}>회원가입</span>
      </SpanBox>
      <EasyLoginBox>
        <span>간편로그인</span>
        <KakaoLoginBtn
          src="/assets/kakaoLogo.svg"
          onClick={() =>
            navigate(`${process.env.REACT_APP_APIADDRESS}/user/kakao`)
          }
        />
      </EasyLoginBox>
    </Container>
  );
}

const Logo = styled.img`
  height: 70px;
  margin-bottom: 20px;
`;

const Container = styled.div`
  width: 400px;
  min-height: calc(100dvh - (var(--headerHeight) + var(--footerHeight)));
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
`;

const Input = styled.input`
  width: 100%;
  padding: 7px;
  margin: 5px 0;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid gray;
`;

const LoginBtn = styled.div`
  width: 100%;

  padding: 9px;
  margin: 5px 0;
  font-size: 1rem;
  border-radius: 8px;
  text-align: center;
  background-color: #5a59ff;
  color: white;
  &:hover {
    cursor: pointer;
    filter: contrast(200%);
  }
`;

const SpanBox = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  & span {
    cursor: pointer;
    color: rgba(0, 0, 0, 0.7);
  }
`;

const EasyLoginBox = styled.div`
  width: 100%;
  margin-top: 30px;
  border-top: 1px solid lightgray;
  & span {
    color: rgba(0, 0, 0, 0.7);
  }
`;

const KakaoLoginBtn = styled.img`
  height: 50px;
  padding: 10px;
  margin-top: 10px;
  background-color: #fddc3f;
  border-radius: 10px;
`;
export default Login;
