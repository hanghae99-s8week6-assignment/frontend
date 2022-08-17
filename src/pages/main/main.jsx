import React, { useCallback, useEffect, useState } from "react";
import Header from "../../components/common/Header";
import {
  Body,
  BodyWrapper,
  WriteButton,
  CardWrapper,
  Cards,
  HeadWrap,
} from "./styles";
import Modal from "../../components/Modal/Modal";
import PostModal from "../../components/PostModal/PostModal";
import { useDispatch, useSelector } from "react-redux";
import { getPostAysnc } from "../../app/modules/postSlice";
import { LinkTo } from "../../components/common/styles";

function Main() {
  const [showWriteModal, setShowWriteModal] = useState(false);

  const dispatch = useDispatch();
  const Posts = useSelector((state) => state.posts.data?.Post);
  const userData = useSelector((state) => state.userLogin?.userLogin[0]);

  const liked = Posts?.slice()
    .sort((a, b) => b.liked - a.liked)
    .slice(0, 10);

  console.log("re");
  useEffect(() => {
    dispatch(getPostAysnc());
  }, []);
  const onShowWriteModal = useCallback(() => {
    setShowWriteModal(true);
    console.log(showWriteModal);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowWriteModal(false);
    console.log(showWriteModal);
  }, []);

  return (
    <>
      <Header />
      <Body>
        <BodyWrapper>
          <HeadWrap>
            <h3>최근 올라온 게시글이에요!</h3>
            {userData?.email ? (
              <WriteButton onClick={onShowWriteModal}>글쓰기</WriteButton>
            ) : null}
          </HeadWrap>
          <CardWrapper>
            {Posts?.map((post) => {
              return (
                <LinkTo to={`/detail/${post.postId}`}>
                  <Cards key={post.postId}>
                    {post.Images ? (
                      <img src={post.Images} alt={post.title} />
                    ) : (
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgUbWShDanJ7FLzI0xAx0dCrIxbmHfX7_8sg&usqp=CAU"
                        alt={post.title}
                      />
                    )}
                    <span>{post?.userName}</span>
                    {post.title.length < 14 ? (
                      <div>{post.title}</div>
                    ) : (
                      <div>{post.title.slice(0, 12)} ...</div>
                    )}
                  </Cards>
                </LinkTo>
              );
            })}
          </CardWrapper>
        </BodyWrapper>
        <BodyWrapper>
          <h3>현재 인기있는 게시물이에요!</h3>
          <CardWrapper>
            {liked?.map((post) => {
              return (
                <LinkTo to={`/detail/${post.postId}`}>
                  <Cards key={post.postId}>
                    {post.Images ? (
                      <img src={post.Images} alt={post.title} />
                    ) : (
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgUbWShDanJ7FLzI0xAx0dCrIxbmHfX7_8sg&usqp=CAU"
                        alt={post.title}
                      />
                    )}
                    <span>{post?.userName}</span>

                    {post.title.length < 14 ? (
                      <div>{post.title}</div>
                    ) : (
                      <div>{post.title.slice(0, 12)} ...</div>
                    )}
                  </Cards>
                </LinkTo>
              );
            })}
          </CardWrapper>
        </BodyWrapper>
        <Modal show={showWriteModal} onCloseModal={onCloseModal}>
          <PostModal setShowWriteModal={setShowWriteModal} />
        </Modal>
      </Body>
    </>
  );
}

export default Main;
