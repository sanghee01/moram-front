import axios from "axios";
import { styled } from "styled-components";
import { useEffect, useState } from "react";

function Admin() {
  const [users, SetUsers] = useState<null | any>(null);
  const [loading, setLoding] = useState(true);
  useEffect(() => {
    getUserInfo();
  }, []);
  const getUserInfo = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_APIADDRESS}/admin/allusers`
      );
      const userData = response.data.content;
      SetUsers(userData);
      setLoding(false);
      console.log("gi", userData);
    } catch (error: any) {
      alert(error?.response?.data?.message || "알 수 없는 에러 발생.");
    }
  };
  return (
    <Container>
      <Title>회원정보</Title>
      {loading ? (
        <div>loading...</div>
      ) : (
        <>
          <span>회원 수 : {users.length}</span>
          <UserTable>
            <thead>
              <tr>
                <th>ID</th>
                <th>닉네임</th>
                <th>사용자권한</th>
                <th>소속학교명</th>
                <th>이메일</th>
                <th>가입플랫폼</th>
                <th>가입날짜</th>
                <th>GptCount</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any) => {
                return (
                  <UserBox key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.nickname}</td>
                    <td>{user.role}</td>
                    <td>{user.univName}</td>
                    <td>{user.email}</td>
                    <td>{user.platformType}</td>
                    <td>{user.regDate}</td>
                    <td>{user.gptcount}</td>
                  </UserBox>
                );
              })}
            </tbody>
          </UserTable>
        </>
      )}
    </Container>
  );
}

export default Admin;

const Container = styled.div`
  width: 70%;
  margin: auto;
  margin-top: 50px;
  height: 100vh;
  @media screen and (max-width: 800px) {
    width: 90%;
    font-size: 0.8rem;
  }
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const UserTable = styled.table`
  margin: auto;
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;

  & td,
  th {
    padding: 6px 15px;
    border: 1px solid black;
  }

  & th {
    background: #42444e;
    color: #fff;
  }
  & tr:first-child th:first-child {
    border-top-left-radius: 6px;
  }
  & tr:first-child th:last-child {
    border-top-right-radius: 6px;
  }
  & td {
    border-right: 1px solid #c6c9cc;
    border-bottom: 1px solid #c6c9cc;
  }
  & td:first-child {
    border-left: 1px solid #c6c9cc;
  }
  & tr:nth-child(even) td {
    background: #eaeaed;
  }
  & tr:last-child td:first-child {
    border-bottom-left-radius: 6px;
  }
  & tr:last-child td:last-child {
    border-bottom-right-radius: 6px;
  }
`;
const UserBox = styled.tr`
  text-align: center;
`;
