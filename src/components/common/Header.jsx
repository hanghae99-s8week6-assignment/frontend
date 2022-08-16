import React, { useCallback, useState } from "react";
import {
  HeaderWrapper,
  LinkToHome,
  ProfileModal,
  LogOutButton,
  ProfileImg,
} from "./styles";
import Menu from "../Menu/Menu";


const Header = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const onClickUserProfile = useCallback((e) => {
    e.stopPropagation();
    setShowUserMenu((prev) => !prev);
    console.log(showUserMenu);
  }, []);

  const onCloseModal = useCallback(() => {
    setShowUserMenu(false);
    console.log(showUserMenu);
  }, []);

  const onLogOut = useCallback(() => {}, []);
  return (
    <div>
      <HeaderWrapper>
        <LinkToHome to="/">프로젝트 홈트</LinkToHome>
        <div onClick={onClickUserProfile}>프로필 이미지 버튼</div>
        {showUserMenu && (
          <Menu show={showUserMenu} onCloseModal={onCloseModal}>
            <ProfileModal>
              {/* <img src={gravatar.url(userData.email, { s: '28px', d: 'retro' })} alt={userData.nickname} /> */}
              <div>
                <span id="profile-menu">내 프로필</span>
                <LogOutButton onClick={onLogOut}>로그아웃</LogOutButton>
              </div>
            </ProfileModal>
          </Menu>
        )}
      </HeaderWrapper>
    </div>
  );
};

export default Header;
