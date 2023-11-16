import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
interface CommentProps {
  postId: number;
  date: string;
  content: string;
}

function MyComment({ postId, date, content }: CommentProps) {
  const navigate = useNavigate();

  return (
    <Container
      onClick={() => {
        navigate(`/community/${postId}`);
      }}
    >
      <ContentText>{content}</ContentText>
      <span> {date}</span>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  padding: 15px 0;
  &:hover {
    cursor: pointer;
  }

  & span {
    color: rgba(0, 0, 0, 0.5);
    font-size: 0.9rem;
  }
  @media screen and (max-width: 1200px) {
    flex-direction: column;
    justify-content: center;
    align-items: normal;
    gap: 5px;
  }
`;

const ContentText = styled.div`
  display: flex;
  white-space: pre-wrap;
  display: -webkit-box;
  overflow: hidden;
  line-height: 1.7;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export default MyComment;
