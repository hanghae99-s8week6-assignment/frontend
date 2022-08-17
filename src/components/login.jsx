import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../app/modules/LoginSlice";
import "../css/login.css";

const Login = () => {
  const dispatch = useDispatch();

  const Loginerror = useSelector((state)=>
    state.userLogin
  );
  
  

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setLogin({ ...login, [name]: value });
  };

  const navigate = useNavigate();

  //유효성
  const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

  const [emailValid, setEmailValid] = useState();
  const onFocusEmailValid = (event) => {
    setEmailValid(true);
  };
  const onBlurEmailValid = (event) => {
    setEmailValid(false);
  };

  //로그인 정보 일치/불일치 여부에 따라

  const onSubmitHandler = (event) => {
    dispatch(loginThunk(login))
    event.preventDefault()
  };
  if (Loginerror?.userLogin?.length > 0) {
    navigate('/')
  };
  
  return (
    <div className="backgroundImg">
      <div className="header">
        <h1>Login / Sign-Up Page</h1>
      </div>
      <div className="container">
        <h3>LOGIN</h3>
          <div>
            <form onSubmit={onSubmitHandler}>
              <p>아이디(e-mail)</p>
              <input
                className="loginInputs"
                onFocus={onFocusEmailValid}
                onBlur={onBlurEmailValid}
                onChange={onChangeHandler}
                name="email"
                type="text"
              />
              {emailValid === true && login.email.match(emailRegEx) === null ? (
                <p className="incorrect">
                  &#10006;올바른 이메일 형식이 아닙니다
                </p>
              ) : emailValid === false &&
                login.email.match(emailRegEx) === null ? (
                <p className="incorrect">
                  &#10006;올바른 이메일 형식이 아닙니다
                </p>
              ) : null}
              <p>패스워드</p>
              <input
                className="loginInputs"
                onChange={onChangeHandler}
                name="password"
                type="password"
              />
              <p>
                <button className="button3">로그인</button>
                <button className="button4" onClick={()=>navigate('/')}>
                  취소
                </button>
              </p>
            </form>
          </div>
        <h3>회원이 아닙니까?</h3>
        <button className="button1" onClick={() => navigate("/signup")}>
          회원가입
        </button>
      </div>
    </div>
  );
};
export default Login;