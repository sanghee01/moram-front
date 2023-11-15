import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { Tag, Category } from "../../styles/Tag_CatagoryStyles";
import ProfilePhoto from "../ProfilePhoto";

interface NewContentProps {
  id: number;
  nickname: string;
  hitCount: number;
  likesCount: number;
  commentCount: number;
  img?: string;
  category: string;
  title: string;
  date: string;
  content: string;
  tag: string;
  profileImg: string;
}

function NewContent({
  id,
  nickname,
  hitCount,
  likesCount,
  commentCount,
  img,
  category,
  title,
  date,
  content,
  tag,
  profileImg,
}: NewContentProps) {
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
          <TagAndCategory>
            <Category>{category}</Category>
            <Tag>{tag}</Tag>
          </TagAndCategory>
          <div>{title}</div>
        </Title>
        <Info>
          <ProfilePhoto name={profileImg} />
          {nickname} | ❤️{likesCount} 👀{hitCount} 💬{commentCount} | {date}
        </Info>
        <ContentText>{content.split("<br/>").join(" ")}</ContentText>
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

  @media screen and (max-width: 1000px) {
    & img {
      width: 70px;
      height: 70px;
    }
  }
  @media screen and (max-width: 600px) {
    gap: 10px;
  }
`;

const Title = styled.div`
  display: flex;
  font-weight: bold;
  gap: 5px;
  @media screen and (max-width: 600px) {
    flex-direction: column;
    font-size: 0.9rem;
  }
`;
const TagAndCategory = styled.div`
  display: flex;
  gap: 5px;
`;
const Info = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 0.9rem;
  @media screen and (max-width: 600px) {
    font-size: 0.7rem;
  }
`;

const ContentText = styled.div`
  display: flex;
  white-space: pre-wrap;
  margin-top: 10px;
  display: -webkit-box;
  overflow: hidden;
  line-height: 1.7;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  @media screen and (max-width: 450px) {
    margin-top: 2px;
    font-size: 0.7rem;
  }
`;
export default NewContent;
