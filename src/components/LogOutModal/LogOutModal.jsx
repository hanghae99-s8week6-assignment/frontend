import React, { useCallback } from "react";
import { LogOutModalWrap, ButtonWrap } from "./style";
import { CloseModalButton } from "../Menu/styles";
import { logoutAsync } from "../../app/modules/LoginSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const LogOutModal = ({ setShowLogOutModal, onCloseModal }) => {
  const dispatch = useDispatch();
  const noneLogout = useCallback(() => {
    setShowLogOutModal(false);
  }, []);

  const navigate = useNavigate();
  const onLogOut = useCallback(() => {
    dispatch(logoutAsync());
    localStorage.removeItem("user");
    navigate("/");
  }, []);

  return (
    <LogOutModalWrap onClick={onCloseModal}>
      <div>
        <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>
        <span>로그아웃 하시겠습니까?</span>
        <ButtonWrap>
          <button onClick={onLogOut}>네</button>
          <button onClick={noneLogout}>아니요</button>
        </ButtonWrap>
      </div>
    </LogOutModalWrap>
  );
};

export default LogOutModal;
