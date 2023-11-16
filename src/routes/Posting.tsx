import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Input } from "../styles/LoginStyles";
import { SmallBtn } from "../styles/ButtonStyles";
import { useRecoilValue } from "recoil";
import { userState } from "../state";
import { BsReplyFill } from "react-icons/bs";
import { LuDelete } from "react-icons/lu";
import { handleDateChange } from "../dateChange";
import ProfilePhoto from "../components/ProfilePhoto";
import { FiRefreshCcw } from "react-icons/fi";
import { Tag, Category } from "../styles/Tag_CatagoryStyles";

function Posting() {
  const params = useParams();
  const navigate = useNavigate();
  const postId = params.id;
  const [posting, setPosting] = useState<null | any>(null); //게시글 정보들
  const [comments, setComments] = useState<null | any>(null); //받아온 댓글들
  const [commentContent, setCommentContent] = useState(""); //댓글 input 내용
  const [replyId, setReplyId] = useState<null | Number>(null); //답글할 id
  const [replyNickname, setReplyNickname] = useState<null | String>(null); //답글할 닉네임
  const [replyComment, setReplyComment] = useState<null | String>(null); //답글할 댓글 내용
  const [isLiked, setIsLiked] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportText, setReportText] = useState("");
  const user = useRecoilValue(userState);
  const inputRef = useRef<any>(null);
  const location = useLocation();

  useEffect(() => {
    getPosting();
    getComments();
    console.log("location ->", location);
  }, [location]);

  useEffect(() => {
    if (user) getLike();
  }, [user, location]);
  const onChange = (e: any) => {
    setCommentContent(e.target.value);
  };

  const getPosting = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_APIADDRESS}/posting/${postId}`
      );
      const postData = response.data.content;
      postData.content = postData.content.split("<br/>").join("\n");
      setPosting(postData); //포스팅 데이터 받기
    } catch (error: any) {
      alert(error?.response?.data?.message || "알 수 없는 에러 발생.");
    }
  };

  const deletePosting = async () => {
    let endPoint = "";
    if (user.role === "user") endPoint = `posting/${postId}`;
    else if (user.role === "admin") endPoint = `admin/posting/${postId}`;
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_APIADDRESS}/${endPoint}`
      );
      if (user.role === "user") alert(response.data.message);
      else if (user.role === "admin")
        alert(`[어드민] ${response.data.message}`);
      navigate("/community?reload=true");
    } catch (error: any) {
      if (user.role === "user")
        alert(error?.response?.data?.message || "알 수 없는 에러 발생.");
      else if (user.role === "admin")
        alert(
          `[어드민] ${error?.response?.data?.message}` ||
            "알 수 없는 에러 발생."
        );
    }
  };

  const getComments = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_APIADDRESS}/comment/${postId}`
      );
      setComments(response.data.content); //포스팅 데이터 받기
    } catch (error: any) {
      alert(error?.response?.data?.message || "알 수 없는 에러 발생.");
    }
  };

  const deleteComment = async (commentId: any) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_APIADDRESS}/comment/${commentId}`
      );
      alert(response.data.message);
      getComments();
    } catch (error: any) {
      alert(error?.response?.data?.message || "알 수 없는 에러 발생.");
    }
  };

  const getLike = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_APIADDRESS}/like/${postId}`
      );
      setIsLiked(response.data.content.isLiked); //좋아요 여부
    } catch (error: any) {
      console.error(error?.response?.data?.message || "알 수 없는 에러 발생.");
    }
  };

  const postLike = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_APIADDRESS}/like/${postId}`
      );
      setIsLiked(response.data.content.isLiked);
      setPosting((prev: any) => ({
        ...prev,
        likesCount: response.data.content.likesCount,
      }));
    } catch (error: any) {
      alert(error?.response?.data?.message || "알 수 없는 에러 발생.");
      console.error(error?.response?.data?.message || "알 수 없는 에러 발생.");
    }
  };

  const postComment = async () => {
    if (commentContent.length < 1) return;
    if (!user) return;
    try {
      let api;
      !replyId
        ? (api = `${process.env.REACT_APP_APIADDRESS}/comment/${postId}`)
        : (api = `${process.env.REACT_APP_APIADDRESS}/comment/${postId}?parentId=${replyId}`);
      const response = await axios.post(`${api}`, {
        content: commentContent,
      });
      setCommentContent("");
      getComments();
      setReplyId(null);
      setReplyNickname(null);
      setReplyComment(null);
      alert(response.data.message); //포스팅 데이터 받기
    } catch (error: any) {
      alert(error?.response?.data?.message || "알 수 없는 에러 발생.");
    }
  };

  const postReport = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_APIADDRESS}/posting/report/${postId}`,
        { reason: reportText }
      );
      if (response.data) {
        alert(response.data.message);
        setReportText("");
        setIsReportOpen(false);
      }
    } catch (error: any) {
      alert(error?.response?.data?.message || "알 수 없는 에러 발생.");
      console.error(error?.response?.data?.message || "알 수 없는 에러 발생.");
    }
  };

  const reply = (commentId: any) => {
    const replies = comments.filter(
      (comments: any) => comments.parentId === commentId
    );
    if (replies) return replies;
  };

  return (
    <Container>
      <FormContainer>
        {posting ? (
          <>
            <h2>
              <div>
                <Category>{posting.category}</Category> <Tag>{posting.tag}</Tag>
              </div>
              {posting.title}
            </h2>
            <h4>
              <div style={{ display: "flex", alignItems: "center" }}>
                <ProfilePhoto name={posting.profileImg} />
                {posting.nickname} | ❤️{posting.likesCount} 👀{posting.hitCount}{" "}
                💬
                {posting.commentCount} | {handleDateChange(posting.writeTime)}{" "}
              </div>
              {(posting.userId === user?.id || user?.role === "admin") && (
                <>
                  <SmallBtn
                    $padding="4px 10px"
                    $margin="5px"
                    $background="tomato"
                    $backgroundHover="red"
                    $color="white"
                    onClick={() => deletePosting()}
                  >
                    글 삭제
                  </SmallBtn>
                  {posting.userId === user?.id && (
                    <SmallBtn
                      $padding="4px 10px"
                      $margin="5px"
                      $background="skyblue"
                      $backgroundHover="lightblue"
                      $color="white"
                      onClick={() =>
                        navigate(`/write/${posting.id}`, {
                          state: posting,
                        })
                      }
                    >
                      글 수정
                    </SmallBtn>
                  )}
                </>
              )}
            </h4>
            <hr />
            <ContentText>{posting.content}</ContentText>
            <Img src={posting.img1Url} />
            <Img src={posting.img2Url} />
            <Img src={posting.img3Url} />
            <BtnContainer>
              <LikeBtn $isLiked={isLiked} onClick={() => postLike()}>
                ❤️ {posting.likesCount}
              </LikeBtn>
              <ReportBtn onClick={() => setIsReportOpen((prev) => !prev)}>
                🚨
              </ReportBtn>
            </BtnContainer>
            {isReportOpen && (
              <InputContainer>
                <CommentInput
                  // ref={inputRef}
                  onChange={(e) => setReportText(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") postReport();
                  }}
                  placeholder="신고할 내용을 요약해 주세요."
                  value={reportText}
                />
                <Btn
                  onClick={() => postReport()}
                  style={
                    user ? { background: "orange" } : { background: "gray" }
                  }
                >
                  {user ? "전송" : "로그인 필요"}
                </Btn>
              </InputContainer>
            )}

            <hr />
            <Row>
              댓글 {posting.commentCount}{" "}
              <FiRefreshCcw onClick={() => getComments()} />
            </Row>
            {replyId && (
              <ReplyText
                onClick={() => {
                  setReplyId(null);
                  setReplyNickname(null);
                  setReplyComment(null);
                }}
              >
                <div>
                  <BsReplyFill fill="white" /> &nbsp;[@{replyNickname} :{" "}
                  {replyComment}] 에게 답글을 남기는 중... &nbsp;&nbsp;
                  <LuDelete stroke="white" size="20" />
                </div>
              </ReplyText>
            )}
            <InputContainer>
              <CommentInput
                ref={inputRef}
                onChange={onChange}
                onKeyUp={(e) => {
                  if (e.key === "Enter") postComment();
                }}
                value={commentContent}
              />
              <Btn
                onClick={() => postComment()}
                style={user || { background: "gray " }}
              >
                {user ? "작성" : "로그인 필요"}
              </Btn>
            </InputContainer>
          </>
        ) : (
          <h1>Loading...</h1>
        )}
        {comments ? (
          comments.map((comment: any) =>
            !comment.parentId ? (
              <CommentContainer
                key={comment.id}
                onClick={() => {
                  setReplyId(comment.id);
                  setReplyNickname(comment.nickname);
                  setReplyComment(comment.content);
                  inputRef.current.focus();
                }}
              >
                <>
                  <Comment>
                    <div
                      style={{
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <ProfilePhoto name={comment.profileImg} />
                      {comment.nickname}
                      {user?.id === comment.userId && (
                        <SmallBtn
                          $padding="4px 10px"
                          $margin="0 8px"
                          $background="tomato"
                          $backgroundHover="red"
                          $color="white"
                          onClick={(e: any) => {
                            e.stopPropagation();
                            deleteComment(comment.id);
                          }}
                        >
                          삭제
                        </SmallBtn>
                      )}
                    </div>{" "}
                    {comment.content}{" "}
                    <div style={{ color: "gray" }}>
                      {handleDateChange(comment.writeTime)}
                    </div>
                  </Comment>
                  {reply(comment.id).map((reply: any) => (
                    <Comment key={reply.id} $marginL={"15px"}>
                      <div
                        style={{
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        ㄴ&nbsp;
                        <ProfilePhoto name={reply.profileImg} />
                        {reply.nickname}
                        {user?.id === reply.userId && (
                          <SmallBtn
                            $padding="3px 10px"
                            $margin="0 8px"
                            $background="tomato"
                            $backgroundHover="red"
                            $color="white"
                            onClick={(e: any) => {
                              e.stopPropagation();
                              deleteComment(comment.id);
                            }}
                          >
                            삭제
                          </SmallBtn>
                        )}
                      </div>{" "}
                      {reply.content}
                      <div style={{ color: "gray" }}>
                        {handleDateChange(reply.writeTime)}
                      </div>
                    </Comment>
                  ))}
                </>
              </CommentContainer>
            ) : null
          )
        ) : (
          <div>댓글 로딩 중...</div>
        )}
      </FormContainer>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: calc(100dvh - var(--headerHeight) - var(--footerHeight));
`;

