import { styled } from "styled-components";
import { CategorySpan } from "../../styles/CommunityStyles";
import CategoryBtn from "../CategoryBtn";

interface NewContentProps {
  img: string;
  category: string;
  title: string;
  date: string;
  content: string;
  tag: string;
}

function NewContent({
  img,
  category,
  title,
  date,
  content,
  tag,
}: NewContentProps) {
  return (
    <Container>
      <img src={img} alt="이미지" />
      <div>
        <Title>
          <div>
            <span>
              [{tag}] {title}
            </span>
            <CategoryBtn category={category} marginL={5} />
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
  margin-top: 13px;

  &:hover {
    cursor: pointer;
  }
  & img {
    width: 100px;
    height: 100px;
    object-fit: cover;
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

export default NewContent;
