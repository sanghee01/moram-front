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
      <DetailBox>
        <Find>
          <div>
            <input id="check" type="checkbox" />
            <label htmlFor="check">로그인 유지</label>
          </div>
          <span>비밀번호 찾기</span>
        </Find>
        <IsFistTime>
          모람모람에 처음이신가요?{" "}
          <span onClick={() => navigate("/register")}>회원가입</span>
        </IsFistTime>
      </DetailBox>
      <EasyLoginBox>
        <hr />
        <span>간편로그인</span>
        <KakaoLoginBtn
          href={`${process.env.REACT_APP_APIADDRESS}/user/kakao`}
          target="_self"
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

const DetailBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  & span,
  label {
    cursor: pointer;
    color: rgba(0, 0, 0, 0.7);
  }
`;

const Find = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const IsFistTime = styled.div`
  color: rgba(0, 0, 0, 0.7);
  margin-top: 23px;

  & span {
    margin-left: 5px;
    color: #5a59ff;
    font-weight: 500;
  }
`;

const EasyLoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 30px;
  & hr {
    position: relative;
    bottom: -8px;
    display: block;
    margin: 0;
    width: 100%;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.2);
    border: none;
  }
  & span {
    padding: 0 8px;
    margin-bottom: 16px;
    line-height: 16px;
    letter-spacing: -0.3px;
    color: rgba(0, 0, 0, 0.3);
    z-index: 1;
    background-color: #fff;
  }
`;

const KakaoLoginBtn = styled.a`
  height: 50px;
  width: 50px;
  margin-top: 7px;
  background-image: url("/assets/kakaoLogo.svg");
  background-repeat: no-repeat;
  background-color: #fddc3f;
  background-position: center center;
  background-size: 30px;
  border-radius: 10px;
`;

export default Login;
