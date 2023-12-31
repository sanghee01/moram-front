import { styled } from "styled-components";

function ProfilePhoto({ name }: any) {
  return <Img src={`/assets/profileselectimage/${name}.jpg`} />;
}

const Img = styled.img`
  width: 30px !important;
  height: 30px !important;
  border-radius: 20px !important;
  margin: 5px 5px 0px 0px;
  transition: 0.5s all;
  /* &:hover {
    width: 80px !important;
    height: 80px !important;
    border-radius: 30px !important;
  } */
`;

export default ProfilePhoto;
