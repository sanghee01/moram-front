import { styled } from "styled-components";
import PopularContent from "../components/Home/PopularContent";
import NewContent from "../components/Home/NewContent";
import { postAtom } from "../state";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { useEffect, useState } from "react";

function Home() {
  const postAtomItem = useRecoilValue(postAtom);
  const postItem = [...postAtomItem];
  const [lastPosts, SetLastPosts] = useState<any[]>([]);

  const postDate = (dateStr: string) => {
    const dateObj = new Date(dateStr);
    return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(dateObj.getDate()).padStart(2, "0")} ${String(
      dateObj.getHours()
    ).padStart(2, "0")}:${String(dateObj.getMinutes()).padStart(2, "0")}`;
  };

  useEffect(() => {
    getLastPosting();
  }, []);
  const getLastPosting = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_APIADDRESS}/posting?lastId=99999`
      );
      SetLastPosts(response.data.content.postings);
    } catch (error: any) {
      console.error(error?.response?.data?.message || "알 수 없는 에러 발생");
    }
  };

  return (
    <>
      <img src="https://moram.b1nd.com/static/media/DefaultBanner.36c8f1c1.jpg" />
      <Container>
        <h1>인기 게시글</h1>
        <PopularContentBox>
          {postItem.length < 1 ? (
            <span>게시글이 없습니다.</span>
          ) : (
            postItem
              .sort((a, b) => b.likesCount - a.likesCount)
              .slice(0, 3)
              .map((item) => {
                return (
                  <PopularContent
                    key={item.id}
                    img={item.imgUrl[0]}
                    category={item.category}
                    title={item.title}
                    tag={item.tag}
                  />
                );
              })
          )}
        </PopularContentBox>
        <h1>최신 게시글</h1>
        <NewContentBox>
          {lastPosts.length < 1 ? (
            <span>게시글이 없습니다.</span>
          ) : (
            lastPosts.map((item) => {
              return (
                <NewContent
                  key={item.id}
                  id={item.id}
                  img={item.img1Url}
                  category={item.category}
                  title={item.title}
                  date={postDate(item.writeTime)}
                  content={item.content}
                  tag={item.tag}
                />
              );
            })
          )}
        </NewContentBox>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 65%;
  margin: 0 auto;
  & h1 {
    margin-top: 6ch;
    margin-bottom: 1ch;
    font-size: 1.5rem;
  }
`;

const PopularContentBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
`;

const NewContentBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Home;
