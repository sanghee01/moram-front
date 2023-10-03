import { styled } from "styled-components";
import Nav from "../components/Nav";

function Home() {
  return (
    <>
      <Nav />
      <Container>
        <img
          width="100%"
          src="https://moram.b1nd.com/static/media/DefaultBanner.36c8f1c1.jpg"
        />
        <ContainerBlock>
          <h1>인기 게시글</h1>
          <ImgContainer>
            <div>
              <img
                src="https://cdnimage.dailian.co.kr/news/202010/news_1602750704_927720_m_1.png"
                alt="이미지"
              />
              <span>[컴퓨터공학과] 알고리즘 공부하는 방법</span>
            </div>
            <div>
              <img
                src="https://img.hankyung.com/photo/201706/AA.14117791.1.jpg"
                alt="이미지"
              />
              <span>[철학과] 철학이란?</span>
            </div>
            <div>
              <img
                src="https://this.deakin.edu.au/wp-content/uploads/2016/05/Pink-desk-with-computer.jpg"
                alt="이미지"
              />
              <span>[전기공학과] 전기에 대해 알아보자</span>
            </div>
          </ImgContainer>
        </ContainerBlock>
        <ContainerBlock>
          <h1>최신 게시글</h1>
        </ContainerBlock>
      </Container>
    </>
  );
}

const Container = styled.div`
  max-width: 1500px;
  padding: 0 20px;
  margin: 0 auto;
`;
const ContainerBlock = styled.div`
  width: calc (100% - 40px);
  padding: 30px 30px;
  margin: 20px 0;
  border-radius: 35px;
  background-color: #d7f4ff;
  display: flex;
  flex-direction: column;

  & h1 {
    margin-top: 0;
    font-weight: 600;
  }
`;

const ImgContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 25px;

  & div {
    width: calc(33% - 50px);
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  & img {
    width: 100%;
    max-height: 100%; /* 이미지의 최대 높이를 부모 컨테이너에 맞게 설정 */
    height: 270px;
    border-radius: 15px;
    object-fit: cover; /* 이미지가 부모 컨테이너에 맞게 자동으로 크기를 조절하되, 가로세로 비율 유지 */
  }
  & span {
    font-weight: bolder;
  }

  @media screen and (max-width: 700px) {
    & div {
      width: 100%;
    }
  }
`;
export default Home;
