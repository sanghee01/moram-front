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
  const [categoryButton, setCategoryButton] = useState("");

  const CategoryButtonClick = (buttonText: string) => {
    setCategoryButton(buttonText);
    const buttonNumber =
      [
        "계정 문의",
        "서비스 문의",
        "어찌고 문의",
        "저찌고 문의",
        "개선 사항",
      ].indexOf(buttonText) + 1;
    console.log(`${buttonText}`);
  };
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
      const imageFiles: FileInfo[] = selectedFiles
        .filter((file) => file.type.startsWith("image"))
        .map((file) => ({
          id: generateId(),
          file: file,
        }));
      if (imageFiles.length > 0) {
        setFiles([imageFiles[0]]);
      } else {
        alert("이미지 파일만 업로드 가능합니다.");
      }
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
            <button
              className={categoryButton === "계정 문의" ? "active" : ""}
              onClick={() => CategoryButtonClick("계정 문의")}
            >
              계정 문의
            </button>
            <button
              className={categoryButton === "서비스 문의" ? "active" : ""}
              onClick={() => CategoryButtonClick("서비스 문의")}
            >
              서비스 문의
            </button>
            <button
              className={categoryButton === "어찌고 문의" ? "active" : ""}
              onClick={() => CategoryButtonClick("어찌고 문의")}
            >
              어찌고 문의
            </button>
            <button
              className={categoryButton === "저찌고 문의" ? "active" : ""}
              onClick={() => CategoryButtonClick("저찌고 문의")}
            >
              저찌고 문의
            </button>
            <button
              className={categoryButton === "개선 사항" ? "active" : ""}
              onClick={() => CategoryButtonClick("개선 사항")}
            >
              개선 사항
            </button>
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
  background-color: #f6f6f6;
  border-radius: 25px;
`;
const QnaCategory = styled.div`
  display: flex;
  gap: 1%;
  padding: 0 2%;
  justify-content: space-between;
  & button {
    width: 115px;
    height: 45px;
    font-size: 15px;
    font-weight: 470;
    weight: 500;
    background-color: white;
    outline: 0;
    border: transparent;
    border-radius: 15px;
  }
  & button:hover {
    cursor: pointer;
    background-color: #d6d6ff;
  }
  & button.active {
    background-color: #6c6ce3;
    color: white;
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
  margin-top: 2.6rem;
  margin-bottom: 0.1rem;
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
  border: 1px solid rgba(0, 0, 0, 0.5);
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 15px;
  resize: none;
`;

const AttachFile = styled.div`
  display: flex;
  flex-direction: columns;
  height: 40px;
`;
const FileContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 1.8rem;
  justify-content: space-between;
`;
const AttachFileDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const FileBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid gray;
  border-radius: 10px;
  background-color: white;
  width: 507px;
  padding: 0.2rem 0.6rem;
`;
const FileName = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
const FileDelet = styled.button`
  margin-left: 10px;
  background-color: transparent;
  outline: 0;
  border: 0;
  font-size: 15px;
  color: gray;
`;
const FileLabel = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 50px;
  font-weight: 530;
  font-size: 14px;
  background-color: #dbdbdb;
  border-radious: 10px;
  border-radius: 15px;
  cursor: pointer;
`;
export default Qna;