import axios from "axios";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import NoticePost from "../components/Notice/NoticePost";
import { useNavigate } from "react-router-dom";
import { handleDateChange } from "../dateChange";
import { useRecoilValue } from "recoil";
import { userState } from "../state";

function Notice() {
  const [loading, setLoading] = useState(true);
  const [noticePosting, SetNoticePosting] = useState<any[]>([]);
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  useEffect(() => {
    getNotice();
  }, []);
  const getNotice = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_APIADDRESS}/notice`
      );
      SetNoticePosting(response.data.content);
      setLoading(false);
    } catch (error: any) {
      alert(error?.response?.data?.message || "알 수 없는 에러 발생.");
    }
  };
  return (
    <Container>
      {user?.role === "admin" && (
        <WriteBtn>
          <button
            onClick={() => navigate("/write-notice")}
            style={{ background: "#b0b0fc" }}
          >
            글 작성
          </button>
        </WriteBtn>
      )}

      {loading ? (
        <div>loading...</div>
      ) : (
        noticePosting
          .sort((a, b) => {
            const aTime = new Date(handleDateChange(a.writeTime)).getTime();
            const bTime = new Date(handleDateChange(b.writeTime)).getTime();
            if (aTime < bTime) {
              return 1;
            } else if (aTime > bTime) {
              return -1;
            }
            return 0;
          })
          .map((item) => {
            return (
              <NoticePost
                key={item.id}
                id={item.id}
                title={item.title}
                nickname={item.nickname}
                writeTime={item.writeTime}
              />
            );
          })
      )}
    </Container>
  );
}

export default Notice;

const Container = styled.div`
  width: 70%;
  margin: auto;
`;

const WriteBtn = styled.div`
  display: flex;
  justify-content: right;
  width: 800px;
  margin: auto;
  & button {
    transition: 0.5s all;
    padding: 10px 20px;
    border-radius: 15px;
    font-weight: 500;
    border: 0;
    margin-top: 20px;
  }
  & button:hover {
    cursor: pointer;
    background-color: #d6d6ff;
  }
`;
