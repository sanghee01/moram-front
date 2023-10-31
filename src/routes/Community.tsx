import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CategorySpan } from "../styles/CommunityStyles";
import { categoryList } from "../categoryList";

function Community() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const categoryQuery: any = queryParams.get("category");
  const tagQuery = queryParams.get("tag");
  /**좌측 계열 패널 확장 */
  const categoryKeys = Object.keys(categoryList);
  let initialIsExpandedState = categoryKeys.reduce((acc: any, category) => {
    acc[category] = false;
    return acc;
  }, {}); //계열(bigcategory) 구하기

  /**좌측 패널 확장 기록 불러오기 */
  let foundCategory: any = null;
  for (const key in categoryList) {
    if (categoryList[key].includes(categoryQuery)) {
      foundCategory = key;
      break;
    }
  }
  initialIsExpandedState[foundCategory] = true;
  console.log(initialIsExpandedState);
  const [isExpanded, setIsExpanded] = useState(initialIsExpandedState);
  const [postings, setPostings] = useState<any>(null); // 게시물들 데이터
  const [categoryFilter, setCategoryFilter] = useState<string>(
    categoryQuery || ""
  ); // 과 필터
  const [tagFilter, setTagFilter] = useState<string>(tagQuery || ""); // 태그('자유','질문'...) 필터

  /**계열 확장, 축소 함수*/
  const toggleBigCategory = (bigCategory: any) => {
    setIsExpanded((prevState: any) => ({
      ...prevState,
      [bigCategory]: !prevState[bigCategory],
    }));
  };

  //커뮤니티 접속 시 게시물 받아오기 */
  useEffect(() => {
    getPostings(categoryFilter, tagFilter);
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

  const changeQuery = (newCategory: any, newTag: any) => {
    // 변경된 쿼리 매개변수를 포함한 새 URL을 생성합니다.
    const newSearchParams = new URLSearchParams();
    if (newCategory) {
      newSearchParams.set("category", newCategory);
    }
    if (newTag) {
      newSearchParams.set("tag", newTag);
    }

    navigate({
      pathname: location.pathname,
      search: `?${newSearchParams.toString()}`,
    });
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
        {Object.keys(categoryList).map((bigCategory: any) => (
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
                {categoryList[bigCategory].map((category: any) => (
                  <button
                    key={category}
                    onClick={() => {
                      setCategoryFilter(category);
                      changeQuery(category, tagFilter);
                      if (category === categoryFilter) {
                        setCategoryFilter("");
                        changeQuery("", tagFilter);
                      }
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
                changeQuery(categoryFilter, tag);
                if (tag === tagFilter) {
                  setTagFilter("");
                  changeQuery(categoryFilter, "");
                }
              }}
            >
              {tag} {tag === tagFilter && "-"}
            </button>
          ))}
        </TagContainer>
        {/* 포스팅 목록 */}
        {postings?.map((posting: any) => (
          <Content key={posting.id}>
            <div>
              <Category>[{posting.category}]</Category>{" "}
              <Category>[{posting.tag}]</Category>&nbsp;
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

const Category = styled(CategorySpan)`
  margin-right: 5px;
`;

export default Community;
