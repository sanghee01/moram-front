import { styled } from "styled-components";
import PopularContent from "../components/Home/PopularContent";
import NewContent from "../components/Home/NewContent";
import axios from "axios";
import { useEffect, useState } from "react";
import { handleDateChange } from "../dateChange";

function Home() {
  const [popularPosts, setPopularPosts] = useState<any[]>([]);
  const [lastPosts, setLastPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);

  useEffect(() => {
    getPopularPosting();
    getLastPosting();
  }, []);

  const getPopularPosting = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_APIADDRESS}/posting/popular`
      );
      const popularData = response.data.content;
      setPopularPosts(popularData);
      setLoading(false);
    } catch (error: any) {
      console.error(error?.response?.data?.message || "알 수 없는 에러 발생");
    }
  };

  const getLastPosting = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_APIADDRESS}/posting?lastId=99999`
      );
      const lastData = response.data.content.postings;
      setLastPosts(lastData);
      setLoading2(false);
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
          {loading ? (
            <span>loading...</span>
          ) : (
            popularPosts.map((item) => {
              return (
                <PopularContent
                  key={item.id}
                  id={item.id}
                  nickname={item.nickname}
                  hitCount={item.hitCount}
                  likesCount={item.likesCount}
                  commentCount={item.commentCount}
                  img={item.img1Url}
                  category={item.category}
                  title={item.title}
                  date={handleDateChange(item.writeTime)}
                  tag={item.tag}
                />
              );
            })
          )}
        </PopularContentBox>
        <h1>최신 게시글</h1>
        <NewContentBox>
          {loading2 ? (
            <span>loading...</span>
          ) : (
            lastPosts?.map((item) => {
              return (
                <NewContent
                  key={item.id}
                  id={item.id}
                  nickname={item.nickname}
                  hitCount={item.hitCount}
                  likesCount={item.likesCount}
                  commentCount={item.commentCount}
                  img={item.img1Url}
                  category={item.category}
                  title={item.title}
                  date={handleDateChange(item.writeTime)}
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
  margin-bottom: 70px;
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
