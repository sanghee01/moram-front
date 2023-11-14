import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Intro() {
  const navigate = useNavigate();
  return (
    <Container>
      <ContainerBox>
        <IntroTitle>
          <h1>
            지금부터 우리의 <br />
            <span>모람모람</span>을 소개합니다.
          </h1>
          <p>
            학과에 대한 정보를 얻는데 <br />
            어려움을 느끼고 계시나요? <br />
            모람모람은 (대학 게시판 커뮤니티)로
            <br />
            당신의 대학생활을 더욱 풍요롭게 만들어 줄 사이트입니다. <br />
            다앙한 학교, 다양한 학과에 대한 정보부터 <br />
            많은 사람들의 꿀팁까지 확인할 수 있습니다.
          </p>
          <div>
            <button onClick={() => navigate("/register")}>가입하고 시작</button>
          </div>
        </IntroTitle>
        <IntroImg>
          <img src="./assets/introimage.png" />
        </IntroImg>
      </ContainerBox>
      <ContainerBox2>
        <h2>우리의 목표</h2>
        <Goal>
          <div>
            <span>[아이콘]</span>
            <div>
              <p>목표 1</p>
              <p>다양한 지식 공유</p>
            </div>
          </div>
          <div>
            <span>[아이콘]</span>
            <div>
              <p>목적 2</p>
              <p>대학생 통합 커뮤니티</p>
            </div>
          </div>
          <div>
            <span>[아이콘]</span>
            <div>
              <p>목표 3</p>
              <p></p>
            </div>
          </div>
        </Goal>
      </ContainerBox2>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: calc(100dvh - (var(--headerHeight) + var(--footerHeight)));
`;
const ContainerBox = styled.div`
  width: 65%;
  margin: 3rem 0;
  display: flex;
`;

const IntroTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 60%;
  margin: 2rem 0rem;
  & button {
    width: 150px;
    height: 40px;
    font-weight: 600;
    border-radius: 10px;
    background-color: #d6d3fb;
    outline: 0;
    border: 0;
    transition: background-color 0.5s ease;
  }
  & button:hover {
    background-color: #6c6ce3;
    color: white;
  }
  & span {
    font-size: 40px;
    color: purple;
    font-weight: 1000;
  }
  & p {
    font-size: 16px;
  }
`;

const IntroImg = styled.div`
  margin: 3rem 0;
  margin-left: 4rem;
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  & img {
  }
`;

const ContainerBox2 = styled.div`
  margin-bottom: 4rem;
  width: 65%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
`;

const Goal = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
  & div {
    display: flex;
  }
`;

export default Intro;
