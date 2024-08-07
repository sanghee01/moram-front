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
  const [banner, setBanner] = useState("");

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

  const banners = [
    "/assets/banner0.png",
    "/assets/banner1.png",
    "/assets/banner2.png",
  ];

  useEffect(() => {
    setBanner(banners[Math.floor(Math.random() * banners.length)]);
  }, []);

  return (
    <>
      <BannerImg src={banner} alt="홈배너" />
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
                  profileImg={item.profileImg}
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
                  profileImg={item.profileImg}
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

  @media screen and (max-width: 1200px) {
    width: 85%;
    font-size: 0.9rem;
    & h1 {
      font-size: 1.2rem;
    }
  }
  @media screen and (max-width: 450px) {
    width: 90%;
    font-size: 0.7rem;
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

const BannerImg = styled.img`
  width: 100%;
  max-height: 350px;
  object-fit: cover;
`;

export default Home;
