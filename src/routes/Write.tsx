import { styled } from "styled-components";
import { useState } from "react";
import axios from "axios";

const data = {
  인문학계열: ["국어국문학과", "영어영문학과", "사학과", "철학과", "심리학과"],
  사회과학계열: [
    "경제학과",
    "사회학과",
    "정치외교학과",
    "언론정보학과",
    "행정학과",
  ],
  자연과학계열: ["수학과", "물리학과", "화학과", "생명과학과", "지구과학과"],
  공학계열: [
    "컴퓨터공학과",
    "전자공학과",
    "기계공학과",
    "화학공학과",
    "건축공학과",
  ],
  예술계열: ["미술학과", "음악학과", "연극영화학과", "무용학과", "디자인학과"],
  의학계열: ["의학과", "치과학과", "간호학과", "한의학과"],
  교육계열: ["교육학과", "유아교육과", "초등교육과", "특수교육과"],
} as any;

const tagList = ["자유", "정보", "질문", "스터디", "취업"];

function Write() {
  const [bigCategory, setBigCategory] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const postPosting = async () => {
    try {
      const response = await axios.post("http://localhost:8000/posting/add", {
        category: category,
        tag: tag,
        title: title,
        content: content,
        img1Url: undefined,
        img2Url: undefined,
        img3Url: undefined,
      });
      alert(response.data);
    } catch (error: any) {
      alert(error?.response?.data || "알 수 없는 오류 발생.");
    }
  };

  return (
    <Container>
      <form>
        <FormBox>
          <label htmlFor="category">학과</label>
          <select
            id="category"
            onClick={(e: any) => setBigCategory(e.target.value)}
          >
            <option>대분류 선택</option>
            {Object.keys(data).map((item: any) => {
              return <option key={item}>{item}</option>;
            })}
          </select>
          <select onClick={(e: any) => setCategory(e.target.value)}>
            <option>소분류 선택</option>
            {data[bigCategory]?.map((item: any) => {
              return <option key={item}>{item}</option>;
            })}
          </select>
          <label htmlFor="tag">태그</label>
          <select id="tag" onClick={(e: any) => setTag(e.target.value)}>
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
          <button onSubmit={postPosting}>작성완료</button>
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
