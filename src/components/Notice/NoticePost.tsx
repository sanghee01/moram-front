import { styled } from "styled-components";
import { handleDateChange } from "../../dateChange";
import { Link } from "react-router-dom";

interface NoticePostProps {
  id: number;
  title: string;
  writeTime: string;
}

function NoticePost({ id, title, writeTime }: NoticePostProps) {
  return (
    <Container>
      <Link to={`/notice/${id}`}>
        <div>{title}</div>
        <div>{handleDateChange(writeTime)}</div>
      </Link>
    </Container>
  );
}

export default NoticePost;

const Container = styled.div`
  & a {
    display: flex;
    justify-content: space-between;
    max-width: 800px;
    padding: 20px;
    margin: 15px auto;
    background-color: whitesmoke;
    border-radius: 15px;

    & div:last-child {
      color: rgba(0, 0, 0, 0.4);
      font-size: 0.9rem;
    }
  }
  @media screen and (max-width: 800px) {
    & a {
      flex-direction: column;
      & div:last-child {
        font-size: 0.8rem;
      }
    }
  }
`;
