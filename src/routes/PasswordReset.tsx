import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function PasswordReset() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const postResetMail = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_APIADDRESS}/login/forgotpw`,
        { email }
      );
      if (response.data) {
        setLoading(false);
        alert(response.data.message);
      }
    } catch (error: any) {
      console.log(error?.response?.data?.message || "알 수 없는 에러 발생");
      alert(error?.response?.data?.message || "알 수 없는 에러 발생");
    }
  };
  return (
    <Container>
      <FormContainer>
        <Label>
          가입했던 이메일 주소를 입력하면 비밀전호 재설정 링크를 보내드립니다.
        </Label>
        <Input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          placeholder="example@xxx.com"
        />
        <Btn $loading={loading} onClick={postResetMail}>
          {loading ? "메일 전송 중..." : "비밀번호 초기화 메일 전송하기"}
        </Btn>
      </FormContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: calc(100dvh - (var(--headerHeight) + var(--footerHeight)));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const FormContainer = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  font-size: 1.5rem;
  font-weight: bolder;
  gap: 30px;
  border-radius: 15px;
  background-color: whitesmoke;
  & div {
    color: black;
  }
`;

const Label = styled.div`
  font-size: 1.3rem;
`;

const Input = styled.input`
  width: 90%;
  max-width: 500px;
  height: 50px;
  padding: 0 10px;
  font-size: 1.2rem;
  border-radius: 15px;
  border: 2px solid #8585ff;

  &:focus {
    border: 2px solid #4b4bff;
    outline: none;
  }
`;

const Btn = styled.button<any>`
  width: auto;
  height: auto;
  display: flex;
  padding: 10px 15px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 0px;
  background-color: ${(props) => (props.$loading ? "gray" : "#afaffd")};
  font-size: 1.2rem;
  transition: all 0.5s;
  &:hover {
    background-color: ${(props) => (props.$loading ? "gray" : "#9b9bfc")};
  }
  @media screen and (max-width: 500px) {
    padding: 10px;
    font-size: 1rem;
  }
`;

export default PasswordReset;
