import { styled } from "styled-components";
import Nav from "../components/Nav";

function Home() {
  return (
    <>
      <Nav />
      <img
        width="100%"
        src="https://moram.b1nd.com/static/media/DefaultBanner.36c8f1c1.jpg"
      />
      <ContainerBlock>
        <h1>
          {"<"} 인기 게시글 {">"}
        </h1>
        <ImgContainer>
          <img
            src="https://this.deakin.edu.au/wp-content/uploads/2016/05/Pink-desk-with-computer.jpg"
            alt="이미지"
          />
          <img
            src="https://this.deakin.edu.au/wp-content/uploads/2016/05/Pink-desk-with-computer.jpg"
            alt="이미지"
          />
          <img
            src="https://this.deakin.edu.au/wp-content/uploads/2016/05/Pink-desk-with-computer.jpg"
            alt="이미지"
          />
        </ImgContainer>
      </ContainerBlock>
      <ContainerBlock>
        <h1>
          {"<"} 최신 게시글 {">"}
        </h1>
      </ContainerBlock>
    </>
  );
}

const ContainerBlock = styled.div`
  width: calc (100% - 40px);
  padding: 5px 17px 30px 17px;
  margin: 20px 40px;
  border-radius: 35px;
  background-color: #d7f4ff;
  display: flex;
  flex-direction: column;
`;

const ImgContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;

  & img {
    width: 30%;
    border-radius: 15px;
  }
`;
export default Home;
