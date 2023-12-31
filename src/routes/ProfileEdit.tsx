import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userState } from "../state";

function ProfileEdit() {
  const [filteredSchools, setFilteredSchools] = useState<any>([]);
  const [nickname, setNickname] = useState("");
  const [schoolcertify, setSchoolCertify] = useState<any>("");
  const [schoolList, setSchoolList] = useState<string[]>([]);
  const [schoolSelected, setSchoolSelected] = useState<any>("");
  const [schoolEmail, setSchoolEmail] = useState<any>("");
  const [prePwValue, setPrePw] = useState("");
  const [pwValue1, setPw1] = useState("");
  const [pwValue2, setPw2] = useState("");
  const [imgSelect, setImgSelect] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const setUser = useSetRecoilState(userState); //유저 설정

  const profileImageChange = (defaultImg = false) => {
    setImgSelect(true);
  };
  const profileImageNot = () => {
    setImgSelect(false);
  };
  const defaultImage = "./assets/profileselectimage/skyblue.jpg";
  const imageFiles = [
    "./assets/profileselectimage/black.jpg",
    "./assets/profileselectimage/blue.jpg",
    "./assets/profileselectimage/green.jpg",
    "./assets/profileselectimage/lightpurple.jpg",
    "./assets/profileselectimage/pink.jpg",
    "./assets/profileselectimage/skyblue.jpg",
    "./assets/profileselectimage/white.jpg",
    "./assets/profileselectimage/yellow.jpg",
    "./assets/profileselectimage/yellowgreen.jpg",
  ];
  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
    console.log(`Selected image: ${image}`);
  };
  const handleOkClick = async () => {
    const splitImage = selectedImage?.split("/");
    const fileName = splitImage?.pop();

    let colorName = "";

    if (fileName) {
      colorName = fileName.split(".").shift() || "";
    }

    try {
      console.log(`${colorName}`);
      const response = await axios.post(
        `${process.env.REACT_APP_APIADDRESS}/profile/changeimg`,
        { img: colorName }
      );
      alert(response.data.message);
      setSelectedImage(`./assets/profileselectimage/${colorName}.jpg`);
      profileImageNot();
      profileImageNot();
    } catch (error: any) {
      console.error(error?.response?.data?.message || "알 수 없는 에러 발생");
      alert(error?.response?.data?.message || "알 수 없는 에러 발생");
    }
  };
  useEffect(() => {
    getProfileImage();
  }, []);
  const getProfileImage = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_APIADDRESS}/profile`
      );
      const imageName = response.data.img;
      setSelectedImage(`./assets/profileselectimage/${imageName}.jpg`);
    } catch (error: any) {
      console.error(error?.response?.data?.message || "알 수 없는 에러 발생");
      alert(error?.response?.data?.message || "알 수 없는 에러 발생");
    }
  };

  const nicknameData = async () => {
    const confirmed = window.confirm(
      `닉네임을 "${nickname}"로 변경하시겠습니까?`
    );
    if (confirmed) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_APIADDRESS}/profile/cgnickname`,
          {
            nickname: nickname,
          }
        );
        getUser();
        alert(response.data.message);
      } catch (error: any) {
        console.error(error?.response?.data?.message || "알 수 없는 에러 발생");
        alert(error?.response?.data?.message || "알 수 없는 에러 발생");
      }
    }
  };

  const getSchoolData = async (univName: string) => {
    if (univName.length === 0) return;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_APIADDRESS}/user/univsearch`,
        {
          univName,
        }
      );
      setSchoolList(response.data);
      console.log(response.data);
    } catch (error: any) {
      console.error(error?.response?.data?.message || "알 수 없는 에러 발생");
      alert(error?.response?.data?.message || "알 수 없는 에러 발생");
    }
  };
  const handleSchoolEmailInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSchoolEmail(event.target.value);
  };
  const schoolData = async () => {
    if (!schoolSelected) return alert("학교를 검색하여 선택해주세요.");
    const confirmed = window.confirm(
      `학교를 "${schoolSelected}"로 인증하시겠습니까?`
    );
    if (confirmed) {
      try {
        console.log(`${schoolSelected},${schoolEmail}`);
        const response = await axios.post(
          `${process.env.REACT_APP_APIADDRESS}/user/certuniv`,
          {
            univName: schoolSelected,
            receivedEmail: schoolEmail,
          }
        );
        alert(response.data.message);
      } catch (error: any) {
        console.error(error?.response?.data?.message || "알 수 없는 에러 발생");
        alert(error?.response?.data?.message || "알 수 없는 에러 발생");
      }
    }
  };
  const SchoolDataDelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_APIADDRESS}/user/univ`
      );
      alert(response.data.message);
      console.log(response.data);
    } catch (error: any) {
      console.error(error?.response?.data?.message || "알 수 없는 에러 발생");
      alert(error?.response?.data?.message || "알 수 없는 에러 발생");
    }
  };

  const passwordData = async () => {
    const confirmed = window.confirm(`비밀번호를 변경하시겠습니까?`);
    if (confirmed) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_APIADDRESS}/profile/cgpw`,
          {
            prepw: prePwValue,
            pw1: pwValue1,
            pw2: pwValue2,
          }
        );

        console.log(`response.data : ${response.data}`);
        alert(response.data.message);
      } catch (error: any) {
        console.error(error?.response?.data?.message || "알 수 없는 에러 발생");
        alert(error?.response?.data?.message || "알 수 없는 에러 발생");
      }
    }
  };

  const handleDeleteUser = async () => {
    const confirmed = window.confirm(
      `정말로 탈퇴 하시겠습니까? \n탈퇴 후에는 복구할 수 없습니다.`
    );
    if (confirmed) {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_APIADDRESS}/user`
        );
        alert(response.data.message);
        window.location.reload();
      } catch (error: any) {
        console.error(error?.response?.data?.message || "알 수 없는 에러 발생");
        alert(error?.response?.data?.message || "알 수 없는 에러 발생");
      }
    }
  };
  const ChangeNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };
  const CheckPreviousPw = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrePw(event.target.value);
    console.log(event.target.value);
  };
  const ChangeUserPw1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPw1(event.target.value);
    console.log(event.target.value);
  };
  const ChangeUserPw2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPw2(event.target.value);
    console.log(event.target.value);
  };
  const handleSchoolCertifyInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const univName = event.target.value;
    setSchoolCertify(univName);
    getSchoolData(univName);
  };

  useEffect(() => {
    const filteredSchools = schoolList.filter((school: any) => {
      if (typeof school === "string") {
        return school.toLowerCase().includes(schoolcertify.toLowerCase());
      }
      return [];
    });
    if (filteredSchools.length === 0) setSchoolSelected("");
    if (filteredSchools.length === 1) setSchoolSelected(filteredSchools);
    setFilteredSchools([...filteredSchools]);
  }, [schoolList]);

  const OkClick1 = () => {
    console.log("닉네임변경");
    nicknameData();
  };
  const OkClick2 = () => {
    console.log("학교 인증");
    schoolData();
  };
  const OkClick3 = () => {
    console.log("보안설정");
    passwordData();
  };
  const resetInputs = () => {
    setSchoolCertify("");
    setSchoolEmail("");
    setPrePw("");
    setPw1("");
    setPw2("");
    setNickname("");
  };

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_APIADDRESS}/user/check`
      );
      setUser(response.data.content);
      console.log("user check : ", response.data.content);
    } catch (error: any) {
      console.error(error?.response?.data?.message || "알 수 없는 에러 발생.");
    }
  };

  return (
    <Container1>
      <Container2>
        <PartName>
          <h2>설정</h2>
        </PartName>
        <ProfileEditMain>
          <ProfileImageEdit>
            <h2>프로필 수정</h2>
            <p>나의 프로필을 수정 하실 수 있습니다.</p>
            <ProfileImageChange>
              <ProfileImage1>
                <h4>프로필 이미지</h4>
              </ProfileImage1>
              <ProfileImage2>
                <img
                  src={
                    selectedImage || "./assets/profileselectimage/skyblue.jpg"
                  }
                />
                <ChangeDelete>
                  <button onClick={() => profileImageChange()}>
                    사진 변경
                  </button>
                </ChangeDelete>
              </ProfileImage2>
            </ProfileImageChange>
            {imgSelect && (
              <ImgModal>
                <div>
                  <h3>원하는 캐릭터를 선택해 주세요</h3>
                  <button onClick={profileImageNot}>닫기</button>
                </div>
                <ImageGrid>
                  {imageFiles.map((imageFile, index) => (
                    <Img
                      key={index}
                      src={imageFile}
                      onClick={() => handleImageSelect(imageFile)}
                    />
                  ))}
                </ImageGrid>
                <Okbutton>
                  <button onClick={handleOkClick}>확인</button>
                </Okbutton>
              </ImgModal>
            )}
          </ProfileImageEdit>
          <NicknameEdit>
            <h2>닉네임 변경</h2>
            <p>나의 닉네임을 변경 하실 수 있습니다.</p>
            <NicknameChange>
              <Nickname1>
                <h4>닉네임 변경</h4>
              </Nickname1>
              <Nickname2>
                <input
                  type="text"
                  placeholder="닉네임 변경"
                  value={nickname}
                  onChange={ChangeNickname}
                />
                <OkButton>
                  <button onClick={OkClick1}>변경</button>
                  <button onClick={resetInputs}>취소</button>
                </OkButton>
              </Nickname2>
            </NicknameChange>
          </NicknameEdit>
          <SchoolCertify>
            <h2>학교 인증</h2>
            <p>나의 학교를 인증 하실수 있습니다.</p>
            <SchoolCertifyBox>
              <SchoolCertifyTtitle>
                <h4>학교 인증</h4>
              </SchoolCertifyTtitle>
              <SchoolSelect>
                <input
                  type="text"
                  placeholder="대학교 검색"
                  value={schoolcertify}
                  onChange={handleSchoolCertifyInput}
                />
                <select
                  value={schoolSelected}
                  onChange={(event) => setSchoolSelected(event.target.value)}
                >
                  {filteredSchools?.length !== 1 && (
                    <option value="">학교 선택</option>
                  )}
                  {filteredSchools?.map((school: any) => (
                    <option key={school} value={school}>
                      {school}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="학교 이메일 입력"
                  value={schoolEmail}
                  autoComplete="new-password"
                  onChange={handleSchoolEmailInput}
                />
                <input
                  style={{
                    width: "0px",
                    height: "0px",
                    filter: "opacity(0)",
                    margin: "-8px",
                  }}
                />
                {/* 자동완성 방지 숨김용 input */}
                <OkButton>
                  <button onClick={OkClick2}>확인</button>
                  <button onClick={resetInputs}>취소</button>
                  <button onClick={SchoolDataDelete}>삭제</button>
                </OkButton>
              </SchoolSelect>
            </SchoolCertifyBox>
          </SchoolCertify>
          <SecurityEdit>
            <h2>보안 설정</h2>
            <p>나의 비밀번호를 변경 하실 수 있습니다.</p>
            <SecurityChange>
              <Security1>
                <h4>비밀번호 변경</h4>
              </Security1>
              <Security2>
                <input
                  type="password"
                  placeholder="현재 비밀번호"
                  value={prePwValue}
                  onChange={CheckPreviousPw}
                />
                <div>
                  <input
                    type="password"
                    placeholder="비밀번호 변경"
                    value={pwValue1}
                    onChange={ChangeUserPw1}
                  />
                  <p>최소 8자리 이상이며 대소문자,숫자, 특수문자 하나씩 포함</p>
                </div>
                <input
                  type="password"
                  placeholder="비밀번호 확인"
                  value={pwValue2}
                  onChange={ChangeUserPw2}
                />
                <OkButton>
                  <button onClick={OkClick3}>변경</button>
                  <button onClick={resetInputs}>취소</button>
                </OkButton>
              </Security2>
            </SecurityChange>
          </SecurityEdit>
          <DeletUser>
            <button onClick={handleDeleteUser}>회원 탈퇴</button>
          </DeletUser>
        </ProfileEditMain>
      </Container2>
    </Container1>
  );
}
const Container1 = styled.div`
  width: 90%;
  margin: auto;
  height: 220vh;
