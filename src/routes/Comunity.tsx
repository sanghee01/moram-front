import axios from "axios";
import { useEffect, useState } from "react";
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
  const [postings, setPostings] = useState<any>(null);
  const [categoryFilter, setCategoryFilter] = useState<any>("");
  const [TagContainerFilter, setTagContainerFilter] = useState<any>("");

  const toggleBigCategory = (bigCategory: any) => {
    setIsExpanded((prevState: any) => ({
      ...prevState,
      [bigCategory]: !prevState[bigCategory],
    }));
  };

  useEffect(() => {
    getPostings();
  }, []);

  useEffect(() => {
    getPostings(categoryFilter, TagContainerFilter);
  }, [categoryFilter, TagContainerFilter]);

  const getPostings = async (category = "", TagContainer = "") => {
    try {
      const response = await axios.get(
        `http://localhost:8000/posting?category=${category}&TagContainer=${TagContainer}`
      );
      setPostings(response.data);
      console.log(response.data);
    } catch (error: any) {
      alert(error?.response?.data || "알 수 없는 오류 발생.");
    }
  };

  const date = (dateStr: string) => {
    const dateObj = new Date(dateStr);
    return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(dateObj.getDate()).padStart(2, "0")} ${String(
      dateObj.getHours()
    ).padStart(2, "0")}:${String(dateObj.getMinutes()).padStart(2, "0")}`;
  };
  return (
    <Container>
      {/* 좌측에 있는 과 선택 버튼 */}
      <Sidebar>
        {Object.keys(data).map((bigCategory: any) => (
          <BigCategory key={bigCategory}>
            <button
              onClick={() => toggleBigCategory(bigCategory)}
              style={
                isExpanded[bigCategory]
                  ? { background: "lightblue" }
                  : { backgroundColor: "white" }
              }
            >
              {bigCategory}
            </button>
            {/* 계열 클릭해서 펼쳐졌을 때 */}
            {isExpanded[bigCategory] && (
              <CategoryContainer>
                {data[bigCategory].map((category: any) => (
                  <div
                    key={category}
                    onClick={() => {
                      setCategoryFilter(category);
                      category === categoryFilter && setCategoryFilter("");
                    }}
                    style={
                      category === categoryFilter
                        ? { background: "#5a59ff" }
                        : {}
                    }
                  >
                    {category}
                  </div>
                ))}
              </CategoryContainer>
            )}
          </BigCategory>
        ))}
      </Sidebar>

      <Article>
        <TagContainer>
          {tagList.map((tag: any) => (
            <div
              style={
                TagContainerFilter === tag ? { background: "skyblue" } : {}
              }
              onClick={() => setTagContainerFilter(tag)}
            >
              {tag}
            </div>
          ))}
        </TagContainer>
        {postings?.map((posting: any) => (
          <Content key={posting.id}>
            <div>
              [{posting.category}] [{posting.TagContainer}] {posting.id}{" "}
              {posting.title}{" "}
            </div>
            <div>
              {posting.nickname} | {date(posting.writeTime)}
            </div>
          </Content>
        ))}
      </Article>
    </Container>
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

const tagList = ["자유", "정보", "질문", "스터디", "취업"];

const Container = styled.div`
  display: flex;
  padding: 10px;
  gap: 10px;
`;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  padding: 10px;
  flex-grow: 1;
  height: 600px;
  gap: 10px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: whitesmoke;
  border-radius: 20px;
  padding: 15px;

  & div {
    display: flex;
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: whitesmoke;
  border-radius: 20px;
  padding: 15px;
  gap: 10px;

  & div {
    background-color: white;
    padding: 10px 20px;
    border-radius: 15px;
  }
  & div:hover {
    cursor: pointer;
  }
`;

const Sidebar = styled.div`
  width: 300px;
  height: 600px;
  border-radius: 10px;
  background-color: #0e2b49;
  display: flex;
  flex-direction: column;
  padding: 15px;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  overflow-y: scroll;
`;

const BigCategory = styled.div`
  width: 100%;

  & button {
    width: 100%;
    height: 45px;
    border: 0px;
    border-radius: 20px;
    background-color: skyblue;
    font-size: 1.15rem;
    font-weight: 700;
  }
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 10px;

  & div {
    width: 100%;
    height: 40px;
    background-color: white;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.1rem;
    font-weight: 600;
  }

  & div:nth-child(2n) {
    background-color: #f0f8ff;
  }

  & div:hover {
    cursor: pointer;
  }
`;
export default Comunity;
