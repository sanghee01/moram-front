import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
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
  const [isSubmitted, setIsSubmitted] = useState(false);

  const CategoryButtonClick = (buttonText: string) => {
    setCategoryButton(buttonText);
    const buttonNumber =
      ["계정 문의", "개선 사항", "궁금한 점", "오류 신고", "기타"].indexOf(
        buttonText
      ) + 1;
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

  // const fileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files) {
  //     const selectedFiles = Array.from(event.target.files);
  //     const imageFiles: FileInfo[] = selectedFiles
  //       .filter((file) => file.type.startsWith("image"))
  //       .map((file) => ({
  //         id: generateId(),
  //         file: file,
  //       }));
  //     if (imageFiles.length > 0) {
  //       setFiles([imageFiles[0]]);
  //     } else {
  //       alert("이미지 파일만 업로드 가능합니다.");
  //     }
  //   }
  // };
  // const RemoveFile = (id: string) => {
  //   const updatedFiles = files.filter((file) => file.id !== id);
  //   setFiles(updatedFiles);
  // };

  const handleSubmit = async () => {
    setIsSubmitted(true);
    console.log("전송");
    const response = await axios.post(
      `${process.env.REACT_APP_APIADDRESS}/user/ask`,
      {
        category: categoryButton,
        email: emailValue,
        title: titleValue,
        content: contentValue,
      }
    );
    console.log(response.data);
    alert(response?.data.message);
  };
  return (
    <Container>
      <QnaTtilePosition>
        <QnaTitle>
          <h2>
            <Span1>문의사항</Span1>은 <Span2>여기</Span2>에 남겨주세요.
          </h2>
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
              className={categoryButton === "개선 사항" ? "active" : ""}
              onClick={() => CategoryButtonClick("개선 사항")}
            >
              개선 사항
            </button>
            <button
              className={categoryButton === "궁금한 점" ? "active" : ""}
              onClick={() => CategoryButtonClick("궁금한 점")}
            >
              궁금한 점
            </button>
            <button
              className={categoryButton === "요류 신고" ? "active" : ""}
              onClick={() => CategoryButtonClick("오류 신고")}
            >
              오류 신고
            </button>
            <button
              className={categoryButton === "기타" ? "active" : ""}
              onClick={() => CategoryButtonClick("기타")}
            >
              기타
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
          {/* <AttachFile>
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
          </AttachFile> */}
          <ContentDiv>
            <h4>Message</h4>
            <ContentTextarea
              placeholder="우선 접수된 문의 건부터 순차적으로 답변해드리겠습니다. 문의 유형을 선택해 주시고 문의 내용을 입력해주시면 됩니다. 답장을 1~3일 소요 될 수 있음을 미리 알립니다."
              value={contentValue}
              onChange={ContentInput}
            />
          </ContentDiv>
          <SendButton>
            <div></div>
            <button onClick={handleSubmit}>전송</button>
            <button onClick={() => window.location.reload()}>취소</button>
          </SendButton>
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
  margin: 0 4rem;
  margin-bottom: 1rem;
  padding: 2rem 12%;
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
    height: 50px;
    font-size: 15px;
    font-weight: 500;
    background-color: white;
    outline: 0;
    border: transparent;
    border-radius: 15px;
    transition: background-color 0.7s ease;
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
  justify-content: center;
  align-items: center;
  margin-top: 1.6rem;
  font-size: 1.5rem;
  width: 100%;
  height: 80px;
  border-radius: 15px;
  @media screen and (max-width: 800px) {
    & h2 {
      font-size: 1.8rem;
    }
  }
`;
const Span1 = styled.span`
  font-size: 40px;
  font-weight: 600;
  color: #134478;
  @media screen and (max-width: 700px) {
    & {
      font-size: 36px;
    }
  }
`;
const Span2 = styled.span`
  font-size: 36px;
  color: #6c6ce3;
  @media screen and (max-width: 700px) {
    & {
      font-size: 24spx;
    }
  }
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
  gap: 0.2rem;
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
  padding: 1rem;
`;

// const AttachFile = styled.div`
//   display: flex;
//   flex-direction: columns;
//   height: 40px;
// `;
// const FileContainer = styled.div`
//   display: flex;
//   width: 100%;
//   gap: 1.8rem;
//   justify-content: space-between;
// `;
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
// const FileName = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   text-overflow: ellipsis;
//   overflow: hidden;
//   white-space: nowrap;
// `;
// const FileDelet = styled.button`
//   margin-left: 10px;
//   background-color: transparent;
//   outline: 0;
//   border: 0;
//   font-size: 15px;
//   color: gray;
// `;
// const FileLabel = styled.label`
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
//   width: 70px;
//   height: 50px;
//   font-weight: 530;
//   font-size: 14px;
//   background-color: #dbdbdb;
//   border-radius: 15px;
//   cursor: pointer;
// `;
const SendButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  gap: 0.6rem;
  & button {
    outline: 0;
    border: transparent;
    background-color: #8080ee;
    color: white;
    border-radius: 12px;
    width: 30%;
    height: 40px;
    font-weight: 600;
    font-size: 18px;
    transition: background-color 0.5s ease;
  }
  & button:hover {
    cursor: pointer;
    background-color: #b9b9f7;
  }
`;

export default Qna;
