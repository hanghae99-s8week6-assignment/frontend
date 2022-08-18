import React, { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import {
  PostsPageWrap,
  PostContainer,
  Title,
  Card,
  CardText,
  CardImage,
} from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { getPostAysnc } from "../../app/modules/postSlice";
import Paging from "../../components/Paging/Paging";

const Posts = () => {
  const [currentPosts, setCurrentPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [postPerPage] = useState(9);

  const indexOfLastPost = page * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;

  const handlePageChange = (page) => {
    setPage(page);
  };

  const dispatch = useDispatch();

  const postData = useSelector((state) => state.posts.data?.Post);

  useEffect(() => {
    setCurrentPosts(postData.slice(indexOfFirstPost, indexOfLastPost));
  }, [indexOfFirstPost, indexOfLastPost]);

  useEffect(() => {
    dispatch(getPostAysnc());
  }, []);

  console.log("post:", postData);
  return (
    <>
      <Header />
      <PostsPageWrap>
        <Title>프로젝트 홈트</Title>
        <PostContainer>
          {currentPosts?.map((post) => {
            return (
              <Card>
                <CardText>
                  <div>{post.userName}</div>
                  {post.title.length < 12 ? (
                    <div>{post.title}</div>
                  ) : (
                    <div>{post.title.slice(0, 11)}...</div>
                  )}
                </CardText>
                {post.Images ? (
                  <CardImage src={post.Images} alt={post.title} />
                ) : (
                  <CardImage
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgUbWShDanJ7FLzI0xAx0dCrIxbmHfX7_8sg&usqp=CAU"
                    alt={post.title}
                  />
                )}
              </Card>
            );
          })}
        </PostContainer>
        <Paging
          totalCout={postData.length}
          page={page}
          postPerPage={postPerPage}
          pageRangeDisplayed={5}
          handlePageChange={handlePageChange}
        />
      </PostsPageWrap>
    </>
  );
};

export default Posts;
