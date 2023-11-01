import { styled } from "styled-components";
import { useState } from "react";
import axios from "axios";
import { categoryList, tagList } from "../tagList";
import { useNavigate } from "react-router-dom";

function Write() {
  const [bigCategory, setBigCategory] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const navigate = useNavigate();

  console.log(category, tag, title, content);
  const postPosting = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/posting", {
        title: title,
        content: content,
        category: category,
        tag: tag,
        img1Url: undefined,
        img2Url: undefined,
        img3Url: undefined,
      });
      alert(response.data);
      navigate("/community");
    } catch (error: any) {
      alert(error?.response?.data || "알 수 없는 오류 발생.");
    }
  };
  return (
    <Container>
      <form onSubmit={postPosting}>
        <FormBox>
          <label htmlFor="category">학과</label>
          <select
            id="category"
            onChange={(e: any) => setBigCategory(e.target.value)}
          >
            <option>대분류 선택</option>
            {Object.keys(categoryList).map((item: any) => {
              return <option key={item}>{item}</option>;
            })}
          </select>
          <select onChange={(e: any) => setCategory(e.target.value)}>
            <option>소분류 선택</option>
            {categoryList[bigCategory]?.map((item: any) => {
              return <option key={item}>{item}</option>;
            })}
          </select>
          <label htmlFor="tag">태그</label>
          <select id="tag" onChange={(e: any) => setTag(e.target.value)}>
            <option>태그 선택</option>
            {tagList.map((item: any) => {
              return <option key={item}>{item}</option>;
            })}
          </select>
        </FormBox>
        <FormBox>
          <label htmlFor="title">제목</label>
          <input
            id="title"
            onChange={(e: any) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요."
          />
          <label htmlFor="content">본문</label>
          <textarea
            id="content"
            onChange={(e: any) => setContent(e.target.value)}
            placeholder="내용을 입력하세요."
          />
          <button type="submit">작성완료</button>
        </FormBox>
      </form>
    </Container>
  );
}

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
  & label {
    font-size: 0.9rem;
    margin: 5px;
  }
  &:first-child {
    & select {
      background-color: white;
      color: #454040c3;
      padding: 5px;
      margin-bottom: 5px;
      border: 1px solid #e2e0e0;
      border-radius: 8px;
    }
  }
  &:last-child {
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
      height: 300px;
      resize: none;
      border-radius: 8px;
      padding: 8px;
      background-color: white;
      border: 1px solid #e2e0e0;
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
  }
`;

export default Write;
