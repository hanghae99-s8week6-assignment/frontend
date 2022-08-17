import { useState, useEffect } from "react";
import styled from "styled-components";
import Reply from "./Reply";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as SolidHeart,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as RegularHeart } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addCommentData, getCommentData } from "../app/modules/CommentSlice";
import { deletePostAysnc, pickPostAysnc } from "../app/modules/postSlice";
import { getLikedFetch, toggleLikedFetch } from "../app/modules/likedSlice";
import { useNavigate, useParams } from "react-router-dom"; 
import Gravatar from 'react-gravatar';

function Contents() {
  const commentInitialState = {
    userName: "",
    email: "",
    content: "",
  };

  const [comment, setComment] = useState(commentInitialState);
  const [refresh, setRefresh] = useState(false);
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.userLogin?.userLogin[0]);
  const postData = useSelector((state) => state.posts);
  const commentData = useSelector((state) => state.comment);
  const likedCheck = useSelector((state) => state.liked);

  useEffect(()=> {
    dispatch(pickPostAysnc(Number(id)))
    setRefresh(false);
  }, [dispatch, refresh]);

  useEffect(()=> {
    dispatch(getCommentData(Number(id)))
  },[dispatch])

  useEffect(() => {
    if (userData !== undefined && userData !== null)
      dispatch(getLikedFetch(userData.email));
  },[dispatch])

  function changeComment(event) {
    setComment({ ...comment, content: event.target.value });
  }

  function submitComment(event) {
    event.preventDefault();
    if (comment.content.length === 0)
      return;

    const CommentData = {
      postId: postData.postId,
      comment:{...comment, userName: userData.userName, email: userData.email}
    }

    dispatch(addCommentData(CommentData));
    setRefresh(true);
    setComment(commentInitialState);
  }

  function moveToPrev() {
    navigate(-1);
  }

  function clickToLiked(event) {
    const payload = {
      postId: postData.postId,
      email:userData.email,
      isClick: (!likedCheck.isClick)
    }
    dispatch(toggleLikedFetch(payload))
    setRefresh(true);
    setLiked(!liked)
    // liked = 사람들이 좋아요 누른 횟수.
    // result = 정상적으로 숫자를 포함했는가..
    // 그러면 내가 이 글에 좋아요 찍었습니다 체크하는 게 어디려나..? 저 위의 post와는 다를려나?
    // post 자체에서 보내준다고 한다면.. state.post를 거쳐야할 것 같은데?
    // 그러면 이거 업데이트를 해야하지 않나... 대은님 + 승남님하고 이야기해볼 필요 있을 듯
    // false이면 addpostData에서 liked+1을 넣어주고 , axios를 통해 payload를 전달함.
    // true이면 addpostData에서 liked-1을 넣어주고, axios를 통해 payload를 전달함.

    // 받아온 유저 정보를 통해서 email을 전달해줌으로서 liked 표시가 다르게 나오도록.
    // 근데, 이거 페이지 열었을 때 최초의 상태는 어떻게 체크할 것인지?
  }

  function deletePost(event) {
    event.preventDefault();
    dispatch(deletePostAysnc(Number(id)));
    navigate("/");
    // 받아오는 id를 체크해서 글 삭제해주고 main으로 navigate 시켜주도록 함.
  }

  return (
    <>
      <ContentsContainer>
        {postData === null || postData === undefined || postData.length === 0 ? (
          <LoadingDiv> 로딩중입니다... </LoadingDiv>
        ) : (
          <>
            <ImageBox>
              <FontAwesomeIcon
                style={BackArrow}
                icon={faArrowLeft}
                onClick={moveToPrev}
              />
              <Image src={postData.Images} alt="user's hometraining image" />
            </ImageBox>
            <ContentsBox>
              <ProfileBar>
                <Gravatar
                  style={ProfileImage}
                  default="identicon"
                  email="a-email@example.com"
                />
                <ProfileUserName>{postData.userName}</ProfileUserName>
                {likedCheck.isClick === true ? (
                  <LikedButton onClick={clickToLiked}>
                    <FontAwesomeIcon icon={SolidHeart} style={likedStyleSet} />
                  </LikedButton>
                ) : (
                  <LikedButton onClick={clickToLiked}>
                    <FontAwesomeIcon icon={RegularHeart} style={likedStyleSet} />
                  </LikedButton>
                )}
                <LikedCounter>{postData.liked}</LikedCounter>
                {/* email 주소 받아와줌으로서 체크할 수 있도록 함. */}
              </ProfileBar>
              <Substance>
                <h3>{postData.title}</h3>
                <p>
                  {postData.content}
                </p>
              </Substance>
              <ButtonBox>
                {userData === undefined || userData === null || userData.email !== postData.email ? <></> : 
                  <DeleteBtn onClick={deletePost}>
                    <FontAwesomeIcon icon={faXmark} />
                  </DeleteBtn>}
                {/* 유저 이름 같을 때 나오게 하고, 아니면 출력 삭제. */}
              </ButtonBox>
              <Reply setRefresh={setRefresh} commentList={commentData} postData={postData} />
              <InputBox onSubmit={submitComment}>
                <CommentInput
                  onChange={changeComment}
                  value={comment.content}
                  placeholder="댓글 달기..."
                />
                <CommentBtn
                  color={comment.content.length !== 0 ? "#274C77" : "#A3CEF1"}
                  cursor={comment.content.length !== 0 ? "pointer" : "arrow"}
                  type="submit"
                >
                  게시
                </CommentBtn>
              </InputBox>
            </ContentsBox>
          </>
        )}
      </ContentsContainer>
    </>
  );
}

