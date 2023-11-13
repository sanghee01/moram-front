import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

function ProfileEdit() {
  const [nickname, setNickname] = useState("");
  const [schoolcertify, setSchoolCertify] = useState("");
  const [schoolList, setSchoolList] = useState<string[]>([]);
  const [schoolEmail, setSchoolEmail] = useState("");
  const [prePwValue, setPrePw] = useState("");
  const [pwValue1, setPw1] = useState("");
  const [pwValue2, setPw2] = useState("");
  const [imgSelect, setImgSelect] = useState(false);
  const [deletUser, setDeletUser] = useState("");

  const profileImageChange = () => {
    setImgSelect(true);
  };
  const profileImageNot = () => {
    setImgSelect(false);
  };

  const nicknameData = async () => {
    const confirmed = window.confirm(
      `닉네임을 "${nickname}"로 변경하시겠습니까?`
    );
    if (confirmed) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_APIADDRESS}/profile/changenickname`,
          {
            nickname: nickname,
          }
        );
        alert(response.data.message);
      } catch (error: any) {
        console.error(error?.response?.data?.message || "알 수 없는 에러 발생");
        alert(error.response.data);
      }
    }
  };

  const getSchoolData = async (univName: string) => {
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
      alert(error.response.data.message);
    }
  };
  const handleSchoolEmailInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSchoolEmail(event.target.value);
  };
  const schoolData = async () => {
    const confirmed = window.confirm(
      `학교를 "${schoolcertify}"로 인증하시겠습니까?`
    );
    if (confirmed) {
      try {
        console.log(`${schoolcertify},${schoolEmail}`);
        const response = await axios.post(
          `${process.env.REACT_APP_APIADDRESS}/user/certuniv`,
          {
            univName: schoolcertify,
            receivedEmail: schoolEmail,
          }
        );
        alert(response.data.message);
      } catch (error: any) {
        console.error(error?.response?.data?.message || "알 수 없는 에러 발생");
        alert(error.response.data.message);
      }
    }
  };

  const passwordData = async () => {
    const confirmed = window.confirm(`비밀번호를 변경하시겠습니까?`);
    if (confirmed) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_APIADDRESS}/profile/changepw`,
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
        alert(error.response.data);
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
        setDeletUser(response.data);
      } catch (error: any) {
        console.error(error?.response?.data?.message || "알 수 없는 에러 발생");
        alert(error.response.data);
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

  const filteredSchools = schoolList.filter((school) => {
    if (typeof school === "string") {
      return school.toLowerCase().includes(schoolcertify.toLowerCase());
    }
    return false;
  });

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
                <img src="./assets/profileimage.jpg" />
                <ChangeDelete>
                  <button onClick={profileImageChange}>사진 변경</button>
                  <button>기본 이미지</button>
                </ChangeDelete>
              </ProfileImage2>
            </ProfileImageChange>
            {imgSelect && (
              <ImgModal>
                <div>
                  <h3>원하는 캐릭터를 선택해 주세요</h3>
                  <button onClick={profileImageNot}>닫기</button>
                </div>
                <div>
                  <Img>프로필 사진들 넣을 곳</Img>
                </div>
                <Okbutton>
                  <button>확인</button>
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
                  <button onClick={() => window.location.reload()}>취소</button>
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
                  placeholder="본인의 학교 입력"
                  value={schoolcertify}
                  onChange={handleSchoolCertifyInput}
                />
                <select
                  value={schoolList}
                  onChange={(event) => setSchoolCertify(event.target.value)}
                >
                  <option value="">학교 찾기</option>
                  {filteredSchools.map((school) => (
                    <option key={school} value={school}>
                      {school}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="학교 이메일 입력"
                  value={schoolEmail}
                  onChange={handleSchoolEmailInput}
                />
                <OkButton>
                  <button onClick={OkClick2}>확인</button>
                  <button onClick={() => window.location.reload()}>취소</button>
                  <button>삭제</button>
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
                  <button onClick={() => window.location.reload()}>취소</button>
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
  width: 450px;
  height: 450px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  & h3 {
    position: absolute;
    top: 16px;
    right: 100px;
  }
  & button {
    position: absolute;
    top: 4px;
    right: 10px;
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
const Img = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 420px;
  height: 350px;
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
