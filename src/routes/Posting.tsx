import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Input } from "../styles/LoginStyles";
import { SmallBtn } from "../styles/ButtonStyles";
import { useRecoilValue } from "recoil";
import { userState } from "../state";

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
  const user = useRecoilValue(userState);

  useEffect(() => {
    getPosting();
    getComments();
  }, []);

  useEffect(() => {
    if (user) getLike();
  }, [user]);
  const onChange = (e: any) => {
    setCommentContent(e.target.value);
  };

  const getPosting = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_APIADDRESS}/posting/${postId}`
      );
      const postData = response.data;
      postData.content = postData.content.split("<br/>").join("\n");
      setPosting(postData); //포스팅 데이터 받기
    } catch (error: any) {
      alert(error.response.data);
    }
  };

  const deletePosting = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_APIADDRESS}/posting/${postId}`
      );
      alert(response.data.message);
      navigate("/community?reload=true");
    } catch (error: any) {
      alert(error.response.data);
    }
  };

  const getComments = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_APIADDRESS}/comment/${postId}`
      );
      setComments(response.data); //포스팅 데이터 받기
    } catch (error: any) {
      alert(error.response.data);
    }
  };

  const getLike = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_APIADDRESS}/like/${postId}`
      );
      setIsLiked(response.data.isLiked); //좋아요 여부
    } catch (error: any) {
      console.error(error.response.data.message);
    }
  };

  const postLike = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_APIADDRESS}/like/${postId}`
      );
      setIsLiked(response.data.isLiked);
      setPosting((prev: any) => ({
        ...prev,
        likesCount: response.data.likesCount,
      }));
    } catch (error: any) {
      console.error(error.response.data.message);
    }
  };

  const postComment = async () => {
    if (!user) return;
    try {
      let api;
      !replyId
        ? (api = `${process.env.REACT_APP_APIADDRESS}/comment/${postId}`)
        : (api = `${process.env.REACT_APP_APIADDRESS}/comment/${postId}?parentId=${replyId}`);
      const response = await axios.post(`${api}`, {
        content: commentContent,
      });
      alert(response.data.message); //포스팅 데이터 받기
      setCommentContent("");
      getComments();
      setReplyId(null);
      setReplyNickname(null);
      setReplyComment(null);
    } catch (error: any) {
      alert(error.response.data);
    }
  };

  /** 날짜 형식 변환 함수 */
  const date = (dateStr: string) => {
    const dateObj = new Date(dateStr);
    return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(dateObj.getDate()).padStart(2, "0")} ${String(
      dateObj.getHours()
    ).padStart(2, "0")}:${String(dateObj.getMinutes()).padStart(2, "0")}`;
  };

  const reply = (commentId: any) => {
    const replies = comments.filter(
      (comments: any) => comments.parentId === commentId
    );
    if (replies) return replies;
  };

  return (
    <Container>
      {posting ? (
        <>
          <h2>
            <span style={{ color: "gray" }}>
              [{posting.category}] [{posting.tag}]
            </span>{" "}
            {posting.title}
          </h2>
          <h4>
            {posting.nickname} | {date(posting.writeTime)}{" "}
            {posting.userId === user?.id && (
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
              </>
            )}
          </h4>
          <hr />
          <p>{posting.content}</p>
          <img src={posting.img1Url} />
          <img src={posting.img2Url} />
          <img src={posting.img3Url} />
          <BtnContainer>
            <LikeBtn $isLiked={isLiked} onClick={() => postLike()}>
              ❤️ {posting.likesCount}
            </LikeBtn>
            <ReportBtn>🚨</ReportBtn>
          </BtnContainer>
          <hr />

          <h2>댓글</h2>
          {replyId && (
            <ReplyText
              onClick={() => {
                setReplyId(null);
                setReplyNickname(null);
                setReplyComment(null);
              }}
            >
              [@{replyNickname} : {replyComment}] 에게 답글을 남기는 중...
              &nbsp;&nbsp;x
            </ReplyText>
          )}
          <InputContainer>
            <CommentInput
              onChange={onChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") postComment();
              }}
              value={commentContent}
            />
            <Btn
              onClick={() => postComment()}
              style={user || { background: "gray" }}
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
              }}
            >
              <>
                <Comment>
                  <span style={{ color: "#5a59ff" }}>{comment.nickname}</span> :{" "}
                  {comment.content}
                </Comment>
                {reply(comment.id).map((reply: any) => (
                  <Comment key={reply.id}>
                    &nbsp;&nbsp;&nbsp;ㄴ{" "}
                    <span style={{ color: "#5a59ff" }}>{reply.nickname}</span> :{" "}
                    {reply.content}
                  </Comment>
                ))}
              </>
            </CommentContainer>
          ) : null
        )
      ) : (
        <div>댓글 로딩 중...</div>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: calc(100% - 30px);
  max-width: 800px;
  padding: 15px;
  margin: 15px auto;
  background-color: whitesmoke;
  border-radius: 15px;
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
  padding: 10px;

  &:hover {
    cursor: pointer;
    background-color: white;
  }
`;

const ReplyText = styled.div`
  display: inline-block;
  width: auto;
  flex-shrink: 1;
  color: white;
  background-color: #6d6dff;
  padding: 5px 15px;
  border-radius: 10px;
  transition: 0.5s all;

  &:hover {
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
const Comment = styled.div`
  font-size: 1rem;
  font-weight: 600;
  margin: 5px 0;
`;
export default Posting;
