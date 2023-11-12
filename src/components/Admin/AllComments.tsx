import axios from "axios";
import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { Title, Table, Row } from "../../styles/TableStyles";
import { handleDateChange } from "../../dateChange";
import { useNavigate } from "react-router-dom";

function AllComments() {
  const [allCommentsData, SetAllCommentsData] = useState<null | any>(null);
  const [loading, setLoding] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAllComments();
  }, []);

  const getAllComments = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_APIADDRESS}/admin/allcomments`
      );
      const allCommentsData = response.data.content;
      SetAllCommentsData(allCommentsData);
      setLoding(false);
    } catch (error: any) {
      alert(error.response.data);
    }
  };
  return (
    <Container>
      <Title>작성된 댓글 목록</Title>
      {loading ? (
        <div>loading...</div>
      ) : (
        <>
          <span>총합 : {allCommentsData.length}</span>
          <Table>
            <thead>
              <tr>
                <th>postId</th>
                <th>작성자</th>
                <th>내용</th>
                <th>작성시간</th>
              </tr>
            </thead>
            <tbody>
              {allCommentsData.map((comment: any) => {
                return (
                  <Row
                    key={comment.id}
                    onClick={() => navigate(`/community/${comment.postId}`)}
                  >
                    <td>{comment.postId}</td>
                    <td>{comment.nickname}</td>
                    <td>{comment.content}</td>
                    <td>{handleDateChange(comment.writeTime)}</td>
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

export default AllComments;

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
