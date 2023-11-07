import axios from "axios";
import { styled } from "styled-components";
import { useEffect, useState } from "react";

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
      const allPostsData = response.data;
      SetAllPostsData(allPostsData);
      setLoding(false);
      console.log("allposts:", allPostsData);
    } catch (error: any) {
      alert(error.response.data);
    }
  };
  return <>hi</>;
}

export default AllPosts;
