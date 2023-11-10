import { styled } from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userState } from "../state";

function WriteNotice() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  const postNotice = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_APIADDRESS}/notice`,
        {
          title: title,
          content: content.replace(/\n/g, "<br/>"), //줄바꿈 구현을 위해 replace 함수 사용
        }
      );
      alert(response.data.message);
      navigate("/notice");
    } catch (error: any) {
      alert(error?.response?.data.message || "알 수 없는 오류 발생.");
    }
  };
  return (
    <Container>
      <form
        onSubmit={(e: any) => {
          e.preventDefault();
          postNotice();
        }}
      >
        <FormBox>
          <label htmlFor="title">제목</label>
          <input
            id="title"
            onChange={(e: any) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요."
            value={title}
          />
          <label htmlFor="content">본문</label>
          <textarea
            id="content"
            onChange={(e: any) => setContent(e.target.value)}
            placeholder="내용을 입력하세요."
            value={content}
          />
          {user ? (
            <button type="submit">작성완료</button>
          ) : (
            <button style={{ background: "gray" }}>로그인 필요</button>
          )}
        </FormBox>
      </form>
    </Container>
  );
}

export default WriteNotice;

const Container = styled.div`
  width: 50%;
  margin: auto;
  margin-top: 50px;
`;

const FormBox = styled.section`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: whitesmoke;
  border-radius: 10px;
  margin-bottom: 50px;

  & label {
    font-size: 0.9rem;
    margin: 5px;
  }

  margin-top: 10px;
  & input {
    border-radius: 8px;
    padding: 8px;
    background-color: white;
    border: 1px solid #e2e0e0;
    margin-bottom: 5px;
  }
  & textarea {
    width: 100%;
    min-height: 400px;
    resize: none;
    border-radius: 8px;
    padding: 8px;
    background-color: white;
    border: 1px solid #e2e0e0;
    margin-bottom: 5px;
  }
  & button {
    cursor: pointer;
    margin-top: 30px;
    padding: 14px;
    background-color: #0e2b49;
    border-radius: 30px;
    border: none;
    font-size: 15px;
    font-weight: bold;
    color: white;
    &:hover {
      filter: contrast(200%);
    }
    &:disabled {
      background-color: lightgray;
    }
    transition: all 0.2s;
  }
`;
