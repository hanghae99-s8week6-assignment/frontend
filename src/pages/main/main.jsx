import React, { useCallback, useEffect, useState } from "react";
import Header from "../../components/common/Header";
import {
  Body,
  BodyWrapper,
  WriteButton,
  CardWrapper,
  Cards,
  HeadWrap,
  LatesButton,
  LikedButton,
} from "./styles";
import Modal from "../../components/Modal/Modal";
import PostModal from "../../components/PostModal/PostModal";
import { useDispatch, useSelector } from "react-redux";
import { getPostAysnc } from "../../app/modules/postSlice";
import { LinkTo } from "../../components/common/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

function Main() {
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [topslidePx, setTopSlidePx] = useState(0);
  const [botslidePx, setBotSlidePx] = useState(0);

  const dispatch = useDispatch();
  const Posts = useSelector((state) => state.posts.data?.Post);
  const userData = useSelector((state) => state.userLogin?.userLogin[0]);

  useEffect(() => {
    dispatch(getPostAysnc());
  }, []);

  const liked = Posts?.slice()
    .sort((a, b) => b.liked - a.liked)
    .slice(0, 10);
  const latesd = Posts?.slice(0, 24);

  const topPrevSlide = () => {
    if (topslidePx < 0) setTopSlidePx(topslidePx + 1632);
  };
  const topNextSlide = () => {
    if (topslidePx > -3266) setTopSlidePx(topslidePx - 1632);
  };
  const botPrevSlide2 = () => {
    if (botslidePx < 0) setBotSlidePx(botslidePx + 1632);
  };
  const botPnextSlide2 = () => {
    if (botslidePx > -1632) setBotSlidePx(botslidePx - 1632);
  };

  const onShowWriteModal = useCallback(() => {
    setShowWriteModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowWriteModal(false);
  }, []);

  return (
    <>
      <Header />
      <Body>
        <BodyWrapper>
          <HeadWrap>
            <h3>최근 올라온 게시글이에요!</h3>
            {userData?.email ? (
              <WriteButton onClick={onShowWriteModal}>작성</WriteButton>
            ) : null}
          </HeadWrap>
          <LatesButton>
            <button onClick={topPrevSlide}>
              <FontAwesomeIcon icon={faAngleLeft} size="4x" />
            </button>
            <button onClick={topNextSlide}>
              <FontAwesomeIcon icon={faAngleRight} size="4x" />
            </button>
          </LatesButton>

          <CardWrapper>
            {latesd?.map((post) => {
              return (
                <LinkTo to={`/detail/${post.postId}`} key={post.postId}>
                  <Cards
                    style={{
                      transform: `translateX(${topslidePx}px)`,
                      transition: "0.5s ease",
                    }}
                  >
                    {post.Images ? (
                      <img src={post.Images} alt={post.title} />
                    ) : (
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgUbWShDanJ7FLzI0xAx0dCrIxbmHfX7_8sg&usqp=CAU"
                        alt={post.title}
                      />
                    )}
                    <span>{post?.userName}</span>
                    {post.title.length < 12 ? (
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
          <LikedButton>
            <button onClick={botPrevSlide2}>
              <FontAwesomeIcon icon={faAngleLeft} size="4x" />
            </button>
            <button onClick={botPnextSlide2}>
              <FontAwesomeIcon icon={faAngleRight} size="4x" />
            </button>
          </LikedButton>

          <CardWrapper>
            {liked?.map((post) => {
              return (
                <LinkTo to={`/detail/${post.postId}`} key={post.postId}>
                  <Cards
                    style={{
                      transform: `translateX(${botslidePx}px)`,
                      transition: "0.5s ease",
                    }}
                  >
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
