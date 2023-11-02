import { styled } from "styled-components";
import CategoryBtn from "../CategoryBtn";

interface PopularContentProps {
  img: string;
  category: string;
  title: string;
  tag: string;
}

function PopularContent({ img, category, title, tag }: PopularContentProps) {
  return (
    <Container>
      <img src={img} alt="이미지" />
      <Title>
        <span>
          [{tag}] {title}
        </span>
        <CategoryBtn category={category} />
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
    border-radius: 15px;
    object-fit: cover; /* 이미지가 부모 컨테이너에 맞게 자동으로 크기를 조절하되, 가로세로 비율 유지 */
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 7px;
  font-weight: bolder;
`;

const Category = styled.span`
  background-color: #eee6f8;
  padding: 2px 5px;
  border-radius: 5px;
`;

export default PopularContent;
