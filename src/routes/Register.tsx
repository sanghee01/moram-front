import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo, Container, Form, Input, Buttons } from "../styles/LoginStyles";

function Register() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const onChange = (e: any) => {
    const {
      target: { id, value },
    } = e;
    if (id === "email") setEmail(value);
    if (id === "password") setPassword(value);
  };

  const register = async () => {
    try {
      const response = await axios.post("http://localhost:8000/register", {
        nickname,
        email,
        password,
      });
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
        <Input
          id="password"
          type="password"
          placeholder="비밀번호"
          onChange={onChange}
          value={password}
        />
        <Buttons>
          <button
            style={{ backgroundColor: "rgb(93, 165, 0)" }}
            onClick={register}
          >
            회원가입
          </button>
          <button onClick={kakao}>카카오로 로그인/회원가입</button>
          <button onClick={() => navigate("/login")}>
            이메일로 로그인하기
          </button>
        </Buttons>
      </Form>
    </Container>
  );
}

export default Register;
