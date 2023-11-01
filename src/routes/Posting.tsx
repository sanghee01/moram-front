import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { Input } from "../styles/LoginStyles";
import { SmallBtn } from "../styles/ButtonStyles";
import { useRecoilValue } from "recoil";
import { userState } from "../state";

function Posting() {
  const params = useParams();
  const postId = params.id;
  const [posting, setPosting] = useState<null | any>(null); //게시글 정보들
  const [comments, setComments] = useState<null | any>(null); //받아온 댓글들
  const [commentContent, setCommentContent] = useState(""); //댓글 input 내용
  const [replyId, setReplyId] = useState<null | Number>(null); //답글할 id
  const [replyNickname, setReplyNickname] = useState<null | String>(null); //답글할 닉네임
  const [replyComment, setReplyComment] = useState<null | String>(null); //답글할 댓글 내용
  const user = useRecoilValue(userState);

  useEffect(() => {
    getPosting();
    getComments();
  }, []);

  const onChange = (e: any) => {
    setCommentContent(e.target.value);
  };

  const getPosting = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_APIADDRESS}/posting/${postId}`
      );
      setPosting(response.data); //포스팅 데이터 받기
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

  const like = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_APIADDRESS}/like/${postId}`
      );
      setComments(response.data.message); //포스팅 데이터 받기
    } catch (error: any) {
      alert(error.response.data);
    }
  };

  const postComment = async () => {
    try {
      let api;
      !replyId
        ? (api = `${process.env.REACT_APP_APIADDRESS}/comment/${postId}`)
        : (api = `${process.env.REACT_APP_APIADDRESS}/comment/${postId}?parentId=${replyId}`);
      const response = await axios.post(`${api}`, {
        content: commentContent,
      });
      alert(response.data); //포스팅 데이터 받기
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
            {posting.nickname} | {date(posting.writeTime)}
          </h4>
          <hr />
          <p>{posting.content}</p>
          <BtnContainer>
            <LikeBtn>❤️ {posting.likesCount}</LikeBtn>
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
              [@{replyNickname} {replyComment}] 에게 답글을 남기는 중...
              &nbsp;&nbsp;x
            </ReplyText>
          )}
          <InputContainer>
            <CommentInput onChange={onChange} value={commentContent} />
            <Btn
              onClick={() => user && postComment()}
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
                {comment.nickname} : {comment.content}
                {reply(comment.id).map((reply: any) => (
                  <div key={reply.id}>&nbsp;&nbsp;&nbsp;ㄴ{reply.content}</div>
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
  padding: 15px;
  margin: 15px auto;
  background-color: whitesmoke;
  border-radius: 15px;
`;

const CommentInput = styled(Input)`
  width: 50%;
  flex-grow: 3;
  margin: 0;
`;

const InputContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  gap: 10px;
  margin: 10px 0;
`;

const Btn = styled(SmallBtn)`
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
  background-color: #ff8383;
  padding: 5px 15px;
  border-radius: 10px;
  transition: 0.5s all;

  &:hover {
    cursor: pointer;
    background-color: #ff4848;
  }
`;

const BtnContainer = styled.div`
  width: 100%;
  gap: 10px;
  margin: 10px 0;
`;

const LikeBtn = styled(SmallBtn)`
  background-color: #ff9d9d;
  &:hover {
    background-color: #ff7c7c;
  }
`;
export default Posting;
