import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
interface CommentProps {
    id: number;
    userid: number;
    postid: number;
    nickname: string;
    date: string;
    content: string;
    tag: string;
  }

  function MyComment({
    id,
    userid,
    postid,
    nickname,
    date,
    content,
    tag,
  }: CommentProps) {
    const navigate = useNavigate();
  
    return (
      <Container
        onClick={() => {
            navigate(`/community/${id}`);
        }}
      >
        <div>
          <ContentBox>
            <ContentContainer>
                <span>[{postid}]</span>
                <span>{nickname}</span><span>[{userid}]</span>
            </ContentContainer>
            <Time> {date}</Time>
          </ContentBox>
          <Content><span>[{id}]</span><p>{content}</p></Content>
        </div>
      </Container>
    );
  }
  const Container = styled.div`
  display: flex;
  gap: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  padding: 15px 0;

  &:hover {
    cursor: pointer;
  }
  `;

  const ContentBox = styled.div`
  `;
    const ContentContainer = styled.div`
   `;
    const Content = styled.div`
    display: flex;
    gap: 0.2rem;
    `;
     const Time = styled.div`
     `;
 export default MyComment;
