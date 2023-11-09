import { useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import axios from "axios";

function ProfileEdit() {
  const [nickname, setNickname] = useState("");
  const [prePwValue, setPrePw] = useState("");
  const [pwValue1, setPw1] = useState("");
  const [pwValue2, setPw2] = useState("");
  const [schoolcertify, setSchoolCertify] = useState("");

const [schoolList, setSchoolList] = useState(["학교1", "학교2", "학교3"]); // 학교 목록
const [searchTerm, setSearchTerm] = useState(""); // 검색어

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
  const SchoolCertifyInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSchoolCertify(event.target.value);
    console.log(event.target.value);
  };

  const filteredSchoolList = schoolList.filter((school) =>
  school.includes(searchTerm)
);

const OkClick1 = () => {
  console.log("닉네임변경");
};
const OkClick2 = () => {
  console.log("학교 인증");
};
const OkClick3 = () => {
  console.log("보안설정");
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
                <button>사진 변경</button>
                <button>삭제</button>
              </ChangeDelete>
            </ProfileImage2>
          </ProfileImageChange>
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
                onChange={SchoolCertifyInput}
              />
              <select
  value={schoolcertify}
  onChange={(event) => setSchoolCertify(event.target.value)}
>
<option value="">학교 찾기</option>
  <option value="학교1">학교1</option>
  <option value="학교2">학교2</option>
  <option value="학교3">학교3</option>
</select>
              <OkButton>
                <button onClick={OkClick2}>확인</button>
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
                type="text"
                placeholder="현재 비밀번호"
                value={prePwValue}
                onChange={CheckPreviousPw}
              />
              <div>
                <input
                  type="text"
                  placeholder="비밀번호 변경"
                  value={pwValue1}
                  onChange={ChangeUserPw1}
                />
                <p>최소 8자리 이상이며 대소문자,숫자, 특수문자 하나씩 포함</p>
              </div>
              <input
                type="text"
                placeholder="비밀번호 확인"
                value={pwValue2}
                onChange={ChangeUserPw2}
              />
              <OkButton>
                <button onClick={OkClick3}>변경</button>
              </OkButton>
            </Security2>
          </SecurityChange>
        </SecurityEdit>
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
    transition: background-color 0.5s ease
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
const OkButton = styled.div`
  display: flex;
  & button {
    background-color: transparent;
    outline: 0;
    border: 0;
    background-color: #e6e6e6d6;
    border-radius: 10px;
    height: 31px;
    width: 100%;
    font-weight: 500;
    transition: background-color 0.5s ease
  }
  & button:hover {
    cursor: pointer;
    background-color: #d6d3fb;
  }
  @media screen and (max-width: 800px) {
    & button {
      width: 250px;
    }
  }
  @media screen and (max-width: 700px) {
    & button {
      width: 220px;
    }
  }
  @media screen and (max-width: 600px) {
    & button {
      width: 200px;
    }
  }
`;
export default ProfileEdit;

// const response = axios.post(`${process.env.REACT_APP_APIADDRESS}/user/changepw`,{
//   prepw: "현재비밀번호",
//   newpw: "변경할비밀번호"
// })

// const response1 = axios.post(`${process.env.REACT_APP_APIADDRESS}/user/changenickname`,{
//   newnickname: "변경할닉네임"
// })