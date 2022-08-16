import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../app/modules/LoginSlice";

const Login = () => {

const dispatch = useDispatch();
const [loginForm, setLoginForm] = useState(false);

const onClickLoginForm = () => {
    setLoginForm((status)=>(!status));
};

const [login, setLogin] = useState({
    email:"",
    password:""
});
const onChangeHandler = (event) => {
    const {name, value} = event.target;
    setLogin({...login, [name]:value})
};

const navigate = useNavigate();

//유효성
const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

const [emailValid, setEmailValid] = useState();
    const onFocusEmailValid = (event) => {
    setEmailValid(true)
};
    const onBlurEmailValid = (event) => {
    setEmailValid(false)
};

//로그인 정보 일치/불일치 여부에 따라

const onSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(loginThunk(login))
};

    return (
        <div>
        <h1>메인페이지가 될겁니다</h1>
        <h3>회원이 아닙니까? 회원가입하러 가기</h3>
        <button onClick={() => {
            navigate("/signup")
        }}>회원가입</button>
        <h3>이미 회원입니까? 로그인하러 가기</h3>
        <button onClick={onClickLoginForm}>로그인</button>
        {loginForm ? <div>
            <form onSubmit={onSubmitHandler}>
            <p>아이디(e-mail)</p>
            <input onFocus={onFocusEmailValid} onBlur={onBlurEmailValid} onChange={onChangeHandler} name="email" type="text"/>
            {(emailValid === true) && (login.email.match(emailRegEx) === null) ? <p className="incorrect">&#10006;올바른 이메일 형식이 아닙니다</p>
                : (emailValid === false) && (login.email.match(emailRegEx) === null) ? <p className="incorrect">&#10006;올바른 이메일 형식이 아닙니다</p>
                : null
            }
            <p>패스워드</p>
            <input onChange={onChangeHandler} name="password" type="password"/>
            <p>
            <button>로그인</button>
            <button onClick={onClickLoginForm}>취소</button>
            </p>
            </form>
            </div> : null}
        </div>
    )
};
export default Login;