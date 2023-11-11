import { styled } from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { categoryList as loadedCategory, tagList } from "../tagList";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../state";

function Write() {
  const [bigCategory, setBigCategory] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [tag, setTag] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [categoryList, setCategoryList] = useState<any>(loadedCategory);
  const [presignedUrl, setPresignedUrl] = useState<any>();
  const [imageUrl, setImageUrl] = useState<any>({
    img1Url: "",
    img2Url: "",
    img3Url: "",
  });
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const params = useParams();
  const postId: any = params?.id || "";
  const location = useLocation();
  const isEdit = postId;
  // console.log("ref:", postId);
  // console.log("loc:", location);
  // console.log("string:", JSON.stringify(postId));
  // console.log("isEdit:", isEdit);

  // 글 수정 페이지로 들어갈 시 처음에 input value값 설정하기
  useEffect(() => {
    if (isEdit) {
      //대분류 값을 얻기 위한 함수
      let foundCategory: any;
      for (const key in categoryList) {
        if (categoryList[key].includes(location.state.category)) {
          foundCategory = key;
          break;
        }
      }
      setBigCategory(foundCategory);
      setCategory(location.state.category);
      setTag(location.state.tag);
      setTitle(location.state.title);
      setContent(location.state.content);
      setImageUrl({
        img1Url: location.state.img1Url,
        img2Url: location.state.img2Url,
        img3Url: location.state.img3Url,
      });
    }
  }, [isEdit, location]);

  useEffect(() => {
    if (user) getBookmark();
  }, [user]);

  useEffect(() => {
    console.log("image url -> ", imageUrl);
  }, [imageUrl]);

  console.log(category, tag, title, content);

  const handleUploadImage = (e: any) => {
    setImageUrl({
      ...imageUrl,
      [e.target.name]: URL.createObjectURL(e.target.files[0]),
    });
  };

  const postPosting = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_APIADDRESS}/posting`,
        {
          title: title,
          content: content.replace(/\n/g, "<br/>"), //줄바꿈 구현을 위해 replace 함수 사용
          category: category,
          tag: tag,
          img1Url: imageUrl.img1Url,
          img2Url: imageUrl.img2Url,
          img3Url: imageUrl.img3Url,
        }
      );
      alert(response.data.message);
      navigate("/community?reload=true");
    } catch (error: any) {
      alert(error?.response?.data.message || "알 수 없는 오류 발생.");
    }
  };
  const editPosting = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_APIADDRESS}/posting/${postId}`,
        {
          title: title,
          content: content.replace(/\n/g, "<br/>"), //줄바꿈 구현을 위해 replace 함수 사용
          category: category,
          tag: tag,
          img1Url: imageUrl.img1Url,
          img2Url: imageUrl.img2Url,
          img3Url: imageUrl.img3Url,
        }
      );
      alert(response.data.message);
      navigate("/community");
    } catch (error: any) {
      alert(error?.response?.data.message || "알 수 없는 오류 발생.");
    }
  };

  const getBookmark = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_APIADDRESS}/bookmark/category`
      );
      setCategoryList((prev: any) => {
        const prevList = { ...prev }; // 이전 상태를 복사
        prevList["즐겨찾는 학과"] = response.data.content;
        return prevList;
      });
    } catch (error: any) {
      console.log(error?.response?.data?.message || "알 수 없는 에러 발생");
    }
  };

  // TODO: 이미지 올리기 구현
  // 백엔드에서 PresignedUrl, imageUrl 받아옴
  useEffect(() => {
    getPresignedUrl();
  }, []);

  const getPresignedUrl = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_APIADDRESS}/posting/imgurl`
      );

      setPresignedUrl(response.data.content.presignedUrl);
      console.log("pre", response.data.content.presignedUrl);
    } catch (error: any) {
      console.log(error?.response?.data?.message || "알 수 없는 에러 발생");
    }
  };
  console.log("hi", presignedUrl);

  // 작성완료 버튼 누를 시 업로드 로직
  const uploadImage = async () => {
    try {
      const response = await axios.put(presignedUrl, imageUrl.img1url, {
        headers: {
          "Content-Type": imageUrl.img1url.type as any,
        },
      });
      console.log("Image uploaded:", response.status);
    } catch (error: any) {
      console.error(error?.response?.data?.message || "알 수 없는 에러 발생");
    }
  };

  return (
    <Container>
      {isEdit ? <Title>글 수정</Title> : <Title>글 작성</Title>}
      <form
        onSubmit={(e: any) => {
          e.preventDefault();
          uploadImage();
          isEdit ? editPosting() : postPosting();
        }}
      >
        <FormBox>
          <label htmlFor="category">학과</label>
          <select
            id="category"
            onChange={(e: any) => setBigCategory(e.target.value)}
            value={bigCategory}
          >
            <option>대분류 선택</option>
            {Object.keys(categoryList).map((item: any) => {
              return <option key={item}>{item}</option>;
            })}
          </select>
          <select
            onChange={(e: any) => setCategory(e.target.value)}
            value={category}
          >
            <option>소분류 선택</option>
            {categoryList[bigCategory]?.map((item: any) => {
              return <option key={item}>{item}</option>;
            })}
          </select>
          <label htmlFor="tag">태그</label>
          <select
            id="tag"
            onChange={(e: any) => setTag(e.target.value)}
            value={tag}
          >
            <option>태그 선택</option>
            {tagList.map((item: any) => {
              return <option key={item}>{item}</option>;
            })}
          </select>
        </FormBox>
        <FormBox>
          <label htmlFor="title">제목</label>
          <input
            id="title"
            onChange={(e: any) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요."
            value={title}
          />
          <label htmlFor="content">본문</label>
          <textarea
            id="content"
            onChange={(e: any) => setContent(e.target.value)}
            placeholder="내용을 입력하세요."
            value={content}
          />
          <label htmlFor="img1Url">이미지 업로드</label>
          <UploadImgBox>
            <input
              type="file"
              name="img1Url"
              accept="image/*"
              onChange={handleUploadImage}
            />
            <input
              type="file"
              name="img2Url"
              accept="image/*"
              onChange={handleUploadImage}
            />
            <input
              type="file"
              name="img3Url"
              accept="image/*"
              onChange={handleUploadImage}
            />
          </UploadImgBox>
          <ShowImgBox>
            {imageUrl.img1Url && <ShowImg src={imageUrl.img1Url} />}
            {imageUrl.img2Url && <ShowImg src={imageUrl.img2Url} />}
            {imageUrl.img3Url && <ShowImg src={imageUrl.img3Url} />}
          </ShowImgBox>
          {user ? (
            <button type="submit">{isEdit ? "수정완료" : "작성완료"}</button>
          ) : (
            <button style={{ background: "gray" }}>로그인 필요</button>
          )}
        </FormBox>
      </form>
    </Container>
  );
}

