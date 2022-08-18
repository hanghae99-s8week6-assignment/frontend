import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { deleteCommentData } from "../app/modules/CommentSlice";

function Reply ({setRefresh, commentList, postData }) {
  const dispatch = useDispatch();
  const [, setYeah] = useState("asdg")

  const userData = useSelector((state) => state.userLogin?.userLogin[0]);

  const deleteComment = (event) => {
    event.preventDefault();
    const idData = {
      postId: postData.postId,
      commentId: Number(event.target.id)
    }
    dispatch(deleteCommentData(idData));
    setRefresh(true)
    setYeah("")
  }

  return (
    <>
      <ReplyContainer>
        {commentList === undefined || commentList === null ?
          <GuideText>로딩중입니다..</GuideText> : 
          commentList.length === 0 || commentList === undefined ?
            <GuideText>등록된 댓글이 없습니다.</GuideText> :
            commentList.map(elem => {
              return <ReplyList key={elem.commentId}>
                <ReplyName>{elem.userName}</ReplyName>
                <ReplyComment>{elem.content}</ReplyComment>
                {userData === undefined || userData.email !== elem.email ? <></> : <ReplyDeleteBtn type="button" id={elem.commentId} onClick={deleteComment}>
                {/* email 주소와 동일하면 해당 값 체크해주도록 함. */}
                <FontAwesomeIcon style={{pointerEvents:"none"}} icon={faTrashCan}/> </ReplyDeleteBtn> }
              </ReplyList>})}
      </ReplyContainer>
    </>
  )
}

const ReplyContainer = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  
  text-align: left;

  color: #000000;

  border-top:2px solid #000000;
  margin: 0 1rem;
  padding: 0 1rem;

  height: 30vh;
  overflow: scroll;
`

const GuideText = styled.div`
  font-size: 1.6rem;
  color: #000000;
  margin: 5rem auto;
`

const ReplyList = styled.div`
  margin: 0.3rem 0;
`

const ReplyName = styled.span`
  font-weight: 700;
  font-size: 0.8rem;
  margin-right: 1rem;
`

const ReplyComment = styled.span`
  font-size: 0.8rem;
`

const ReplyDeleteBtn = styled.button`
  background: none;

  color: #000000;

  border: none;
  outline: none;

  z-index: 10;
  cursor:pointer;
`

export default Reply;