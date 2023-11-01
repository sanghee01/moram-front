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
import { useSetRecoilState } from "recoil";
import { userState } from "../state";

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
        `${process.env.REACT_APP_APIADDRESS}/user/login`,
        {
          email,
          password,
        }
      );
      const user = response.data.content[0];
      setUser(user);
      console.log(user);
      alert(response?.data.message);
      navigate(-1);
    } catch (error: any) {
      alert(error.response?.data || "알 수 없는 에러 발생");
    }
  };

  return (
    <Container>
      <Form>
        <Logo>모람모람 로그인하기</Logo>
        <Label>이메일</Label>
        <Input
          id="email"
          type="email"
          placeholder="이메일"
          onChange={onChange}
          value={email}
        />
        <Label>비밀번호</Label>
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
          <a
            href={`${process.env.REACT_APP_APIADDRESS}/user/kakao`}
            target="_self"
          >
            카카오로 로그인/회원가입
          </a>
          <button onClick={() => navigate("/register")}>
            이메일로 회원가입하기
          </button>
        </Buttons>
      </Form>
    </Container>
  );
}

export default Login;
