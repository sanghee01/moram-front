import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const timerRef = useRef<any>(null);
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

  useEffect(() => {
    // 타이머 시작
    if (count < 301 && count > 0) {
      timerRef.current = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    }

    // 타이머 클리어
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [count]);

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
  const sendVerify = async (e: any) => {
    e.preventDefault();
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
      }
    } catch (error: any) {
      alert(error?.response?.data?.message || "알 수 없는 에러 발생");
    }
    setIsLoading(false);
  };

  /**인증번호 입력 후 인증번호 확인 버튼 누르면 실행하는 함수  */
  const checkVerify = async (e: any) => {
    e.preventDefault();
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
      <Logo src="/assets/logo.png" onClick={() => navigate("/")} />
      <form>
        <Input
          id="nickname"
          placeholder="닉네임"
          onChange={onChange}
          value={nickname}
        />
        <Input
          id="email"
          type="email"
          placeholder="이메일"
          onChange={onChange}
          value={email}
        />
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
              <VerifyBtn
                onClick={sendVerify}
                style={isLoading ? { background: "gray" } : {}}
              >
                인증
              </VerifyBtn>
            ) : (
              <VerifyOkBtn onClick={checkVerify}>인증완료</VerifyOkBtn>
            )}
          </VerifyContainer>
        ) : (
          <CountNum style={{ color: "green" }}>이메일 인증 완료!</CountNum>
        )}

        {count <= 300 && !verified && (
          <CountNum>
            {count > 0
              ? `인증 유효 시간: ${displayTime()}`
              : `인증 시간이 만료됨`}
            <ResendBtn
              onClick={sendVerify}
              style={isLoading ? { background: "gray" } : {}}
            >
              재전송
            </ResendBtn>
          </CountNum>
        )}
        <Input
          id="password"
          type="password"
          placeholder="비밀번호"
          onChange={onChange}
          value={password}
          onKeyUp={(e) => {
            if (e.key === "Enter") register();
          }}
        />
        <Input
          id="passwordVerify"
          type="password"
          placeholder="비밀번호 확인"
          onChange={onChange}
          value={passwordVerify}
          onKeyUp={(e) => {
            if (e.key === "Enter") register();
          }}
        />
        <div>
          {verified ? (
            <SummitBtn onClick={register}>회원가입</SummitBtn>
          ) : (
            <SummitBtn onClick={() => alert("메일을 인증해주세요.")}>
              회원가입
            </SummitBtn>
          )}
        </div>
      </form>
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
  @media screen and (max-width: 450px) {
    width: 300px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 7px;
  margin: 5px 0;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid gray;
`;

const SummitBtn = styled.div`
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

const VerifyContainer = styled.div`
  width: 100%;
  height: 48px;
  padding: 0;
  margin: 5px 0;
  gap: 7px;
  display: flex;

  & input {
    padding: 7px;
    margin: 5px 0;
    border-radius: 8px;
    border: 1px solid gray;
  }
`;

const VerifyBtn = styled.button`
  background-color: #5f5fe0;
  margin: 9px;
  width: 45px;
  border-radius: 5px;
  position: relative;
  right: -340px;
  top: -54px;
  border: none;
  white-space: nowrap;
  color: white;
  font-size: 0.8rem;
  &:hover {
    filter: contrast(200%);
  }
  @media screen and (max-width: 450px) {
    right: -240px;
  }
`;

const VerifyOkBtn = styled.button`
  background-color: #5a59ff;
  border: none;
  color: white;
  border-radius: 8px;
  margin: 5px;
  font-size: 0.8rem;
  &:hover {
    filter: contrast(200%);
  }
`;

const CountNum = styled.div`
  color: red;
`;

const ResendBtn = styled.button`
  position: relative;
  right: -160px;
  top: -102px;
  padding: 5px;
  width: 55px;
  margin: 5px 10px;
  border-radius: 8px;
  border: none;
  font-size: 0.8rem;
  background-color: #5f5fe0;
  color: white;
  &:hover {
    filter: contrast(200%);
  }

  @media screen and (max-width: 450px) {
    right: -87px;
  }
`;
export default Register;
