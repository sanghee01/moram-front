import { styled } from "styled-components";
function Home() {
  return (
    <>
      <img src="https://moram.b1nd.com/static/media/DefaultBanner.36c8f1c1.jpg" />
      <Container>
        <h1>인기 게시글</h1>
        <PopularContent>
          <Content>
            <img
              src="https://cdnimage.dailian.co.kr/news/202010/news_1602750704_927720_m_1.png"
              alt="이미지"
            />
            <span>[컴퓨터공학과] 알고리즘 공부하는 방법</span>
          </Content>
          <Content>
            <img
              src="https://img.hankyung.com/photo/201706/AA.14117791.1.jpg"
              alt="이미지"
            />
            <span>[철학과] 철학이란?</span>
          </Content>
          <Content>
            <img
              src="https://this.deakin.edu.au/wp-content/uploads/2016/05/Pink-desk-with-computer.jpg"
              alt="이미지"
            />
            <span>[전기공학과] 전기에 대해 알아보자</span>
          </Content>
        </PopularContent>
        <h1>최신 게시글</h1>
        <NewContent>
          <Content>
            <img
              src="https://react.dev/images/home/conf2021/cover.svg"
              alt="이미지"
            />
            <section>
              <div>
                <span>[스터디] React 스터디 구합니다</span>
                <span>2023.10.10.</span>
              </div>
              <p>
                React 기초부터 같이 학습하실 분 구합니다. 어느정도 공부 후
                프로젝트도 할 예정입니다.
              </p>
            </section>
          </Content>
          <Content>
            <img
              src="https://img.hankyung.com/photo/201706/AA.14117791.1.jpg"
              alt="이미지"
            />
            <section>
              <div>
                <span>[취업] 세무사 합격 수기</span>
                <span>2023.10.10.</span>
              </div>
              <p>
                드디어 부족한 필력이지만 수험 생활을 준비하시는 분들에게
                조금이나마 도움이 되고자 이렇게 합격 수기를 씁니다.
              </p>
            </section>
          </Content>
          <Content>
            <img
              src="https://this.deakin.edu.au/wp-content/uploads/2016/05/Pink-desk-with-computer.jpg"
              alt="이미지"
            />
            <section>
              <div>
                <span>
                  [대외활동] SW AI 교육 여름 새싹캠프 같이하실 분 구합니다
                </span>
                <span>2023.10.10.</span>
              </div>
              <p>
                안녕하세요! 새싹캠프 같이하실 분 구해요. 링크 첨부합니다. 내용
                읽어보시고 같이 하고 싶으신분 오픈채팅방으로 들어와주시면
                감사하겠습니다.
              </p>
            </section>
          </Content>
          <Content>
            <img
              src="https://this.deakin.edu.au/wp-content/uploads/2016/05/Pink-desk-with-computer.jpg"
              alt="이미지"
            />
            <section>
              <div>
                <span>[스터디] 기상 영어 회화 스터디</span>
                <span>2023.10.10.</span>
              </div>
              <p>
                안녕하세요. 주 3회정도 영어 회화 스터디하실 분 계실까요? 10분
                분량의 TED 시청 후 영어로 토론 해보는 시간을 가질까합니다! 더
                자세한건 같이 논의해봐요.
              </p>
            </section>
          </Content>
        </NewContent>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 65%;
  margin: 0 auto;
  & h1 {
    margin-top: 5ch;
    font-size: 1.4rem;
  }
`;

const Content = styled.div``;

const PopularContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 25px;

  ${Content} {
    display: flex;
    flex-direction: column;
    width: 300px;
    flex-grow: 1;
    gap: 5px;

    &:hover {
      cursor: pointer;
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
  }
`;

const NewContent = styled.div`
  display: flex;
  flex-direction: column;

  ${Content} {
    display: flex;
    gap: 20px;
    margin-top: 10px;

    &:hover {
      cursor: pointer;
    }
    & img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 8px;
    }
    & section {
      display: flex;
      flex-direction: column;

      & div {
        display: flex;
        gap: 10px;
      }
      @media screen and (max-width: 1000px) {
        & div {
          flex-direction: column;
          gap: 0;
        }
      }
    }
    @media screen and (max-width: 1000px) {
      & img {
        width: 70px;
        height: 70px;
      }
    }
    @media screen and (max-width: 600px) {
      & img {
        width: 50px;
        height: 50px;
      }
    }
  }
`;

export default Home;
