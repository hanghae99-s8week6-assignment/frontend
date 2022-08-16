import React, { useCallback, useEffect, useState } from "react";
import Header from "../../components/common/Header";
import {
  Body,
  BodyWrapper,
  WriteButton,
  CardWrapper,
  Cards,
  headWrap,
} from "./styles";
import Modal from "../../components/Modal/Modal";
import PostModal from "../../components/PostModal/PostModal";
import { useDispatch, useSelector } from "react-redux";
import { getPostAysnc } from "../../app/modules/postSlice";

const Main = () => {
  const [showWriteModal, setShowWriteModal] = useState(false);

  const dispatch = useDispatch();
  const Posts = useSelector((state) => state.posts.data);
  console.log(Posts);
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
          <headWrap>
            <h3>최근 올라온 게시글이에요!</h3>
            <WriteButton onClick={onShowWriteModal}>글쓰기</WriteButton>
          </headWrap>
          <CardWrapper>
            {/* {Posts?.map((post) => {
              return (
                <Cards>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt0HlFB3ZUoS7vrNd01tsd8A1ep2UenMvCEg&usqp=CAU"></img>
                  <span>유저닉네임</span>
                  <div>{post.title}</div>
                </Cards>
              );
            })} */}{" "}
            <Cards>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt0HlFB3ZUoS7vrNd01tsd8A1ep2UenMvCEg&usqp=CAU"></img>
              <span>작성자</span>
              <div>아 근데 너무 졸린데</div>
            </Cards>
          </CardWrapper>
        </BodyWrapper>
        <BodyWrapper>
          <h3>현재 인기있는 게시물이에요!</h3>
          <CardWrapper>
            <Cards>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt0HlFB3ZUoS7vrNd01tsd8A1ep2UenMvCEg&usqp=CAU"></img>
              <span>작성자</span>
              <div>아 근데 너무 졸린데</div>
            </Cards>
          </CardWrapper>
        </BodyWrapper>
        <Modal show={showWriteModal} onCloseModal={onCloseModal}>
          <PostModal />
        </Modal>
      </Body>
    </>
  );
};

export default Main;
