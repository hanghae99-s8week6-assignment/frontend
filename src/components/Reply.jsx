import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { deleteCommentData } from "../app/modules/CommentSlice";
import { useEffect, useState } from "react";


function Reply ({setRefresh}) {
  const state = useSelector(state => state.comment);
  const dispatch = useDispatch();
  const [go, setGo] = useState(false)

  useEffect (()=>{
    setGo(false)
  },[go])


  const deleteComment = (event) => {
    event.preventDefault();
    console.log(event.target.id);
    dispatch(deleteCommentData(Number(event.target.id)));
    setRefresh(true)
    setGo(true)
  }

  return (
    <>
      <ReplyContainer>
        {state === undefined ?
          <GuideText>로딩중입니다..</GuideText> : 
          state.length === 0 ?
            <GuideText>등록된 댓글이 없습니다.</GuideText> :
            state.map(elem => {
              return <ReplyList key={elem.commentId}>
                <ReplyName>{elem.userName}</ReplyName>
                <ReplyComment>{elem.content}</ReplyComment>
                {elem.userName !== "" ?<ReplyDeleteBtn type="button" id={elem.id} onClick={deleteComment}>
                {/* email 주소와 동일하면 해당 값 체크해주도록 함. */}
                <FontAwesomeIcon style={{pointerEvents:"none"}} icon={faTrashCan}/> </ReplyDeleteBtn> : ""}
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