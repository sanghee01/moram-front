import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { handleDateChange } from "../dateChange";
import { SmallBtn } from "../styles/ButtonStyles";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../state";

function NoticeDetail() {
  const params = useParams();
  const noticeId = params.id;
  const [noticeContent, setNoticeContent] = useState<any>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  useEffect(() => {
    getNoticePost();
  }, []);

  const getNoticePost = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_APIADDRESS}/notice/${noticeId}`
      );
      const noticeData = response.data.content;
      noticeData.content = noticeData.content.split("<br/>").join("\n");
      setNoticeContent(noticeData);
      setLoading(false);
    } catch (error: any) {
      alert(error?.response?.data?.message || "알 수 없는 에러 발생.");
    }
  };

  const deleteNoticePost = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_APIADDRESS}/notice/${noticeId}`
      );
      alert(response.data.message);
      navigate("/notice");
    } catch (error: any) {
      alert(error?.response?.data?.message || "알 수 없는 에러 발생.");
    }
  };

  return (
    <>
      {loading ? (
        <div>loading...</div>
      ) : (
        <Container>
          <h2>{noticeContent.title}</h2>
          <h4>
            {noticeContent.nickname} |{" "}
            {handleDateChange(noticeContent.writeTime)}
            {user?.role === "admin" && (
              <>
                <SmallBtn
                  $padding="4px 10px"
                  $margin="5px"
                  $background="tomato"
                  $backgroundHover="red"
                  $color="white"
                  onClick={() => deleteNoticePost()}
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
                    navigate(`/write-notice/${noticeId}`, {
                      state: noticeContent,
                    })
                  }
                >
                  글 수정
                </SmallBtn>
              </>
            )}
          </h4>
          <hr />
          <ContentText>{noticeContent.content}</ContentText>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  width: calc(100% - 30px);
  max-width: 800px;
  min-height: 600px;
  padding: 15px;
  margin: 60px auto;
  background-color: whitesmoke;
  border-radius: 15px;
`;

const ContentText = styled.div`
  display: flex;
  white-space: pre-wrap;
  margin-top: 10px;
`;
export default NoticeDetail;
