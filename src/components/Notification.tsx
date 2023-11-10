import axios from "axios";
import { GrNotification } from "react-icons/gr";
import styled, { keyframes } from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../state";

function Notification() {
  const [isOpen, setIsOpen] = useState(false);
  const [notification, setNotification] = useState("");
  const user = useRecoilValue(userState);

  useEffect(() => {
    if (user?.id) getNotification();
  }, [user]);

  const getNotification = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_APIADDRESS}/notification/${user.id}`
      );
      setNotification(response.data.content);
    } catch (error: any) {
      console.log(error?.response?.data?.message || "알 수 없는 에러 발생.");
    }
  };
  return (
    <>
      <Container $isOpen={isOpen}>
        <GrNotification
          id="notification"
          onClick={() => setIsOpen((prev: any) => !prev)}
        />
      </Container>
      {isOpen && <AlertContainer></AlertContainer>}
    </>
  );
}
const fadein = keyframes`
  from {
    opacity: 0;
    transform: scale(0);
    transform-origin: top center;
  }
  to {
    opacity: 1;
    transform: scale(1);
    transform-origin: top center;
  }
  `;
const Container = styled.div<any>`
  width: 50px;
  height: 100%;
  & #notification {
    padding: 7px;
    padding-top: 8px;
    width: 40px;
    height: 100%;
    border-radius: 10px;
    transition: 0.5s all;
    background-color: ${(props) => props.$isOpen && "#bbbbff"};
  }
  & #notification:hover {
    cursor: pointer;
    background-color: #b9b9ff;
  }
`;

const AlertContainer = styled.div`
  animation: ${fadein} 0.5s ease-out;
  width: 80%;
  max-width: 500px;
  height: 500px;
  background: transparent;
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  background-color: rgba(187, 187, 255, 0.5);
  border-radius: 15px;
  display: flex;
  position: fixed;
  z-index: 15;
  top: 70px;
  right: 200px;

  @media screen and (max-width: 900px) {
    right: 15px;
  }
`;

export default Notification;
