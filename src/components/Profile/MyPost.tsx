import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
interface PostContentProps {
    id: number;
    img?: string;
    category: string;
    title: string;
    date: string;
    content: string;
    tag: string;
  }

  function MyPost({
    id,
    img,
    category,
    title,
    date,
    content,
    tag,
  }: PostContentProps) {
    const navigate = useNavigate();
  
    return (
      <Container
        onClick={() => {
            navigate(`/community/${id}`);
        }}
      >
        {img ? (
          <img src={img} alt="이미지" />
        ) : (
          <img src="https://i.ibb.co/2Y3sQX2/noImage.png" alt="기본이미지" />
        )}
        <div>
          <Title>
            <div>
              <span>
                [{tag}] {title}
              </span>
            </div>
            <Time> {date}</Time>
          </Title>
          <p>{content}</p>
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
  & img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 8px;
  }

  & p {
    margin: 5px 0;
  }
  & div {
    width: 100%;
  }

@media screen and (max-width: 1000px) {
  & img {
    width: 70px;
    height: 70px;
  }
}
@media screen and (max-width: 600px) {
  & img {
    width: 50px;
    height: 50px;
  }
}
`;

const Title = styled.header`
display: flex;
justify-content: space-between;
align-items: center;
font-weight: bold;

& div {
  width: 80%;
}

@media screen and (max-width: 1000px) {
  flex-direction: column;
  align-items: start;
  gap: 0;
  & div {
    width: inherit;
  }
}
`;

const Time = styled.span`
opacity: 0.5;
font-weight: 500;
font-size: 0.9rem;
`;
  export default MyPost;
  