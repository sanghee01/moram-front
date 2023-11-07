import axios from "axios";
import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { Title, Table, Row } from "../../styles/TableStyles";

function AllPosts() {
  const [allPostsData, SetAllPostsData] = useState<null | any>(null);
  const [loading, setLoding] = useState(true);
  useEffect(() => {
    getAllPosts();
  }, []);
  const getAllPosts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_APIADDRESS}/admin/allposts`
      );
      const allPostsData = response.data.content;
      SetAllPostsData(allPostsData);
      setLoding(false);
      console.log("allposts:", allPostsData);
    } catch (error: any) {
      alert(error.response.data);
    }
  };
  return (
    <Container>
      <Title>작성된 글 목록</Title>
      {loading ? (
        <div>loading...</div>
      ) : (
        <>
          <span>총합 : {allPostsData.length}</span>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                {/* <th>닉네임</th> */}
                <th>제목</th>
                <th>작성시간</th>
                <th>태그</th>
                <th>카테고리</th>
              </tr>
            </thead>
            <tbody>
              {allPostsData.map((post: any) => {
                return (
                  <Row key={post.id}>
                    <td>{post.id}</td>
                    {/* <td>{post.nickname}</td> */}
                    <td>{post.title}</td>
                    <td>{post.writeTime}</td>
                    <td>{post.tag}</td>
                    <td>{post.category}</td>
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

export default AllPosts;

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
