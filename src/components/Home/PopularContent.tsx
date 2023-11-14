import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { Tag, Category } from "../../styles/Tag_CatagoryStyles";
import ProfilePhoto from "../ProfilePhoto";

interface PopularContentProps {
  id: number;
  nickname: string;
  hitCount: number;
  likesCount: number;
  commentCount: number;
  img?: string;
  category: string;
  title: string;
  date: string;
  tag: string;
  profileImg: string;
}

function PopularContent({
  id,
  nickname,
  hitCount,
  likesCount,
  commentCount,
  img,
  category,
  title,
  date,
  tag,
  profileImg,
}: PopularContentProps) {
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
      <Title>
        <div>
          <Category>{category}</Category>
          <Tag>{tag}</Tag>
          <div> {title}</div>
        </div>
        <Info>
          <ProfilePhoto name={profileImg} />
          {nickname} | ❤️{likesCount} 👀{hitCount} 💬{commentCount} | {date}
        </Info>
      </Title>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  flex-grow: 1;
  gap: 5px;

  &:hover {
    cursor: pointer;
  }
  & img {
    width: 100%;
    max-height: 100%; /* 이미지의 최대 높이를 부모 컨테이너에 맞게 설정 */
    height: 270px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 15px;
    object-fit: cover; /* 이미지가 부모 컨테이너에 맞게 자동으로 크기를 조절하되, 가로세로 비율 유지 */
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 7px;
  font-weight: bolder;

  & div {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  @media screen and (max-width: 450px) {
    font-size: 0.7rem;
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 0.9rem;
  @media screen and (max-width: 450px) {
    font-size: 0.7rem;
  }
`;

export default PopularContent;
