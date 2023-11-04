import { styled } from "styled-components";
import PopularContent from "../components/Home/PopularContent";
import NewContent from "../components/Home/NewContent";
import { postAtom } from "../state";
import { useRecoilValue } from "recoil";

function Home() {
  const postAtomItem = useRecoilValue(postAtom);
  const postItem = [...postAtomItem];

  const postDate = (dateStr: string) => {
    const dateObj = new Date(dateStr);
    return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(dateObj.getDate()).padStart(2, "0")} ${String(
      dateObj.getHours()
    ).padStart(2, "0")}:${String(dateObj.getMinutes()).padStart(2, "0")}`;
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
          {postItem.length < 1 ? (
            <span>게시글이 없습니다.</span>
          ) : (
            postItem
              .sort((a, b) => {
                const aTime = new Date(postDate(a.writeTime)).getTime();
                const bTime = new Date(postDate(b.writeTime)).getTime();
                if (aTime < bTime) {
                  return 1;
                } else if (aTime > bTime) {
                  return -1;
                }
                return 0;
              })
              .slice(0, 5)
              .map((item) => {
                return (
                  <NewContent
                    key={item.id}
                    img={item.imgUrl[0]}
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
