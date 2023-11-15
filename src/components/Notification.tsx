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
  const popupRef = useRef<any>(null);
  const btnRef = useRef<any>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        !btnRef.current.contains(event.target)
      ) {
        setIsOpen(false); // 팝업을 닫는 함수를 호출합니다.
      }
    }

    // 문서에 클릭 리스너를 추가합니다.
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // 컴포넌트가 언마운트될 때 리스너를 제거합니다.
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      <Container ref={btnRef} $isOpen={isOpen}>
        <GrNotification
          id="notification"
          onClick={() => setIsOpen((prev: any) => !prev)}
        />
        <span style={notiCount > 0 ? { color: "tomato" } : { color: "black" }}>
          {notiCount}
        </span>
      </Container>
      {isOpen && (
        <AlertContainer ref={popupRef}>
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
              <div>
                {handleDateChange(noti.notifyTime)}{" "}
                {noti.readType === 1 && "[읽음]"}
              </div>
              <DeleteBtn
                onClick={(e: any) => {
                  e.stopPropagation();
                  deleteNotification(noti.id);
                }}
              >
                삭제
              </DeleteBtn>
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
  display: flex;
  align-items: baseline;
  width: 50px;
  height: 100%;
  & #notification {
    padding: 5px;
    padding-top: 8px;
    width: 50px;
    height: 100%;
    border-radius: 10px;
    transition: 0.5s all;
    background-color: ${(props) => props.$isOpen && "#bbbbff"};
  }
  & #notification:hover {
    cursor: pointer;
    background-color: #b9b9ff;
  }
  @media screen and (max-width: 700px) {
    width: 45px;
    & span {
      font-size: 0.9rem;
    }
    @media screen and (max-width: 480px) {
      width: 40px;
    }
    & span {
      font-size: 0.8rem;
    }
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
  box-shadow: 3px 3px 9px rgba(0, 0, 0, 0.6);
  &:hover {
    cursor: pointer;
    transform: scale(1.02);
  }
`;

const DeleteBtn = styled(SmallBtn)`
  height: 27px !important;
  background: #f88570 !important;
  color: "white";
  margin-top: 5px;

  &:hover {
    background: tomato;
  }
`;
export default Notification;
