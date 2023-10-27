import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo, Container, Form, Input, Buttons } from "../styles/LoginStyles";
import styled from "styled-components";

function Register() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [count, setCount] = useState(301);
  const [verified, setVerified] = useState(false);
  let timer;

  const navigate = useNavigate();
  const onChange = (e: any) => {
    const {
      target: { id, value },
    } = e;
    if (id === "email") setEmail(value);
    if (id === "password") setPassword(value);
    if (id === "passwordVerify") setPasswordVerify(value);
    if (id === "verifyCode") setVerifyCode(value);
  };

  const register = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/user/register",
        {
          nickname,
          email,
          password,
        },
        { withCredentials: true }
      );
      alert(response?.data);
    } catch (error: any) {
      alert(error.response?.data || "알 수 없는 에러 발생");
    }
  };

  const kakao = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user/kakao");
      alert(response?.data);
    } catch (error: any) {
      alert(error.response?.data || "알 수 없는 에러 발생");
    }
  };

  const sendVerify = async () => {
    setCount(301);

    try {
      const response = await axios.post(
        "http://localhost:8000/user/mailsend",
        {
          email: email,
        },
        { withCredentials: true }
      );
      if (response.data) {
        alert(response.data);
        timer = setInterval(() => setCount((prev) => prev - 1), 1000);
      }
    } catch (error: any) {
      alert(error.response?.data || "알 수 없는 에러 발생");
    }
  };

  const checkVerify = async () => {
    timer = setInterval(() => setCount((prev) => prev - 1), 1000);
    try {
      const response = await axios.post(
        "http://localhost:8000/user/mailverify",
        { email, authcode: verifyCode },
        { withCredentials: true }
      );
      if (response.data) {
        alert(response.data);
        setVerified(true);
      }
    } catch (error: any) {
      alert(error.response?.data || "알 수 없는 에러 발생");
    }
  };

  const displayTime = () => {
    const minutes = Math.floor(count / 60);
    const seconds = count % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };
  return (
    <Container>
      <Form>
        <Logo>모람모람 회원가입하기</Logo>
        <Input
          id="email"
          type="email"
          placeholder="이메일"
          onChange={onChange}
          value={email}
        />
        <VerifyContainer>
          <input
            id="verifyCode"
            placeholder="xxxxxx"
            onChange={onChange}
            value={verifyCode}
          />
          {verifyCode.length === 0 ? (
            <button onClick={() => sendVerify()}>인증번호 전송</button>
          ) : (
            <button onClick={() => checkVerify()}>인증번호 확인</button>
          )}
        </VerifyContainer>
        {count <= 300 && <CountNum>인증 유효 시간: {displayTime()}</CountNum>}
        <Input
          id="password"
          type="password"
          placeholder="비밀번호"
          onChange={onChange}
          value={password}
        />
        <Input
          id="passwordVerify"
          type="password"
          placeholder="비밀번호"
          onChange={onChange}
          value={passwordVerify}
        />
        <Buttons>
          {verified ? (
            <button
              style={{ backgroundColor: "rgb(93, 165, 0)" }}
              onClick={register}
            >
              회원가입
            </button>
          ) : (
            <button
              style={{ backgroundColor: "gray" }}
              onClick={() => alert("메일을 인증해주세요.")}
            >
              회원가입
            </button>
          )}

          <button onClick={kakao}>카카오로 로그인/회원가입</button>
          <button onClick={() => navigate("/login")}>
            이메일로 로그인하기
          </button>
        </Buttons>
      </Form>
    </Container>
  );
}

const VerifyContainer = styled.div`
  width: 100%;
  height: 48px;
  padding: 0;
  margin: 5px 0;
  gap: 7px;

  display: flex;
  & * {
    border-radius: 15px;
    border: 2px solid gray;
  }
  & input {
    width: 100px;
    padding: 0 10px;
    flex-grow: 3;
  }
  & button {
    flex-grow: 1;
    white-space: nowrap;
  }
`;

const CountNum = styled.div`
  width: 100%;
  height: 30px;
  color: red;
`;
export default Register;
