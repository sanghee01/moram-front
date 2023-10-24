import { styled } from "styled-components";

interface PopularContentProps {
  src: string;
  major: string;
  title: string;
}

function PopularContent({ src, major, title }: PopularContentProps) {
  return (
    <Content>
      <img src={src} alt="이미지" />
      <span>
        [{major}] {title}
      </span>
    </Content>
  );
}

const Content = styled.div`
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
    & span {
      font-weight: bolder;
    }
  }
`;

export default PopularContent;
