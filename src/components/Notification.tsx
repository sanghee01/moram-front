import axios from "axios";
import { GrNotification } from "react-icons/gr";
import styled, { keyframes } from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../state";
import { useLocation, useNavigate } from "react-router";
import { SmallBtn } from "../styles/ButtonStyles";
import { handleDateChange } from "../dateChange";

function Notification() {
  const [isOpen, setIsOpen] = useState(false);
  const [notification, setNotification] = useState<any>(null);
  const [notiCount, setNotiCount] = useState(0);
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      getNotification();
    }, 100);
  }, [isOpen, location]);

  useEffect(() => {
    setNotiCount(
      notification?.filter((notification: any) => notification.readType === 0)
        .length
    );
  }, [notification]);

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

  const readNotification = async (notiId: any) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_APIADDRESS}/notification/read/${notiId}`
      );
    } catch (error: any) {
      console.log(error?.response?.data?.message || "알 수 없는 에러 발생.");
    }
  };

  const deleteNotification = async (notiId: any) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_APIADDRESS}/notification/${notiId}`
      );
      if (response.data) getNotification();
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
        {notiCount}
      </Container>
      {isOpen && (
        <AlertContainer>
          {notification?.map((noti: any, index: any) => (
            <NotiContainer
              key={noti.id}
              $isRead={noti.readType}
              onClick={() => {
                navigate(`community/${noti.postId}`);
                readNotification(noti.id);
                setIsOpen(false);
                setNotification((prev: any) =>
                  prev.map((item: any) =>
                    item.id === noti.id ? { ...item, readType: 1 } : item
                  )
                );
              }}
            >
              <span>
                [{noti.title}] 글에{" "}
                {noti.notifyType === 0
                  ? "댓글이 달렸습니다."
                  : "답글이 달렸습니다."}
              </span>
              <div>{handleDateChange(noti.notifyTime)}</div>
              <SmallBtn
                $padding="3px 10px"
                $margin="0 0px"
                $background="gray"
                $backgroundHover="tomato"
                $color="white"
                onClick={(e: any) => {
                  e.stopPropagation();
                  deleteNotification(noti.id);
                }}
              >
                삭제
              </SmallBtn>
            </NotiContainer>
          ))}
        </AlertContainer>
      )}
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
  animation: ${fadein} 0.3s ease-out;
  width: 80%;
  max-width: 500px;
  height: 500px;
  overflow-y: scroll;
  background: transparent;
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  background-color: rgba(187, 187, 255, 0.7);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 15;
  top: 70px;
  right: 200px;
  padding: 15px;
  gap: 15px;

  @media screen and (max-width: 900px) {
    right: 15px;
  }
`;

const NotiContainer = styled.div<any>`
  width: 100%;
  background-color: ${(props) =>
    props.$isRead ? "rgba(221, 221, 221, 0.6)" : "rgba(176, 255, 190, 0.8)"};
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  transition: 0.5s all;

  &:hover {
    cursor: pointer;
    transform: scale(1.03);
  }
`;

export default Notification;