const FormContainer = styled.div`
  width: calc(100% - 30px);
  max-width: 900px;
  height: auto;
  padding: 15px;
  margin: 20px auto;
  background-color: whitesmoke;
  border-radius: 15px;

  & h2 {
    display: flex;
    gap: 10px;
    align-items: center;

    & div {
      display: flex;
      gap: 7px;
      & div {
        font-size: 1.1rem;
      }
    }
  }

  @media screen and (max-width: 700px) {
    & h2 {
      flex-direction: column;
      align-items: normal;
    }
  }
`;

const Img = styled.img`
  border-radius: 30px;
  margin: 20px 0;
`;

const CommentInput = styled(Input)`
  width: 50%;
  flex-grow: 3;
  margin: 0;
  padding: 0 15px;
`;

const InputContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  gap: 10px;
  margin: 10px 0;
`;

const Btn = styled(SmallBtn)<any>`
  background-color: skyblue;
  height: 100%;
  padding: 0 20px;
`;

const CommentContainer = styled.div`
  transition: 0.5s all;
  border-radius: 15px;
  padding: 10px 15px;

  &:hover {
    cursor: pointer;
    background-color: white;
  }
`;

const ReplyText = styled.div`
  display: inline-block;
  margin-top: 3px;
  & div {
    width: auto;
    flex-shrink: 1;
    color: white;
    background-color: #6d6dff;
    padding: 5px 15px;
    border-radius: 10px;
    transition: 0.5s all;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & div:hover {
    cursor: pointer;
    background-color: #4949fd;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
  margin: 10px 0;
`;

const ReportContainer = styled.div`
  display: flex;
`;

const LikeBtn = styled(SmallBtn)<any>`
  background-color: ${(props) => (props.$isLiked ? "#fc8989" : "#fcd8d8")};
  color: ${(props) => (props.$isLiked ? "white" : "black")};
  width: 80px;
  height: 45px;
  padding: 0;
  &:hover {
    background-color: #ff7c7c;
  }
`;

const ReportBtn = styled(SmallBtn)`
  font-size: 1.5rem;
  width: 80px;
  height: 45px;
  padding: 0;
  background-color: #9c9c9c;
  &:hover {
    background-color: #fa9363;
  }
`;

const ContentText = styled.div`
  display: flex;
  white-space: pre-wrap;
  margin-top: 10px;
`;
const Comment = styled.div<any>`
  font-size: 1rem;
  margin: 5px 0;
  margin-left: ${(props) => props.$marginL || 0};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.3rem;
  font-weight: bolder;

  & *:hover {
    cursor: pointer;
  }
`;
export default Posting;
