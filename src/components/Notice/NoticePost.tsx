import { styled } from "styled-components";
import { handleDateChange } from "../../dateChange";
import { Link } from "react-router-dom";

interface NoticePostProps {
  id: number;
  title: string;
  writeTime: string;
  nickname: string;
}

function NoticePost({ id, title, nickname, writeTime }: NoticePostProps) {
  return (
    <Container>
      <Link to={`/notice/${id}`}>
        <div>{title}</div>
        <div>
          {nickname} | {handleDateChange(writeTime)}
        </div>
      </Link>
    </Container>
  );
}

export default NoticePost;

const Container = styled.div`
  & a {
    display: flex;
    flex-direction: column;
    max-width: 800px;
    padding: 15px;
    margin: 15px auto;
    background-color: whitesmoke;
    border-radius: 15px;
  }
`;
