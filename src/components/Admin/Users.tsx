import axios from "axios";
import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { Title, Table, Row } from "../../styles/TableStyles";
import { handleDateChange } from "../../dateChange";
import { useNavigate } from "react-router-dom";

function Users() {
  const [usersData, SetUsersData] = useState<null | any>(null);
  const [loading, setLoding] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    getUserInfo();
  }, []);
  const getUserInfo = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_APIADDRESS}/admin/allusers`
      );
      const userData = response.data.content;
      SetUsersData(userData);
      setLoding(false);
    } catch (error: any) {
      navigate("/");
      alert(error.response.data);
    }
  };

  const deleteUser = async (e: any) => {
    console.log("삭제하고자 하는 글 id", e.target.id);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_APIADDRESS}/admin/user/${e.target.id}`
      );
      getUserInfo();
      alert(response.data.message);
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
          <span>회원 수 : {usersData.length}</span>
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
                <th>회원 삭제</th>
              </tr>
            </thead>
            <tbody>
              {usersData
                ?.sort((a: any, b: any) => {
                  return b.id - a.id;
                })
                .map((user: any) => {
                  return (
                    <Row key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.nickname}</td>
                      <td>{user.role}</td>
                      <td>{user.univName}</td>
                      <td>{user.email}</td>
                      <td>{user.platformType}</td>
                      <td>{handleDateChange(user.regDate)}</td>
                      <td>{user.gptCount}</td>
                      <td id={user.id} onClick={deleteUser}>
                        삭제
                      </td>
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
  width: 70%;
  margin: auto;
  margin-top: 50px;
  height: 100vh;
  @media screen and (max-width: 800px) {
    width: 90%;
    font-size: 0.8rem;
  }
`;
