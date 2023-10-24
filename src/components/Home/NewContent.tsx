import { styled } from "styled-components";

interface NewContentProps {
  src: string;
  category: string;
  title: string;
  date: string;
  content: string;
}

function NewContent({ src, category, title, date, content }: NewContentProps) {
  return (
    <Content>
      <img src={src} alt="이미지" />
      <section>
        <div>
          <span>
            [{category}] {title}
          </span>
          <span>{date}</span>
        </div>
        <p>{content}</p>
      </section>
    </Content>
  );
}

const Content = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 10px;

  &:hover {
    cursor: pointer;
  }
  & img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
  }
  & section {
    display: flex;
    flex-direction: column;

    & div {
      display: flex;
      gap: 10px;
    }
    @media screen and (max-width: 1000px) {
      & div {
        flex-direction: column;
        gap: 0;
      }
    }
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

export default NewContent;
