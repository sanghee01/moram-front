import axios from "axios";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import NoticePost from "../components/Notice/NoticePost";

function Notice() {
  const [loading, setLoading] = useState(true);
  const [noticePosting, SetNoticePosting] = useState<any[]>([]);

  useEffect(() => {
    getNotice();
  }, []);
  const getNotice = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_APIADDRESS}/notice`
      );
      console.log(response.data.content);
      SetNoticePosting(response.data.content);
      setLoading(false);
    } catch (error: any) {
      alert(error?.response?.data?.message || "알 수 없는 에러 발생.");
    }
  };
  return (
    <Container>
      {loading ? (
        <div>loading...</div>
      ) : (
        noticePosting.map((item) => {
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
