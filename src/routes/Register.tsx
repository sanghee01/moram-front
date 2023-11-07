import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Logo,
  Container,
  Form,
  Input,
  Buttons,
  Label,
} from "../styles/LoginStyles";
import styled from "styled-components";

function Register() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState(""); //비밀번호 확인란
  const [verifyCode, setVerifyCode] = useState(""); //인증번호
  const [count, setCount] = useState(301); //인증 유효 시간
  const [verified, setVerified] = useState(false); //메일 인증이 됐는지 확인
  const [isLoading, setIsLoading] = useState(false); //인증번호전송 버튼 로딩 관리
  let timer: any; //인증번호 유효시간 카운트를 위한 타이머

  const navigate = useNavigate();
  const onChange = (e: any) => {
    const {
      target: { id, value },
    } = e;
    if (id === "email" && !verified) setEmail(value);
    if (id === "password") setPassword(value);
    if (id === "passwordVerify") setPasswordVerify(value);
    if (id === "verifyCode") setVerifyCode(value);
    if (id === "nickname") setNickname(value);
  };

  /**회원가입 버튼 누르면 실행하는 함수 */
  const register = async () => {
    if (password !== passwordVerify) {
      alert("비밀번호와 비밀번호 확인란을 동일하게 입력해주세요.");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_APIADDRESS}/register`,
        {
          nickname,
          email,
          password,
        }
      );
      alert(response?.data + "\n로그인을 해주세요.");
      navigate("/login");
    } catch (error: any) {
      alert(error?.response?.data?.message || "알 수 없는 에러 발생.");
    }
  };

  /**인증번호 전송 버튼 누르면 실행하는 함수 */
  const sendVerify = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setCount(301);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_APIADDRESS}/register/mailsend`,
        {
          email: email,
        }
      );
      if (response.data) {
        alert(response.data.message); //메일 발신 성공
        setCount(300);
        timer = setInterval(() => setCount((prev) => prev - 1), 1000);
      }
    } catch (error: any) {
      alert(error?.response?.data?.message || "알 수 없는 에러 발생");
    }
    setIsLoading(false);
  };

  /**인증번호 입력 후 인증번호 확인 버튼 누르면 실행하는 함수  */
  const checkVerify = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_APIADDRESS}/register/mailverify`,
        { email, authcode: verifyCode }
      );
      if (response.data.message) {
        alert(response.data.message); //인증 완료
        setVerified(true);
      }
    } catch (error: any) {
      alert(error?.response?.data?.message || "알 수 없는 에러 발생");
    }
  };

  /**count를 00:00 형식으로 보여주는 함수 */
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
        <Label>닉네임</Label>
        <Input
          id="nickname"
          placeholder="닉네임"
          onChange={onChange}
          value={nickname}
        />
        <Label>이메일</Label>
        <Input
          id="email"
          type="email"
          placeholder="이메일"
          onChange={onChange}
          value={email}
        />
        <Label>인증번호</Label>
        {!verified ? (
          <VerifyContainer>
            {count <= 300 && (
              <input
                id="verifyCode"
                placeholder="xxxxxx"
                onChange={onChange}
                value={verifyCode}
              />
            )}
            {count === 301 ? (
              <button
                onClick={() => sendVerify()}
                style={isLoading ? { background: "gray" } : {}}
              >
                인증번호 전송
              </button>
            ) : (
              <button onClick={() => checkVerify()}>인증번호 확인</button>
            )}
          </VerifyContainer>
        ) : (
          <CountNum style={{ fontSize: "1.15rem", color: "green" }}>
            이메일 인증 완료!
          </CountNum>
        )}

        {count <= 300 && !verified && (
          <CountNum>인증 유효 시간: {displayTime()}</CountNum>
        )}
        <Label>비밀번호</Label>
        <Input
          id="password"
          type="password"
          placeholder="비밀번호"
          onChange={onChange}
          value={password}
        />
        <Label>비밀번호 확인</Label>
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

          <a
            href={`${process.env.REACT_APP_APIADDRESS}/user/kakao`}
            target="_self"
          >
            카카오로 로그인/회원가입
          </a>

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
