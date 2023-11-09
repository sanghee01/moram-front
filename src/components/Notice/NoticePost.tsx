import { styled } from "styled-components";
import { handleDateChange } from "../../dateChange";

interface NoticePostProps {
  // id: number;
  title: string;
  writeTime: string;
  nickname: string;
}

function NoticePost({ title, nickname, writeTime }: NoticePostProps) {
  return (
    <Container>
      <div>{title}</div>
      <div>{nickname}</div>
      <div>{handleDateChange(writeTime)}</div>
    </Container>
  );
}

export default NoticePost;

const Container = styled.div`
  display: flex;
`;