`;
const Container2 = styled.div`
  width: 60%;
  margin: auto;
`;
const PartName = styled.div`
  margin-top: 1rem;
  margin-bottom: 1.8rem;
  font-size: 1.5rem;
`;

const ProfileEditMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ImgModal = styled.div`
  position: fixed;
  padding: 1rem;
  top: 50%;
  left: 45%;
  transform: translate(+40%, -40%);
  width: 480px;
  height: 480px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  & div {
    display: flex;
    flex-direction: row;
  }
  & h3 {
    position: absolute;
    top: 16px;
    right: 120px;
  }
  & button {
    position: absolute;
    top: 6px;
    right: 14px;
    background-color: transparent;
    display: inline-block;
    outline: 0;
    border: 0;
    font-size: 15px;
    font-weight: 500;
  }
`;
const Okbutton = styled.div`
  position: fixed;
  display: flex;
  top: 90%;
  left: 65%;
  transform: translate(+40%, -40%);
  & button {
    width: 100px;
    height: 30px;
    position: absolute;
    top: 4px;
    right: 10px;
    background-color: #d6d3fb;
    border-radius: 10px;
    display: inline-block;
    outline: 0;
    border: 0;
    font-size: 15px;
    font-weight: 500;
    transition: background-color 0.7s ease;
  }
  & button:hover {
    background-color: #6c6ce3;
    color: white;
  }
