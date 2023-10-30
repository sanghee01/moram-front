import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Community() {
  /**좌측 계열 패널 확장 */
  const [isExpanded, setIsExpanded] = useState<any>({
    인문학계열: false,
    사회과학계열: false,
    자연과학계열: false,
    공학계열: false,
    예술계열: false,
    의학계열: false,
    교육계열: false,
  });
  const [postings, setPostings] = useState<any>(null); // 게시물들 데이터
  const [categoryFilter, setCategoryFilter] = useState<any>(""); // 과 필터
  const [tagFilter, setTagFilter] = useState<any>(""); // 태그('자유','질문'...) 필터

  /**계열 확장, 축소 함수*/
  const toggleBigCategory = (bigCategory: any) => {
    setIsExpanded((prevState: any) => ({
      ...prevState,
      [bigCategory]: !prevState[bigCategory],
    }));
  };

  //커뮤니티 접속 시 게시물 받아오기 */
  useEffect(() => {
    getPostings();
  }, []);

  //학과, 태그 필터 변경 시 필터해서 게시물 다시 받아오기
  useEffect(() => {
    getPostings(categoryFilter, tagFilter);
  }, [categoryFilter, tagFilter]);

  /**게시물 정보 받아오는 함수 */
  const getPostings = async (category = "", tag = "") => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_APIADDRESS}/posting?category=${category}&tag=${tag}`
      );
      setPostings(response.data);
      console.log(response.data);
    } catch (error: any) {
      alert(error?.response?.data || "알 수 없는 오류 발생.");
    }
  };

  /** 날짜 형식 변환 함수 */
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
                  ? { background: "white", color: "black" }
                  : { backgroundColor: "#0e2b49" }
              }
            >
              {bigCategory} {isExpanded[bigCategory] ? "-" : "+"}
            </button>
            {/* 계열 클릭해서 펼쳐졌을 때 */}
            {isExpanded[bigCategory] && (
              <CategoryContainer>
                {data[bigCategory].map((category: any) => (
                  <button
                    key={category}
                    onClick={() => {
                      setCategoryFilter(category);
                      category === categoryFilter && setCategoryFilter("");
                    }}
                    style={
                      category === categoryFilter
                        ? { background: "#b0b0fc" }
                        : {}
                    }
                  >
                    {category}
                  </button>
                ))}
              </CategoryContainer>
            )}
          </BigCategory>
        ))}
      </Sidebar>

      <Article>
        {/* 태그 필터 버튼 모임 */}
        <TagContainer>
          {tagList.map((tag: any) => (
            <button
              key={tag}
              style={tagFilter === tag ? { background: "#b0b0fc" } : {}}
              onClick={() => {
                setTagFilter(tag);
                tag === tagFilter && setTagFilter("");
              }}
            >
              {tag} {tag === tagFilter && "-"}
            </button>
          ))}
        </TagContainer>
        {postings?.map((posting: any) => (
          <Content key={posting.id}>
            <div>
              [{posting.category}] [{posting.tag}]&nbsp;
              <Link to={`/community/${posting.id}`}> {posting.title}</Link>
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
  & a {
    color: black;
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

  & button {
    transition: 0.5s all;
    background-color: white;
    padding: 10px 20px;
    border-radius: 15px;
    font-weight: 500;
    border: 0;
  }
  & button:hover {
    cursor: pointer;
    background-color: #d6d6ff;
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
  gap: 25px;
  overflow-y: scroll;
`;

const BigCategory = styled.div`
  width: 100%;

  & button {
    width: 100%;
    height: 50px;
    border: 0px;
    border-radius: 20px;
    font-size: 1.15rem;
    font-weight: 700;
    color: white;
    border: 2px solid white;
    transition: 0.3s all;
  }

  & button:hover {
    filter: contrast(200%);
    cursor: pointer;
  }
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 10px;

  & button {
    width: 100%;
    height: 40px;
    background-color: white;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.1rem;
    font-weight: 600;
    color: black;
  }

  & button:hover {
    cursor: pointer;
    background: #d1bcf8;
  }
`;
export default Community;
