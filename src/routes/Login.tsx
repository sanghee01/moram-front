import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo, Container, Form, Input, Buttons } from "../styles/LoginStyles";
import { useSetRecoilState } from "recoil";
import { userState } from "../state";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();
  const onChange = (e: any) => {
    const {
      target: { id, value },
    } = e;
    if (id === "email") setEmail(value);
    if (id === "password") setPassword(value);
  };

  const login = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/user/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      setUser(response.data.content);
      console.log(response.data.content);
      alert(response?.data.message);
    } catch (error: any) {
      alert(error.response?.data || "알 수 없는 에러 발생");
    }
  };

  const kakao = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user/kakao", {
        withCredentials: true,
      });
      alert(response?.data);
    } catch (error: any) {
      alert(error.response?.data || "알 수 없는 에러 발생");
    }
  };
  return (
    <Container>
      <Form>
        <Logo>모람모람 로그인하기</Logo>
        <Input
          id="email"
          type="email"
          placeholder="이메일"
          onChange={onChange}
          value={email}
        />
        <Input
          id="password"
          type="password"
          placeholder="비밀번호"
          onChange={onChange}
          value={password}
        />
        <Buttons>
          <button
            style={{ backgroundColor: "rgb(40, 98, 255)" }}
            onClick={() => login()}
          >
            로그인
          </button>
          <button>
            <a href="http://localhost:8000/user/kakao" target="_blank">
              카카오로 로그인/회원가입
            </a>
          </button>
          <button onClick={() => navigate("/register")}>
            이메일로 회원가입하기
          </button>
        </Buttons>
      </Form>
    </Container>
  );
}

export default Login;
