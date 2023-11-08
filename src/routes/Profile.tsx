import  styled  from "styled-components";
import { IoSettingsOutline } from "react-icons/io5";
import { PiListBold } from "react-icons/pi";
import { AiOutlinePicture } from "react-icons/ai";
import { BiText } from "react-icons/bi";
import React, { useState ,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface ChooseContentProps {
  src: string;
  category: string;
  title: string;
  date: string;
  content: string;
  selectIcon: "all" | "picture" | "letter";
}

function ChooseContent({
  src,
  category,
  title,
  date,
  content,
  selectIcon
}: ChooseContentProps) {
  return (
    <Content>
      {selectIcon === "all" && (
        <>
          <img src={src} alt="이미지" />
          <section>
            <div>
              <span>
                [{category}] {title}
              </span>
              <span>2023-11-08 15:30:53</span>
            </div>
            <p>{content}</p>
          </section>
        </>
      )}
      {selectIcon === "picture" && <img src={src} alt="이미지" />}
      {selectIcon === "letter" && (
        <section>
          <div>
            <span>
              [{category}] {title}
            </span>
            <span>2023-11-08 15:30:53</span>
          </div>
          <p>{content}</p>
        </section>
      )}
    </Content>
  );
}

function Profile() {
  const [selectIcon, setSelectIcon] = useState<"all" | "picture" | "letter">(
    "all"
  );
  const [selectedTab, setSelectedTab] = useState<"posts" | "comments">("posts");

  //백엔드에서 불러올때
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("http://your-backend-url/posts")
      .then((response) => {
        setPosts(response.data); // 받아온 데이터를 state에 저장
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  //백엔드 아직 불러오지x
  const onClickIcon = (iconType: "all" | "picture" | "letter") => {
    setSelectIcon(iconType);
  };

  const navigate = useNavigate();

  const onClickWritePost = () => {
    setSelectedTab("posts");
    console.log("작성한 글 버튼이 클릭되었습니다.");
  };
  const onClickWriteComment = () => {
    setSelectedTab("comments");
    console.log("댓글 단 글 버튼이 클릭되었습니다.");
  };

  const onClickAllIcon = () => {
    setSelectIcon("all");
  };

  const onClickPictureIcon = () => {
    setSelectIcon("picture");
  };

  const onClickLetterIcon = () => {
    setSelectIcon("letter");
  };


  return (
    <MainContainer>
      <ProfileMain>
        <ProfileContainer>
          <img src="./assets/profileimage.jpg" />
          <Container>
            <ProfileInpromation>
              <InformationBox>
                <ProfileContent>
                  <SettingIcon onClick={() => navigate("/profile-edit")}>
                    <IoSettingsOutline size="20" />
                  </SettingIcon>
                  <h1>쿼카맹구</h1>
                  <h4>dlrhdns0000@naver.com</h4>
                </ProfileContent>
                <ProfileWrite>
                  <button onClick={onClickWritePost}>작성한 글</button>
                  <button onClick={onClickWriteComment}>댓글 단 글</button>
                </ProfileWrite>
              </InformationBox>
            </ProfileInpromation>
          </Container>
        </ProfileContainer>
      </ProfileMain>
      <ChooseIcon>
        <ChooseAllIcon
          onClick={onClickAllIcon}
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
          onClick={onClickPictureIcon}
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
          onClick={onClickLetterIcon}
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
      
      {selectedTab === "posts" && (
<ChooseContentBox selectIcon={selectIcon}>
       {/*  백엔드에서 데이터 불러올때
      {posts.map((post, index) => (
      <ChooseContent
        key={index}
        src={post.imageSrc}
        category={post.category}
        title={post.title}
        date={post.date}
        content={post.content}
        selectIcon={selectIcon}
      />
    ))} */}
        <ChooseContent
          src="https://react.dev/images/home/conf2021/cover.svg"
          category="스터디"
          title="React 스터디 구합니다"
          date="2023.10.10."
          content="React 기초부터 같이 학습하실 분 구합니다. 어느정 프로젝트도 할 예정입니다."
          selectIcon={selectIcon}
        />
        <ChooseContent
          src="https://react.dev/images/home/conf2021/cover.svg"
          category="스터디"
          title="React 스터디 구합니다"
          date="2023.10.10."
          content="React 기초부터 같이 학습하실 분 구합니다. 어느정 로젝트도 할 예정입니다."
          selectIcon={selectIcon}
        />
        <ChooseContent
          src="https://react.dev/images/home/conf2021/cover.svg"
          category="스터디"
          title="React 스터디 구합니다"
          date="2023.10.10."
          content="React 기초부터 같이 학습하실 분 구합니다. 어느정 로젝트도 할 예정입니다."
          selectIcon={selectIcon}
        />
        <ChooseContent
          src="https://react.dev/images/home/conf2021/cover.svg"
          category="스터디"
          title="React 스터디 구합니다"
          date="2023.10.10."
          content="React 기초부터 같이 학습하실 분 구합니다. 어느정 로젝트도 할 예정입니다."
          selectIcon={selectIcon}
        />
        <ChooseContent
          src="https://react.dev/images/home/conf2021/cover.svg"
          category="스터디"
          title="React 스터디 구합니다"
          date="2023.10.10."
          content="React 기초부터 같이 학습하실 분 구합니다. 어느정 로젝트도 할 예정입니다."
          selectIcon={selectIcon}
        />
        
      </ChooseContentBox>
      )}
      
      {selectedTab === "comments" && <p>여기는 내가 댓글 단 글이 보여요요용</p>}
    </MainContainer>
  );
}


const MainContainer = styled.div`
display: flex;
flex-direction: column;
width: 58%;
justify-content: center;
margin: auto;
margin-top: 1.5rem;
`; 

const ProfileMain = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 1.5rem 0;
  & section {
    display: flex;
    width: 100%;
  }
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
  }
  @media screen and (max-width: 800px) {
    & img {
      width: 125px;
      height: 125px;
    }
  }
`;

const ProfileContainer = styled.div`
display: flex;
width: 100%;
`; 
const Container = styled.div`
  display: flex;
  width: 100%;
`;
const ProfileInpromation = styled.div`
  padding-left: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 1000px) {
    & h1 {
      font-size: 30px;
    }
    & h4 {
      font-size: 16px;
    }
  }
  @media screen and (max-width: 800px) {
    & h1 {
      font-size: 25px;
    }
    & h4 {
      font-size: 11px;
    }
  }
  @media screen and (max-width: 600px) {
    & h1 {
      font-size: 22px;
    }
    & h4 {
      font-size: 9px;
    }
  }
`;
const ProfileContent = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
width: 300px;
 @media screen and (max-width: 600px) {
    & h1 {
      font-size: 22px;
    }
    & h4 {
      font-size: 9px;
    }
  }
`;

const InformationBox = styled.div`
display: flex;
  justify-content: space-between; 
  width: 100%; 
  gap: 0.8rem;
  @media screen and (max-width: 1400px) {
    flex-direction: column;
    justify-content: center; 
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
  width: 75%;
  align-items: center;
  gap: 0.5rem;
  & button {
  background-color: transparent;
  font-size: 15px;
  outline: 0;
  border: 0;
  background-color: #e6e6e6d6;
  width: 100%;
  height: 35px;
  border-radius: 8px;
  gap: 0.2rem;
  }
  @media screen and (max-width: 1000px) {
    & button {
      width: 160px;
      height: 30px;
    }
  }
  @media screen and (max-width: 800px) {
    & button {
      width: 130px;
      height: 30px;
      font-size: 13px;
    }
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
    width: 217px;
    height: 217px;
    object-fit: cover;
    border-radius: 8px;
  }
  @media screen and (max-width: 1150px) {
    & img {
      width: 125px;
      height: 125px;
    }
  }
  @media screen and (max-width: 800px) {
    & img {
      width: 100px;
      height: 100px;
    }
  }
  @media screen and (max-width: 600px) {
    & img {
      width: 60px;
      height: 60px;
    }
  }
`;
type BoxProps = {
  selectIcon: "all" | "picture" | "letter";
};

const ChooseContentBox = styled.div<BoxProps>`
  display: flex;
  flex-direction: ${props => (props.selectIcon === "picture" ? "row" : "column")};
  flex-wrap: ${props => (props.selectIcon === "picture" ? "wrap" : "nowrap")};
  justify-content: start;
  gap:0.2rem;
`;



export default Profile;
