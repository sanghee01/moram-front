import { useState } from "react";
import styled from "styled-components";

interface FileInfo {
  id: string;
  file: File;
}
function generateId() {
  return new Date().getTime().toString();
}

function Qna() {
  const [emailValue, setEmail] = useState("");
  const [titleValue, setTitle] = useState("");
  const [contentValue, setContent] = useState("");
  const [files, setFiles] = useState<FileInfo[]>([]);
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

  const fileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      const newFiles: FileInfo[] = selectedFiles.map((file) => ({
        id: generateId(),
        file: file,
      }));
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };
  const RemoveFile = (id: string) => {
    const updatedFiles = files.filter((file) => file.id !== id);
    setFiles(updatedFiles);
  };
  return (
    <Container>
      <QnaTtilePosition>
        <QnaTitle>
          <h2>문의주세용가리치킨:)</h2>
        </QnaTitle>
      </QnaTtilePosition>
      <QnaContainer>
        <QnaMain>
          <QnaCategory>
            <button>계정 문의</button>
            <button>서비스 문의</button>
            <button>어찌고 문의</button>
            <button>저찌고 문의</button>
            <button>개선 사항</button>
          </QnaCategory>
          <EmailDiv>
            <h4>email</h4>
            <Input
              type="email"
              placeholder="이메일을 입력해주세요."
              value={emailValue}
              onChange={EmailInput}
            />
          </EmailDiv>

          <TitleDiv>
            <h4>title</h4>
            <Input
              type="text"
              placeholder="제목을 입력해주세요."
              value={titleValue}
              onChange={TitleInput}
            />
          </TitleDiv>
          <AttachFile>
            <FileContainer>
              <AttachFileDiv>
                <FileLabel htmlFor="upload-button">파일 선택</FileLabel>
                <input
                  id="upload-button"
                  type="file"
                  style={{ display: "none" }}
                  multiple
                  onChange={fileUpload}
                />
              </AttachFileDiv>
              <FileBox>
                {files.map((file) => (
                  <FileName key={file.id}>
                    {file.file.name}
                    <FileDelet onClick={() => RemoveFile(file.id)}>
                      취소
                    </FileDelet>
                  </FileName>
                ))}
              </FileBox>
            </FileContainer>
          </AttachFile>
          <ContentDiv>
            <h4>Message</h4>
            <ContentTextarea
              placeholder="우선 접수된 문의 건부터 순차적으로 답변해드리겠습니다. 문의 유형을 선택해 주시고 문의 내용을 입력해주시면 됩니다. 답장을 1~3일 소요 될 수 있음을 미리 알립니다."
              value={contentValue}
              onChange={ContentInput}
            />
          </ContentDiv>
        </QnaMain>
      </QnaContainer>
      <div>말풍선 만들 거</div>
      <QnaCharacterPosition>
        <QnaCharacter>
          모람이가 말하고 있는것처럼 말풍선으로 만들 예정
          <img src="./assets/profileimage.jpg" />
        </QnaCharacter>
      </QnaCharacterPosition>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  width: 90%;
  max-width: 800px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const QnaContainer = styled.div`
  width: 100%;
  margin: 1rem 4rem;
  padding: 3rem 12%;
  border: solid 1px gray;
  border-radius: 15px;
`;
const QnaCategory = styled.div`
  display: flex;
  gap: 1%;
  padding: 0 5%;
  justify-content: space-between;
  & button {
    width: 110px;
    height: 40px;
    font-size: 14px;
    background-color: transparent;
    outline: 0;
    border: solid 1px gray;
    border-radius: 15px;
  }
  @media screen and (max-width: 1000px) {
    & button {
      font-size: 12px;
    }
  }
  @media screen and (max-width: 780px) {
    & button {
      font-size: 10px;
    }
  }
`;
const QnaTtilePosition = styled.div`
  width: 100%;
`;
const QnaTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 1rem;
  margin-bottom: 2rem;
  font-size: 1.5rem;
`;
const QnaMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;
const Input = styled.input`
  background-color: transparent;
  outline: 0;
  border: 0;
  border-bottom: solid 1px gray;
  width: 100%;
`;

const EmailDiv = styled.div`
  display: flex;
  width: 100%;
  & h4 {
    margin-right: 3.5rem;
  }
  & ${Input} {
  }
`;
const TitleDiv = styled.div`
  display: flex;
  width: 100%;
  & h4 {
    margin-right: 4.3rem;
  }
`;
const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
const ContentTextarea = styled.textarea`
  width: 100%;
  height: 300px;
  text-align: left;
`;

const AttachFile = styled.div`
  display: flex;
  flex-direction: columns;
`;
const FileContainer = styled.div`
  display: flex;
  width: 100%;
`;
const AttachFileDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
const FileBox = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
  border-radius: 4px;
  width: 100%;
`;
const FileName = styled.div`
  display: flex;
  align-items: center;
`;
const FileDelet = styled.button`
  margin-left: 10px;
  background-color: transparent;
  outline: 0;
  border: 0;
`;
const FileLabel = styled.label`
  display: inline-block;
  padding: 3px 2px;
  margin-right: 2.2rem;
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
`;
const QnaCharacterPosition = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;
const QnaCharacter = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  & img {
  }
`;
export default Qna;
