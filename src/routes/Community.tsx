import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { categoryList as loadedCategory } from "../tagList";
import CategoryBtn from "../components/CategoryBtn";
import { useRecoilState, useRecoilValue } from "recoil";
import { idsState, postingState, userState } from "../state";
import { AiOutlineSearch } from "react-icons/ai";
import { LuDelete } from "react-icons/lu";

function Community() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const categoryQuery = queryParams.get("category");
  const tagQuery = queryParams.get("tag");
  const searchQuery = queryParams.get("search");
  const reloadQuery = queryParams.get("reload");
  /**좌측 계열 패널 확장 */
  const categoryKeys = Object.keys(loadedCategory);
  let initialIsExpandedState = categoryKeys.reduce((acc: any, category) => {
    acc[category] = false;
    return acc;
  }, {}); //계열(bigcategory) 구하기

  const [isExpanded, setIsExpanded] = useState(initialIsExpandedState);
  const [postings, setPostings] = useRecoilState<any>(postingState); // 게시물들 데이터
  const [categoryFilter, setCategoryFilter] = useState<any>(
    categoryQuery || ""
  ); // 과 필터
  const [tagFilter, setTagFilter] = useState<any>(tagQuery || ""); // 태그('자유','질문'...) 필터
  const [searchFilter, setSearchFilter] = useState<any>(searchQuery || ""); // 태그('자유','질문'...) 필터
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [ids, setIds] = useRecoilState(idsState);
  const [isbottom, setIsBottom] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [categoryList, setCategoryList] = useState(loadedCategory);
  const [search, setSearch] = useState(searchQuery || "");
  const user = useRecoilValue(userState);
  //const [lastId, setLastId] = useState<any>(99999);
  //const [endPostId, setEndPostId] = useState(0);

  let loading = false;
  const scrollContainerRef = useRef<any>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  /**계열 확장, 축소 함수*/
  const toggleBigCategory = (bigCategory: any) => {
    setIsExpanded((prevState: any) => ({
      ...prevState,
      [bigCategory]: !prevState[bigCategory],
    }));
  };

  useEffect(() => {
    if (reloadQuery === "true") {
      setPostings("");
      setIds([99999, 0]);
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //커뮤니티 접속 시 게시물 받아오기 */
  //학과, 태그 필터 변경 시 필터해서 게시물 다시 받아오기
  useEffect(() => {
    console.log("category, tagfilter useffect  실행");
    if (isOpen) {
      setIds([9999, 0]);
      setPostings("");
    }

    //getPostings();
    loadSidebar();
    // window.addEventListener("scroll", handleScroll);
    // return () => {
    //   window.removeEventListener("scroll", handleScroll);
    // };
    setIsOpen(true);
  }, [categoryFilter, tagFilter, searchFilter]);
  useEffect(() => {
    if (!postings) getPostings();
  }, [postings]);
  useEffect(() => {
    if (user) getBookmark();
  }, [user]);
  useEffect(() => {
    if (isbottom) getPostings();
  }, [isbottom]);
  useEffect(() => {
    setCategoryFilter(queryParams.get("category") || "");
    setTagFilter(queryParams.get("tag") || "");
    setSearchFilter(queryParams.get("search") || "");
    loadSidebar();
  }, [location.search]); // location 객체가 변경될 때마다 실행됩니다.

  const loadSidebar = () => {
    /**좌측 패널 확장 기록 불러오기 */
    let foundCategory: any;
    for (const key in categoryList) {
      if (
        categoryList[key].includes(categoryQuery) &&
        key !== "즐겨찾는 학과"
      ) {
        foundCategory = key;
        break;
      }
    }
    initialIsExpandedState["즐겨찾는 학과"] = true;
    initialIsExpandedState[foundCategory] = true;
    setIsExpanded(initialIsExpandedState);
  };

  /**게시물 정보 받아오는 함수 */
  const getPostings = async () => {
    if (loading) return;
    if (ids[0] === ids[1]) return;

    console.log("getposting 실행 last,end", ids[0], ids[1]);
    const apitext = `${process.env.REACT_APP_APIADDRESS}/posting?category=${categoryFilter}&tag=${tagFilter}&lastId=${ids[0]}&search=${search}`;
    try {
      const response = await axios.get(apitext);

      const content = response.data.content.postings;
      const endId = response.data.content.endId;

      if (!loading && !postings) {
        setPostings(content);
      } else {
        if (content.length > 0)
          setPostings((prevPostings: any): any => [
            ...prevPostings,
            ...content,
          ]);
      }
      setIds([response.data.content.lastId, endId]);
      loading = false;
    } catch (error: any) {
      alert(error?.response?.data?.message || "알 수 없는 에러 발생.");
    }
  };

  const getBookmark = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_APIADDRESS}/bookmark/category`
      );
      setCategoryList((prev: any) => {
        const prevList = { ...prev }; // 이전 상태를 복사
        prevList["즐겨찾는 학과"] = response.data.content;
        return prevList;
      });
    } catch (error: any) {
      console.log(error?.response?.data?.message || "알 수 없는 에러 발생.");
    }
  };

  const postBookmark = async (e: any, category: any) => {
    e.stopPropagation();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_APIADDRESS}/bookmark/category`,
        { category }
      );
      getBookmark();
      alert(response.data.message); //포스팅 데이터 받기
    } catch (error: any) {
      alert(error?.response?.data?.message || "알 수 없는 에러 발생.");
    }
  };

  const changeQuery = (
    newCategory: any = categoryFilter,
    newTag: any = tagFilter,
    newSearch: any = search
  ) => {
    // 변경된 쿼리 매개변수를 포함한 새 URL을 생성합니다.
    const newSearchParams = new URLSearchParams();
    if (newCategory) {
      newSearchParams.set("category", newCategory);
    }
    if (newTag) {
      newSearchParams.set("tag", newTag);
    }
    if (newSearch) {
      newSearchParams.set("search", newSearch);
    }

    navigate({
      pathname: location.pathname,
      search: `?${newSearchParams.toString()}`,
    });
  };

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY;

    //console.log(windowHeight + scrollPosition + 2, fullHeight);
    if (!loading && windowHeight + scrollPosition + 2 >= fullHeight) {
      //스크롤이 맨 밑일 경우
      setIsBottom(true);
      //getPostings();
      loading = true;
      setTimeout(() => {
        loading = false;
      }, 300);
      console.log("맨밑");
    } else setIsBottom(false);
    //console.log(document.documentElement.scrollHeight, scrollPosition);
  };

  const onChange = (e: any) => {
    setSearch(e.target.value);
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
    <Container ref={scrollContainerRef}>
      <HamburgerMenu onClick={toggleSidebar} open={isSidebarOpen}>
        {isSidebarOpen ? "❎" : "☰"}
      </HamburgerMenu>
      {/* 좌측에 있는 과 선택 버튼 */}
      <Sidebar open={isSidebarOpen}>
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
                      setIsSidebarOpen(false); //사이드바 닫기
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
                    <Star onClick={(e) => postBookmark(e, category)}>
                      {categoryList["즐겨찾는 학과"].includes(category)
                        ? "★"
                        : "☆"}
                    </Star>
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
          <div>
            {tagList.map((tag: any) => (
              <button
                key={tag}
                style={tagFilter === tag ? { background: "#b0b0fc" } : {}}
                onClick={() => {
                  if (tag === tagFilter) {
                    setTagFilter("");
                    changeQuery(categoryFilter, "");
                  } else {
                    setTagFilter(tag);
                    changeQuery(categoryFilter, tag);
                  }
                }}
              >
                {tag} {tag === tagFilter && "-"}
              </button>
            ))}
          </div>
          <SearchContainer>
            <input
              onChange={onChange}
              value={search}
              placeholder="제목+내용"
              onKeyDown={(e) => {
                if (e.key === "Enter")
                  changeQuery(categoryFilter, tagFilter, search);
              }}
            ></input>
            <div onClick={() => changeQuery(categoryFilter, tagFilter, search)}>
              <AiOutlineSearch size="30" />
            </div>
          </SearchContainer>
          <button
            onClick={() => navigate("/write")}
            style={{ background: "#b0b0fc" }}
          >
            글 작성
          </button>
        </TagContainer>
        {(categoryFilter || tagFilter || searchFilter) && (
          <FilterContainer>
            현재 게시물 필터{" "}
            {categoryFilter && (
              <TagBtn
                $background={"#f77676"}
                $color={"white"}
                onClick={() => {
                  setCategoryFilter("");
                  changeQuery("", tagQuery);
                }}
              >
                <div>
                  학과 : {categoryFilter} <LuDelete size="23" />
                </div>
              </TagBtn>
            )}
            {tagFilter && (
              <TagBtn
                $background={"#f77676"}
                $color={"white"}
                onClick={() => {
                  setTagFilter("");
                  changeQuery(categoryQuery, "");
                }}
              >
                <div>
                  태그 : {tagFilter} <LuDelete size="23" />
                </div>
              </TagBtn>
            )}
            {searchFilter && (
              <TagBtn
                $background={"#f77676"}
                $color={"white"}
                onClick={() => {
                  setSearch("");
                  changeQuery(categoryQuery, tagQuery, "");
                }}
              >
                <div>
                  검색어 : {searchFilter} <LuDelete size="23" />
                </div>
              </TagBtn>
            )}
          </FilterContainer>
        )}
        {/* 포스팅 목록 */}
        {postings &&
          postings?.map((posting: any) => (
            <Content key={posting.id}>
              <div>
                <CategoryBtn
                  category={posting.category}
                  tag={tagFilter}
                  marginR={10}
                />{" "}
                <TagBtn
                  onClick={() => {
                    setTagFilter(posting.tag);
                    changeQuery(categoryFilter, posting.tag);
                  }}
                >
                  {posting.tag}
                </TagBtn>
                &nbsp;
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
  max-width: 1500px;
  margin: auto;
  padding: 10px;
  gap: 10px;
`;

const Article = styled.article`
  display: flex;
  flex-direction: column;
  padding: 10px;
  flex-grow: 1;
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
    align-items: center;
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
  justify-content: space-between;
  & div {
    display: flex;
    gap: 10px;
  }
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

  @media screen and (max-width: 1200px) {
    flex-wrap: wrap;
    gap: 10px;

    & div {
      display: flex;
      gap: 10px;
      flex-grow: 2;
    }
    & button {
      font-size: 0.9rem;
      padding: 15px 15px;
      flex-grow: 1;
    }
  }
  @media screen and (max-width: 500px) {
    & button {
      font-size: 0.9rem;
      padding: 15px 10px;
    }
  }
`;
const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  background-color: #c2ddf7;
  border-radius: 20px;
  padding: 15px;
  gap: 10px;
`;

const Sidebar = styled.div<any>`
  width: 300px;
  height: 600px;
  border-radius: 10px;
  background-color: #0e2b49;
  display: flex;
  position: sticky;
  top: 143px;
  flex-direction: column;
  padding: 15px;
  justify-content: flex-start;
  align-items: center;
  gap: 25px;
  overflow-y: scroll;
  z-index: 0;

  @media screen and (max-width: 768px) {
    height: calc(100dvh - 140px);
    position: fixed;
    transition: transform 0.3s ease-in-out;
    transform: ${(props) =>
      props.open
        ? "translateX(-12px) translateY(-10px)"
        : "translateX(-130%) translateY(-10px)"};
  }
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
    padding: 0 23px;
  }

  & button:hover {
    cursor: pointer;
    background: #d1bcf8;
  }
`;

const TagBtn = styled.button<any>`
  background-color: ${(props) => props.$background || "#ced3ff"};
  padding: 5px 5px;
  border-radius: 5px;
  transition: 0.5s all;
  border: 0;
  margin-right: 5px;
  & * {
    color: ${(props) => props.$color || "black"};
  }
  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }
  &:hover {
    filter: contrast(130%);
    cursor: pointer;
  }
`;

const HamburgerMenu = styled.div<any>`
  width: 70px;
  height: 70px;
  display: none;
  font-size: 2rem;
  cursor: pointer;
  box-shadow: 0px 0px 20px black;
  border-radius: 50px;
  color: white;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 30px;
    bottom: 30px;
    z-index: 10;

    background-color: ${(props) => (props.open ? "#7979f7" : "#5a59ff")};
  }
`;

const SearchContainer = styled.div`
  display: flex;
  width: 300px;
  margin-left: auto;
  margin-right: 10px;
  gap: 10px;
  & input {
    width: calc(100% - 40px);
    background-color: whitesmoke;
    border-radius: 15px;
    border: 3px solid #9f9ff8;
    padding: 0 10px;
  }
  & input:focus {
    border: 3px solid #5a59ff;
    outline: none;
  }
  & div {
    width: 30px;
    color: #5a59ff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & div:hover {
    cursor: pointer;
  }

  & * {
    color: #5a59ff;
  }
  & *:hover {
    color: #3939f7;
  }
`;

const Star = styled.div`
  margin-left: auto;
  color: tomato;
  font-size: 1.5rem;

  &:hover {
    color: #f7917f;
  }
`;
export default Community;
