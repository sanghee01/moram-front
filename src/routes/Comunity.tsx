import { useState } from "react";
import styled from "styled-components";

function Comunity() {
  const [isExpanded, setIsExpanded] = useState<any>({
    인문학계열: false,
    사회과학계열: false,
    자연과학계열: false,
    공학계열: false,
    예술계열: false,
    의학계열: false,
    교육계열: false,
  });

  const toggleCollege = (college: any) => {
    setIsExpanded((prevState: any) => ({
      ...prevState,
      [college]: !prevState[college],
    }));
  };

  return (
    <Sidebar>
      {Object.keys(data).map((category: any) => (
        <BigCategory key={category}>
          <button onClick={() => toggleCollege(category)}>
            {isExpanded[category] ? "▼" : "▶"} {category}
          </button>
          {isExpanded[category] && (
            <div>
              {data[category].map((college: any) => (
                <div key={college}>{college}</div>
              ))}
            </div>
          )}
        </BigCategory>
      ))}
    </Sidebar>
  );
}

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

const Sidebar = styled.div`
  width: 300px;
  height: 500px;
  border-radius: 10px;
  background-color: #d3d3d3;
  display: flex;
  flex-direction: column;
  margin: 10px;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  overflow-y: scroll;
`;

const BigCategory = styled.div`
  width: 100%;

  & button {
    width: 100%;
  }
`;
export default Comunity;
