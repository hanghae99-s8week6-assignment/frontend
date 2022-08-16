import React,{useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpThunk } from "../app/modules/SignUpSlice";
import { useNavigate } from "react-router-dom";
import "../css/signup.css"


const SignUp = () => {


const dispatch = useDispatch();
const navigate = useNavigate();

const errormessage = useSelector(
    (state) => state.signUpInfo.error
    );
const successmessage = useSelector(
    (state)=>state.signUpInfo
)

    const [signUpInfo,setSignUpInfo] = useState({
        email:"",
        userName:"",
        password:"",
        passwordCheck:"",
    });

    const onChangeHandler = (event) => {
        const {value, name} = event.target;
        setSignUpInfo({...signUpInfo, [name]:value})
    };

    

//모든 것이 채워졌을 때만 제출    
    

//유효성 검사
const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;    
const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
const userNameRegEx = /^[가-힣]{2,6}$/;


//onFocus, onBlur시 보이는 표시
const [userNameValid, setUserNameValid] = useState();
    const onFocusUserNameValid = (event) => {
    setUserNameValid(true)
};
    const onBlurUserNameValid = (event) => {
    setUserNameValid(false)
};


const [emailValid, setEmailValid] = useState();
    const onFocusEmailValid = (event) => {
    setEmailValid(true)
};
    const onBlurEmailValid = (event) => {
    setEmailValid(false)
};


const [passwordValid, setPasswordValid] = useState();
    const onFocusPasswordValid = (event) => {
    setPasswordValid(true)
};
    const onBlurPasswordValid = (event) => {
    setPasswordValid(false)
};


const [passwordCheckValid, setPasswordCheckValid] = useState();
    const onFocusPasswordCheckValid = (event) => {
    setPasswordCheckValid(true)
};
    const onBlurPasswordCheckValid = (event) => {
    setPasswordCheckValid(false)
};

const onClickSubmitHandler = (event) => {
    event.preventDefault();
    
    if((signUpInfo.userName.match(userNameRegEx) !== null)
    && (signUpInfo.password.match(passwordRegEx) !== null)
    && (signUpInfo.password === signUpInfo.passwordCheck)
    && (errormessage?.result !== false))
    {
        return dispatch(signUpThunk(signUpInfo)), navigate('/')
        
    }else{
        return alert('아이디 중복확인을 해주세요') 
    }
    };

const onClickOverlap = () => {
    dispatch(signUpThunk(signUpInfo))
}



//뷰
    return (
        <div>
        <h1>HEADERHEADERHEADERHEADERHEADERHEADERHEADERHEADER</h1>
        <h1 className="SignUpLogo">Sign-Up</h1>
        <div className="SignUpContainer">
            <p>이름<input onFocus={onFocusUserNameValid} onBlur={onBlurUserNameValid} onChange={onChangeHandler} name="userName" type="text" placeholder="이름을 입력해주세요."/></p>
        <section className="messageContainer">
            {(userNameValid === true) && (signUpInfo.userName.match(userNameRegEx) === null) ? <p className="incorrect">&#10006;이름을 입력하세요</p>
            : (userNameValid === true) && (signUpInfo.userName.match(userNameRegEx) !== null) ? <p className="correct">&#10004;멋진 이름이군요</p>
            : (userNameValid === false) && (signUpInfo.userName.match(userNameRegEx) === null) ? <p className="incorrect">&#10006;이름을 입력하세요</p>
            : (userNameValid === false) && (signUpInfo.userName.match(userNameRegEx) !== null)  ? <p className="correct">&#10004;멋진 이름이군요</p>
            : null
                }
        </section>
            <p>아이디(e-mail)<input onFocus={onFocusEmailValid} onBlur={onBlurEmailValid} onChange={onChangeHandler} name="email" type="text" placeholder="email을 입력해주세요"/></p>
            <button onClick={onClickOverlap}>중복확인</button>
            <section className="messageContainer">
            
            </section>
            <p>비밀번호<input onFocus={onFocusPasswordValid} onBlur={onBlurPasswordValid} onChange={onChangeHandler} name="password" type="password" placeholder="8~20자"/></p>
            <section className="messageContainer">
                {(passwordValid === true) && (signUpInfo.password.match(passwordRegEx) === null) ? <p className="incorrect">&#10006;8~20자로 입력해주세요</p>
                : (passwordValid === true) && (signUpInfo.password.match(passwordRegEx) !== null) ? <p className="correct">&#10004;사용가능한 비밀번호 입니다</p>
                : (passwordValid === false) && (signUpInfo.password.match(passwordRegEx) === null) ? <p className="incorrect">&#10006;8~20자로 입력해주세요</p>
                : (passwordValid === false) && (signUpInfo.password.match(passwordRegEx) !== null)  ? <p className="correct">&#10004;사용가능한 비밀번호 입니다</p>
                : null
                        }
            </section>
            
            <p>비밀번호확인<input onFocus={onFocusPasswordCheckValid} onBlur={onBlurPasswordCheckValid} onChange={onChangeHandler} name="passwordCheck" type="password"/></p>
            <section className="messageContainer">
                {(passwordCheckValid === true) && (signUpInfo.password !== signUpInfo.passwordCheck) ? <p className="incorrect">&#10006;비밀번호가 일치하지 않습니다</p>
                : (passwordCheckValid === true) && (signUpInfo.password === signUpInfo.passwordCheck) ? <p className="correct">&#10004;비밀번호와 일치합니다</p>
                : (passwordCheckValid === false) && (signUpInfo.password !== signUpInfo.passwordCheck) ? <p className="incorrect">&#10006;비밀번호가 일치하지 않습니다</p>
                : (passwordCheckValid === false) && (signUpInfo.password === signUpInfo.passwordCheck)  ? <p className="correct">&#10004;비밀번호와 일치합니다</p>
                : null
                        }
            </section>
        <div className="makeItRow">
        <button onClick={onClickSubmitHandler} className="submitButton">회원가입</button>
        <button onClick={()=>{
            navigate("/")
        }}>취소</button>
        </div>
        </div>

        </div>

    );

};

export default SignUp;