import axios from "axios";
import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { Title, Table, Row } from "../../styles/TableStyles";
function Users() {
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
      const userData = response.data;
      SetUsers(userData);
      setLoding(false);
      //   console.log("userData:", userData);
    } catch (error: any) {
      alert(error.response.data);
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
          <Table>
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
                  <Row key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.nickname}</td>
                    <td>{user.role}</td>
                    <td>{user.univName}</td>
                    <td>{user.email}</td>
                    <td>{user.platformType}</td>
                    <td>{user.regDate}</td>
                    <td>{user.gptcount}</td>
                  </Row>
                );
              })}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
}

export default Users;

const Container = styled.div`
  width: 100%;
  margin: auto;
  margin-top: 50px;
  height: 100vh;
  @media screen and (max-width: 800px) {
    width: 90%;
    font-size: 0.8rem;
  }
`;
