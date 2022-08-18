import React, { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import {
  PostsPageWrap,
  PostContainer,
  Title,
  Card,
  CardText,
  CardImage,
  LinkToDetail,
} from "./styles";
import { useSelector } from "react-redux";

import Paging from "../../components/Paging/Paging";
import { Link } from "react-router-dom";

const Posts = () => {
  const [currentPosts, setCurrentPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [postPerPage] = useState(9);

  const indexOfLastPost = page * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;

  const handlePageChange = (page) => {
    setPage(page);
  };

  const postData = useSelector((state) => state.posts.data?.Post);

  useEffect(() => {
    setCurrentPosts(postData?.slice(indexOfFirstPost, indexOfLastPost));
  }, [indexOfFirstPost, indexOfLastPost]);

  return (
    <>
      <Header />
      <PostsPageWrap>
        <Title>프로젝트 홈트</Title>
        <PostContainer>
          {currentPosts?.map((post) => {
            return (
              <LinkToDetail to={`/detail/${post.postId}`} key={post.postId}>
                <Card>
                  <CardText>
                    <div>{post.userName}</div>
                    {post.title.length < 7 ? (
                      <div>{post.title}</div>
                    ) : (
                      <div>{post.title?.slice(0, 6)}...</div>
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
              </LinkToDetail>
            );
          })}
        </PostContainer>
        <Paging
          totalCount={postData?.length}
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
