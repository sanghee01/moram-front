import { useState } from "react";
import styled from "styled-components";

function Qna() {
  const [emailValue, setEmail] = useState("");
  const [titleValue, setTitle] = useState("");
  const [contentValue, setContent] = useState("");
  const EmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    console.log(event.target.value);
  };
  const TitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const ContentInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };
  return (
    <Container>
      <div>
        <QnaTitle>
          <h2>문의주세용가리치킨:)</h2>
        </QnaTitle>
        <QnaMain>
          <EmailDiv>
            <h4>email</h4>
            <input
              type="email"
              placeholder="이메일을 입력해주세요"
              value={emailValue}
              onChange={EmailInput}
            />
          </EmailDiv>
          <TitleDiv>
            <h4>title</h4>
            <input
              type="text"
              placeholder="제목을 입력해주세요"
              value={titleValue}
              onChange={TitleInput}
            />
          </TitleDiv>
          <AttachFile>
            <button>파일 선택</button>첨부파일 넣는 곳
          </AttachFile>
          <ContentDiv>
            <h4>Message</h4>
            <ContentTextarea
              placeholder="내용을 입력해주세요"
              value={contentValue}
              onChange={ContentInput}
            />
          </ContentDiv>
        </QnaMain>
        <QnaCharacter>
          말풍선처럼 만들 예정
          <img src="./assets/profileimage.jpg" />
        </QnaCharacter>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 60%;
  margin: auto;
`;
const QnaTitle = styled.div`
  display: flex;
  margin-top: 1rem;
  margin-bottom: 1.8rem;
  font-size: 1.5rem;
`;
const QnaMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const EmailDiv = styled.div`
  display: flex;
  width: 100%;
  & h4 {
    margin-right: 1rem;
  }
`;
const TitleDiv = styled.div`
  display: flex;
  width: 100%;
  & h4 {
    margin-right: 1.7rem;
  }
`;
const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
const ContentTextarea = styled.textarea`
  width: 100%;
  height: 200px;
  text-align: left;
`;
const AttachFile = styled.div``;
const QnaCharacter = styled.div`
  display: flex;
  justify-content: flex-end;
  & img {
  }
`;
export default Qna;
