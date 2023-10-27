import { styled } from "styled-components";
import PopularContent from "../components/Home/PopularContent";
import NewContent from "../components/Home/NewContent";
function Home() {
  return (
    <>
      <img src="https://moram.b1nd.com/static/media/DefaultBanner.36c8f1c1.jpg" />
      <Container>
        <h1>인기 게시글</h1>
        <PopularContentBox>
          <PopularContent
            src="https://cdnimage.dailian.co.kr/news/202010/news_1602750704_927720_m_1.png"
            major="컴퓨터공학과"
            title="알고리즘 공부하는 방법"
          />
          <PopularContent
            src="https://img.hankyung.com/photo/201706/AA.14117791.1.jpg"
            major="철학과"
            title="철학이란?"
          />
          <PopularContent
            src="https://this.deakin.edu.au/wp-content/uploads/2016/05/Pink-desk-with-computer.jpg"
            major="전기공학과"
            title="전기에 대해 알아보자"
          />
        </PopularContentBox>
        <h1>최신 게시글</h1>
        <NewContentBox>
          <NewContent
            src="https://react.dev/images/home/conf2021/cover.svg"
            category="스터디"
            title="React 스터디 구합니다"
            date="2023.10.10."
            content="React 기초부터 같이 학습하실 분 구합니다. 어느정도 공부 후
                프로젝트도 할 예정입니다."
          />
          <NewContent
            src="https://img.hankyung.com/photo/201706/AA.14117791.1.jpg"
            category="취업"
            title="세무사 합격 수기"
            date="2023.10.10."
            content="드디어 부족한 필력이지만 수험 생활을 준비하시는 분들에게
            조금이나마 도움이 되고자 이렇게 합격 수기를 씁니다."
          />
          <NewContent
            src="https://this.deakin.edu.au/wp-content/uploads/2016/05/Pink-desk-with-computer.jpg"
            category="대외활동"
            title="SW AI 교육 여름 새싹캠프 같이하실 분 구합니다"
            date="2023.10.10."
            content="안녕하세요! 새싹캠프 같이하실 분 구해요. 링크 첨부합니다. 내용
            읽어보시고 같이 하고 싶으신분 오픈채팅방으로 들어와주시면
            감사하겠습니다."
          />
          <NewContent
            src="https://this.deakin.edu.au/wp-content/uploads/2016/05/Pink-desk-with-computer.jpg"
            category="스터디"
            title="기상 영어 회화 스터디"
            date="2023.10.10."
            content="안녕하세요. 주 3회정도 영어 회화 스터디하실 분 계실까요? 10분
            분량의 TED 시청 후 영어로 토론 해보는 시간을 가질까합니다! 더
            자세한건 같이 논의해봐요."
          />
        </NewContentBox>
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
