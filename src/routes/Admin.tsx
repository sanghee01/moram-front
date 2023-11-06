import axios from "axios";
import { styled } from "styled-components";
import { useEffect } from "react";

function Admin() {
  useEffect(() => {
    getUserInfo();
  }, []);
  const getUserInfo = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_APIADDRESS}/admin/allusers`
      );
      const userData = response.data;
      console.log("gi", userData);
    } catch (error: any) {
      alert(error.response.data);
    }
  };
  return (
    <Container>
      <h2>회원정보</h2>
    </Container>
  );
}

export default Admin;

const Container = styled.div``;
