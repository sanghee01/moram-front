import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { userState } from "../state";
import { SmallBtn } from "../styles/ButtonStyles";
import { useNavigate } from "react-router-dom";

function SelfIntroDuction() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const textareaRef = useRef<any>(null);
  const [gptCount, setGptCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // 높이를 재설정
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 새로운 내용에 맞게 높이를 조정
    }
  }, [text]);

  useEffect(() => {
    if (user) {
      getGptCount();
    }
  }, [user]);

  const getGptCount = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_APIADDRESS}/gpt/count`
      );
      setGptCount(response.data.content); //포스팅 데이터 받기
    } catch (error: any) {
      alert(error?.response?.data?.message || "알 수 없는 에러 발생");
    }
  };

  const postGpt = async () => {
    if (isLoading) {
      return alert("이미 요청을 보냈습니다. 결과가 나올 때까지 기다려주세요.");
    }
    try {
      setResult("인공지능이 열심히 작성 중...");
      const response = await axios.post(
        `${process.env.REACT_APP_APIADDRESS}/gpt`,
        { content: text },
        { timeout: 500000 }
      );
      setResult(response.data.content); //포스팅 데이터 받기
      setIsLoading(false);
      getGptCount();
    } catch (error: any) {
      setIsLoading(false);
      alert(error?.response?.data?.message || "알 수 없는 에러 발생");
    }
  };

  const onChange = (e: any) => {
    setText(e.target.value);
  };
  return (
    <Container>
      <ContainerForm>
        <h2>인공지능을 활용하여 자기소개서를 정리해드립니다.</h2>
        <h3 style={{ color: "#5a59ff" }}>사용 가능 횟수 {gptCount}</h3>
        <Textarea
          ref={textareaRef}
          value={text}
          onChange={onChange}
          placeholder="자기소개서 내용을 여기에 입력하세요..."
        ></Textarea>
        {user ? (
          <SmallBtn
            onClick={() => {
              setIsLoading(true);
              postGpt();
            }}
          >
            {isLoading ? "정리 중..." : "정리"}
          </SmallBtn>
        ) : (
          <SmallBtn $background={"gray"}>로그인 필요</SmallBtn>
        )}
        {result && (
          <>
            <hr style={{ width: "100%" }} />
            <h2>결과</h2>
            <ResultDiv>{result}</ResultDiv>
          </>
        )}
      </ContainerForm>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  min-height: calc(100dvh - 272px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 0;
`;
const ContainerForm = styled.div`
  width: 90%;
  max-width: 800px;
  background-color: whitesmoke;
  border-radius: 15px;
  margin: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  font-family: inherit;
  resize: none; /* 사용자가 리사이즈하지 못하도록 함 */
  overflow: hidden; /* 스크롤바가 나타나지 않도록 함 */
  min-height: 200px; /* 최소 높이 설정 */
  border-radius: 15px;

  &:focus {
    border: 3px solid #5a59ff;
    outline: none;
  }
`;

const ResultDiv = styled.div`
  width: 100%;
  padding: 8px;
  border: 3px solid #5a59ff;
  border-radius: 15px;
  background-color: #f0f8ff;
`;

export default SelfIntroDuction;