const Container = styled.div`
  width: 50%;
  margin: auto;
  margin-top: 50px;
`;

const Title = styled.h3`
  margin-bottom: 20px;
  padding-bottom: 10px;
  font-size: 1.3rem;
  font-weight: 500;
  border-bottom: 1px solid gray;
`;

const FormBox = styled.section`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: whitesmoke;
  border-radius: 10px;
  & label {
    font-size: 0.9rem;
    margin: 5px;
  }
  &:first-child {
    & select {
      background-color: white;
      color: #454040c3;
      padding: 5px;
      margin-bottom: 5px;
      border: 1px solid #e2e0e0;
      border-radius: 8px;
    }
  }
  &:last-child {
    margin-top: 10px;
    & input {
      border-radius: 8px;
      padding: 8px;
      background-color: white;
      border: 1px solid #e2e0e0;
      margin-bottom: 5px;
    }
    & textarea {
      width: 100%;
      height: 300px;
      resize: none;
      border-radius: 8px;
      padding: 8px;
      background-color: white;
      border: 1px solid #e2e0e0;
      margin-bottom: 5px;
    }
    & button {
      cursor: pointer;
      margin-top: 30px;
      padding: 14px;
      background-color: #0e2b49;
      border-radius: 30px;
      border: none;
      font-size: 15px;
      font-weight: bold;
      color: white;
      &:hover {
        filter: contrast(200%);
      }
      &:disabled {
        background-color: lightgray;
      }
      transition: all 0.2s;
    }
  }
`;
const ShowImg = styled.img`
  height: 150px;
`;
const UploadImgBox = styled.div`
  display: flex;
  gap: 10px;
  & input {
    width: 30%;
  }
`;
const ShowImgBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export default Write;