const ContentsContainer = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.state === null ? "1fr" : "1.3fr 1fr"};
  justify-content: center;

  position: relative;

  height: 70vh;

  box-sizing: border-box;
  box-shadow: 0 20px 30px 0 #121212;
`;

const LoadingDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  color: #ffffff;
  font-size: 2rem;
`;

const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: black;
`;

const Image = styled.img`
  width: 100%;
`;

const ContentsBox = styled.div`
  background: #e7ecef;

  border-radius: 0 10px 10px 0;

  min-width: 490px;
`;

const ProfileBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.7rem;

  border-bottom: 2px solid #000000;
  margin: 0 1rem;
  padding: 0.2rem 0.5rem;

  height: 7vh;
`;

const ProfileUserName = styled.span`
  color: #000000;
`;

const LikedButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;

  border: none;
  outline: none;
  padding: 0;
  margin-left: auto;

  height: 6vh;
  cursor: pointer;
`;

const LikedCounter = styled.span`
  color: #ee5162;
`;

const Substance = styled.div`
  color: #000000;
  text-align: left;

  margin: 1rem;
  padding: 0 1rem;
  height: 36vh;

  overflow: scroll;
  box-sizing: border-box;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  margin: 0 1rem;

  height: 1.5vh;
`;

const DeleteBtn = styled.button`
  background: none;

  font-size: 1.5rem;
  color: red;

  border: none;
  outline: none;
  margin-left: auto;

  cursor: pointer;
`;

const InputBox = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;

  border-top: 2px solid #000000;

  min-width: 440px;
  margin: 0 1rem;
  height: 6vh;
`;

const CommentInput = styled.input`
  background: none;

  color: #000000;
  font-size: 16px;

  border: none;
  outline: none;
  padding-left: 20px;

  min-width: 390px;
`;

const CommentBtn = styled.button`
  background: none;

  border: none;
  font-weight: 700;
  color: ${(props) => props.color};

  cursor: ${(props) => props.cursor};
`;

// style object

const ProfileImage = {
  width: "5vh",
  height: "5vh",

  border: "2px solid #274C77",
  borderRadius: "30px",
};

const BackArrow = {
  position: "absolute",
  fontSize: "2rem",
  color: "white",
  top: "15",
  left: "15",
  cursor: "pointer",
};

const likedStyleSet = {
  color: "#ee5162",
  fontSize: "1.5rem",

  margin: "auto",

  cursor: "pointer",
  pointerEvents: "none",
};

export default Contents;