`;
const ImageGrid = styled.div`
  flex-wrap: wrap;
  overflow-y: auto;
  width: 440px;
  max-height: 390px;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(100px, auto);
  gap: 10px;
`;

const Img = styled.img`
  width: 200px;
  height: auto;
  object-fit: cover;
  transition: all 0.3s ease-in-out;
  &:hover {
    opacity: 0.7;
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const ProfileImageEdit = styled.div`
  & p {
    margin-top: 0.2rem;
    font-size: 15px;
  }
`;
const ProfileImageChange = styled.div`
  display: flex;
  margin-top: 1rem;
  height: 40vh;
  border-top: solid 1px gray;
  border-bottom: solid 1px gray;
`;

const ProfileImage1 = styled.div`
  display: flex;
  width: 25%;
  border-right: solid 1px gray;
  background-color: #ecececd5;
  & h4 {
    margin-left: 1.5rem;
    margin-right: 1rem;
    padding-top: 2.5rem;
  }
`;

const ProfileImage2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 1rem;
  align-items: center;
  & img {
    border-radius: 100%;
    width: 150px;
    height: 150px;
  }
`;

const ChangeDelete = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  & button {
    background-color: transparent;
    outline: 0;
    border: 0;
    background-color: #e6e6e6d6;
    width: 100px;
    height: 30px;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 500;
    transition: background-color 0.5s ease;
  }
  & button:hover {
    cursor: pointer;
    background-color: #d6d3fb;
  }
`;
//닉네임 변경
const NicknameEdit = styled.div`
  & p {
    margin-top: 0.2rem;
    font-size: 15px;
  }
`;

const NicknameChange = styled.div`
  display: flex;
  margin-top: 1rem;
  height: 20vh;
  border-top: solid 1px gray;
  border-bottom: solid 1px gray;
`;

const Nickname1 = styled.div`
  display: flex;
  width: 25%;
  border-right: solid 1px gray;
  background-color: #ecececd5;
  & h4 {
    margin-left: 1.5rem;
    margin-right: 1rem;
    padding-top: 2.5rem;
  }
`;

const Nickname2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 1rem;
  gap: 0.7rem;
  & p {
    margin: 0;
    font-size: 12px;
    color: gray;
  }
  & input {
    width: 290px;
  }
  @media screen and (max-width: 800px) {
    & input {
      width: 250px;
    }
  }
  @media screen and (max-width: 700px) {
    & input {
      width: 220px;
    }
  }
  @media screen and (max-width: 600px) {
    & input {
      width: 200px;
    }
  }
`;

//학교 인증
const SchoolCertify = styled.div`
  & p {
    margin-top: 0.2rem;
    font-size: 15px;
  }
`;

const SchoolCertifyBox = styled.div`
  display: flex;
  margin-top: 1rem;
  height: 25vh;
  border-top: solid 1px gray;
  border-bottom: solid 1px gray;
`;

const SchoolCertifyTtitle = styled.div`
  display: flex;
  width: 25%;
  border-right: solid 1px gray;
  background-color: #ecececd5;

  & h4 {
    margin-left: 1.5rem;
    margin-right: 1rem;
    padding-top: 2.5rem;
  }
`;
const SchoolSelect = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 1rem;
  gap: 0.7rem;
  & p {
    margin: 0;
    font-size: 12px;
    color: gray;
  }
  & input {
    width: 290px;
  }
  @media screen and (max-width: 800px) {
    & input {
      width: 250px;
    }
  }
  @media screen and (max-width: 700px) {
    & input {
      width: 220px;
    }
  }
  @media screen and (max-width: 700px) {
    & input {
      width: 200px;
    }
  }
`;

//비밀번호 변경
const SecurityEdit = styled.div`
  & p {
    margin-top: 0.2rem;
    font-size: 15px;
  }
`;

const SecurityChange = styled.div`
  display: flex;
  margin-top: 1rem;
  height: 35vh;
  border-top: solid 1px gray;
  border-bottom: solid 1px gray;
`;

const Security1 = styled.div`
  display: flex;
  width: 25%;
  border-right: solid 1px gray;
  background-color: #ecececd5;
  & h4 {
    margin-left: 1.5rem;
    margin-right: 1rem;
    padding-top: 2.5rem;
  }
`;

const Security2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 1rem;
  gap: 0.7rem;
  & p {
    margin: 0;
    font-size: 12px;
    color: gray;
  }
  & input {
    width: 290px;
  }
`;
const OkButton = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.2rem;
  margin-top: 5px;
  & button {
    background-color: transparent;
    outline: 0;
    border: 0;
    background-color: #e6e6e6d6;
    border-radius: 10px;
    height: 31px;
    width: 48%;
    font-weight: 500;
    transition: background-color 0.5s ease;
  }
  & button:hover {
    cursor: pointer;
    background-color: #d6d3fb;
  }
`;

const DeletUser = styled.div`
  display: flex;
  align-items: center;
  & button {
    background-color: transparent;
    outline: 0;
    border: 0;
    font-weight: 500;
    color: gray;
  }
`;

export default ProfileEdit;
