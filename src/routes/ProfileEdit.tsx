import { useState } from "react";
import styled from "styled-components";
import Select from "react-select";
import axios from "axios";

function ProfileEdit() {
  const [prePwValue, setPrePw] = useState("");
  const [pwValue1, setPw1] = useState("");
  const [pwValue2, setPw2] = useState("");
  const [schoolcertify, setSchoolCertify] = useState("");

  const [schoolList, setSchoolList] = useState(["학교1", "학교2", "학교3"]); // 학교 목록
const [searchTerm, setSearchTerm] = useState(""); // 검색어
const [selectedSchool, setSelectedSchool] = useState(""); // 선택된 학교

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
        <SchoolCertify>
          <h2>학교 인증</h2>
          <p>나의 학교를 인증할 수 있습니다.</p>
          <SchoolCertifyBox>
            <SchoolCertifyTtitle>
              <h4>학교 인증</h4>
            </SchoolCertifyTtitle>
            <SchoolSelect>
              <input
                type="text"
                placeholder="본인의 학교 선택"
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
                <button>확인</button>
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
                <button>변경</button>
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
  padding-left: 2rem;
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
    width: 100%;
    height: 100%;
    border-radius: 10px;
    font-size: 15px;
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
  padding-left: 2rem;
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
  padding-left: 2rem;
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
    width: 290px;
    br
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