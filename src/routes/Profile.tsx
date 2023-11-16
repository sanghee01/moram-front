import styled from "styled-components";
import { IoSettingsOutline } from "react-icons/io5";
import { MdBuildCircle } from "react-icons/md";
import MyPost from "../components/Profile/MyPost";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyComment from "../components/Profile/MyComment";
import { handleDateChange } from "../dateChange";
import { useRecoilValue } from "recoil";
import { userState } from "../state";

function Profile() {
  const [posts, setPosts] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [profileImg, setProfileImg] = useState("");
  const [nickname, setNickname] = useState("");
  const [school, setSchool] = useState("");
  const [email, setEmail] = useState("");
  const [showPosts, setShowPosts] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const user = useRecoilValue(userState);

  useEffect(() => {
    getMyData();
  }, [profileImg]);

  const getMyData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_APIADDRESS}/profile`
      );
      console.log("sdkflskdf", profileImg);
      console.log("response data: ", response.data);
      console.log("img", response.data.img);
      setProfileImg(response.data.img);
      setNickname(response.data.nickname);
      setEmail(response.data.email);
      setSchool(response.data.univName);

      setPosts(response.data.posting);
      setComments(response.data.comment);

      setLoading(false);

      console.log("posting", response.data.posting);
      console.log("comment", response.data.comment);
    } catch (error: any) {
      console.error(error?.response?.data?.message || "알 수 없는 에러 발생");
      alert(error.response.data);
    }
  };

  const navigate = useNavigate();
  return (
    <MainContainer>
      <ProfileContainer>
        <img src={`./assets/profileselectimage/${profileImg}.jpg`} />
        <Container>
          <ProfileInpromation>
            <InformationBox>
              <ProfileContent>
                <SettingIcon>
                  <IoSettingsOutline
                    size="20"
                    onClick={() => navigate("/profile-edit")}
                  />
                  {user?.role === "admin" && (
                    <MdBuildCircle
                      size="20"
                      onClick={() => navigate("/admin")}
                    />
                  )}
                </SettingIcon>

                <h2>{nickname}</h2>
                <h3>{school}</h3>
                <h4>{email}</h4>
              </ProfileContent>
              <ProfileWrite>
                <div
                  onClick={() => {
                    getMyData();
                    setShowPosts(true);
                    setShowComments(false);
                  }}
                >
                  작성한 글
                </div>
                <div
                  onClick={() => {
                    getMyData();
                    setShowPosts(false);
                    setShowComments(true);
                  }}
                >
                  작성한 댓글
                </div>
              </ProfileWrite>
            </InformationBox>
          </ProfileInpromation>
        </Container>
      </ProfileContainer>
      <Box>
        {showPosts && (
          <PostContentBox>
            {loading ? (
              <span>loading...</span>
            ) : posts?.length < 1 ? (
              <span>게시글이 없습니다.</span>
            ) : (
              posts
                ?.sort((a: any, b: any) => {
                  return b.id - a.id;
                })
                .map((item) => {
                  return (
                    <MyPost
                      key={item.id}
                      id={item.id}
                      nickname={item.nickname}
                      hitCount={item.hitCount}
                      likesCount={item.likesCount}
                      commentCount={item.commentCount}
                      img={item.img1Url}
                      category={item.category}
                      title={item.title}
                      date={handleDateChange(item.writeTime)}
                      content={item.content}
                      tag={item.tag}
                    />
                  );
                })
            )}
          </PostContentBox>
        )}
        {showComments && (
          <CommentBox>
            {loading ? (
              <span>loading...</span>
            ) : comments?.length < 1 ? (
              <span>게시글이 없습니다.</span>
            ) : (
              comments
                ?.sort((a: any, b: any) => {
                  return b.id - a.id;
                })
                .map((item) => {
                  return (
                    <MyComment
                      key={item.id}
                      postId={item.postId}
                      date={handleDateChange(item.writeTime)}
                      content={item.content}
                    />
                  );
                })
            )}
          </CommentBox>
        )}
      </Box>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3rem auto;
  width: 60%;

  & section {
    display: flex;
    width: 100%;
  }
  @media screen and (max-width: 1200px) {
    width: 75%;
  }
  @media screen and (max-width: 600px) {
    width: 90%;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 50px;

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

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const ProfileInpromation = styled.div`
  padding-left: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InformationBox = styled.div`
  display: flex;
  width: 100%;
  gap: 0.8rem;
  justify-content: space-between;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const SettingIcon = styled.button`
  display: flex;
  background-color: transparent;
  outline: 0;
  border: 0;
  padding: 0;
  gap: 5px;
`;

const ProfileWrite = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  & div {
    text-align: center;
    background-color: transparent;
    font-size: 1rem;

    font-weight: 600;
    outline: 0;
    border: 0;
    width: 200px;
    padding: 5px;
    background-color: #e6e6e6d6;
    border-radius: 10px;
  }
  & div:hover {
    filter: contrast(70%);
  }

  @media screen and (max-width: 800px) {
    & div {
      font-size: 0.8rem;

      width: 170px;
    }
  }
  @media screen and (max-width: 600px) {
    & div {
      width: 130px;
    }
  }
  @media screen and (max-width: 500px) {
    & div {
      width: 100px;
    }
  }
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const Box = styled.div`
  width: 100%;
  min-height: 100vh;
`;

export default Profile;
