import { styled } from "styled-components";
import { IoSettingsOutline } from "react-icons/io5";
import { PiListBold } from "react-icons/pi";
import { AiOutlinePicture } from "react-icons/ai";
import { BiText } from "react-icons/bi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ChooseContentProps {
  src: string;
  category: string;
  title: string;
  date: string;
  content: string;
}

function ChooseContent({
  src,
  category,
  title,
  date,
  content,
}: ChooseContentProps) {
  return (
    <Content>
      <img src={src} alt="이미지" />
      <section>
        <div>
          <span>
            [{category}] {title}
          </span>
          <span>{date}</span>
        </div>
        <p>{content}</p>
      </section>
    </Content>
  );
}

function Profile() {
  const [selectIcon, setSelectIcon] = useState<"all" | "picture" | "letter">(
    "all"
  );

  const onClickIcon = (iconType: "all" | "picture" | "letter") => {
    setSelectIcon(iconType);
  };

  const navigate = useNavigate();

  return (
    <Container>
      <ProfileMain>
        <img src="./assets/profileimage.jpg" />
        <ProfileInpromation>
          <SettingIcon onClick={() => navigate("/profile-edit")}>
            <IoSettingsOutline size="20" />
          </SettingIcon>
          <h1>쿼카맹구</h1>
          <h4>dlrhdns0000@naver.com</h4>
        </ProfileInpromation>
        <ProfileWrite>
          <Write>작성한 글</Write>
          <Comment>댓글 단 글</Comment>
        </ProfileWrite>
      </ProfileMain>
      <ChooseIcon>
        <ChooseAllIcon
          onClick={() => onClickIcon("all")}
          style={
            selectIcon === "all" ? { borderBottom: "2px solid #343434" } : {}
          }
        >
          <PiListBold
            size="30"
            color={selectIcon === "all" ? "black" : "#787878"}
          />
        </ChooseAllIcon>
        <ChoosePictureIcon
          onClick={() => onClickIcon("picture")}
          style={
            selectIcon === "picture"
              ? { borderBottom: "2px solid #343434" }
              : {}
          }
        >
          <AiOutlinePicture
            size="30"
            color={selectIcon === "picture" ? "black" : "#787878"}
          />
        </ChoosePictureIcon>
        <ChooseLetterIcon
          onClick={() => onClickIcon("letter")}
          style={
            selectIcon === "letter" ? { borderBottom: "2px solid #343434" } : {}
          }
        >
          <BiText
            size="30"
            color={selectIcon === "letter" ? "black" : "#787878"}
          />
        </ChooseLetterIcon>
      </ChooseIcon>
      <ChooseContentBox>
        <ChooseContent
          src="https://react.dev/images/home/conf2021/cover.svg"
          category="스터디"
          title="React 스터디 구합니다"
          date="2023.10.10."
          content="React 기초부터 같이 학습하실 분 구합니다. 어느정
    프로젝트도 할 예정입니다."
        />
        <ChooseContent
          src="https://react.dev/images/home/conf2021/cover.svg"
          category="스터디"
          title="React 스터디 구합니다"
          date="2023.10.10."
          content="React 기초부터 같이 학습하실 분 구합니다. 어느정
로젝트도 할 예정입니다."
        />
        <ChooseContent
          src="https://react.dev/images/home/conf2021/cover.svg"
          category="스터디"
          title="React 스터디 구합니다"
          date="2023.10.10."
          content="React 기초부터 같이 학습하실 분 구합니다. 어느정
로젝트도 할 예정입니다."
        />
      </ChooseContentBox>
    </Container>
  );
}

const Container = styled.div`
  width: 60%;
  height: 100vh;
  margin: auto;
`;

const ProfileMain = styled.div`
  display: flex;
  height: 10rem;

  align-items: center;

  margin: 1.5rem 0;
  & img {
    border-radius: 100%;
    width: 165px;
    height: 165px;
  }

  @media screen and (max-width: 1000px) {
    & img {
      width: 150px;
      height: 150px;
    }
    & div {
      flex-direction: column;
      gap: 0;
    }
  }
  @media screen and (max-width: 800px) {
    & img {
      width: 125px;
      height: 125px;
    }
  }
`;

const ProfileInpromation = styled.div`
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media screen and (max-width: 800px) {
    & h1 {
      font-size: 28px;
    }
    & h4 {
      font-size: 13px;
    }
  }
`;

const SettingIcon = styled.button`
  background-color: transparent;
  outline: 0;
  border: 0;
  width: 20px;
  height: 20px;
  padding: 0;
  @media screen and (max-width: 800px) {
    size: 10px;
  }
`;

const ProfileWrite = styled.div`
  display: flex;
  justify-content: space-between;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

const Write = styled.button`
  background-color: transparent;
  outline: 0;
  border: 0;
  background-color: #e6e6e6d6;
  min-width: 200px;
  width: 50%;

  height: 35px;
  border-radius: 8px;
  @media screen and (max-width: 1000px) {
    margin-bottom: 10px;
    width: 200px;
  }
  @media screen and (max-width: 800px) {
    margin-bottom: 10px;
    width: 170px;
    font-size: 15px;
  }
`;

const Comment = styled.button`
  background-color: transparent;
  outline: 0;
  border: 0;
  background-color: #e6e6e6d6;
  min-width: 200px;
  width: 50%;
  height: 35px;
  border-radius: 8px;
  @media screen and (max-width: 1000px) {
    width: 200px;
  }
  @media screen and (max-width: 800px) {
    width: 170px;
    font-size: 15px;
  }
`;

const ChooseIcon = styled.div`
  grid: 0;
  display: flex;
  justify-content: center;
  padding: 0;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
`;

const ChooseAllIcon = styled.button`
  background-color: transparent;
  outline: 0;
  border: 0;
  width: 346px;
`;

const ChoosePictureIcon = styled.button`
  background-color: transparent;
  outline: 0;
  border: 0;
  width: 346px;
`;
const ChooseLetterIcon = styled.button`
  background-color: transparent;
  outline: 0;
  border: 0;
  width: 346px;
`;

const Content = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 10px;
  & img {
    width: 200px;
    height: 200px;
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
`;

const ChooseContentBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Profile;
