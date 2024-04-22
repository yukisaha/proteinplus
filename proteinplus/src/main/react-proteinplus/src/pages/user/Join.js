import React, {useEffect, useState} from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../../styles/user/css/join.scoped.css"
import axios from "axios";
import {useNavigate} from "react-router-dom";


//회원가입
function Join(){

    const [loginId, setLoginId] = useState("");
    const [loginPwd, setLoginPwd] = useState("");
    const [loginPwdCheck, setLoginPwdCheck] = useState("");
    const [name, setName] = useState("");
    const [nickName, setNickName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const [isIdAvailable, setIsIdAvailable] = useState(false);
    const [idMessage, setIdMessage] = useState("");
    const [pwdMessage, setPwdMessage] = useState("");
    const [pwdValidateMessage, setPwdValidateMessage] = useState("* 비밀번호는 최소 8자리에 영어, 숫자, 특수문자를 포함해야 합니다.");
    const [idDuplicateStyle, setIdDuplicateStyle] = useState('');
    const [pwdDuplicateStyle, setPwdDuplicateStyle] = useState('');
    const [pwdValidateStyle, setPwdValidateStyle] = useState("pwdValidateStyle");

    const navigate = useNavigate();

    const handleNameChange = (e) => {
        const name = e.target.value;
        setName(name);
    };
    const handleNickNameChange = (e) => {
        const nickName = e.target.value;
        setNickName(nickName);
    };
    const handleLoginIdChange = (e) => {
        const LoginId = e.target.value;
        setLoginId(LoginId);
        setIsIdAvailable(false); //아이디 변경 시 다시 중복체 크 해야함
        setIdMessage("");
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@S!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleLoginPwdChange = (e) => {
        const LoginPwd = e.target.value;
        setLoginPwd(LoginPwd);

        // 비밀번호 정책 검사
        if (loginPwd) {
            if (validatePassword(loginPwd)) {
                setPwdValidateMessage("");
            } else {
                setPwdValidateMessage("비밀번호는 최소 8자리에 영어, 숫자, 특수문자를 포함해야 합니다.");
                setPwdValidateStyle(`idUnavailable`);
            }
        } else {
            setPwdMessage("");
            setPwdDuplicateStyle("");
        }
    };
    const handleLoginPwdCheckChange = (e) => {
        const LoginPwdCheck = e.target.value;
        setLoginPwdCheck(LoginPwdCheck);
    };

    useEffect(() => {
        setPwdMessage("");
        if(loginPwd){
            if(loginPwdCheck === loginPwd){
                setPwdMessage("비밀번호가 일치합니다");
                setPwdDuplicateStyle(`idAvailable`);
            }else{
                if(loginPwdCheck){
                    setPwdMessage("비밀번호가 일치하지 않습니다")
                    setPwdDuplicateStyle(`idUnavailable`);
                }
            }
        }
    }, [loginPwd, loginPwdCheck])

    const handlePhoneChange = (e) => {
        const numbersOnly = e.target.value.replace(/\D/g, "");
        if (numbersOnly.length <= 11) {
            setPhone(numbersOnly);
        }
    };

    const displayFormattedPhoneNumber = (numbers) => {
        if (numbers.length <= 3) {
            return numbers;
        } else if (numbers.length <= 7) {
            return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
        } else {
            return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
        }
    };

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const idDuplicateCheck = async (e) => {
        e.preventDefault();

        if (!loginId) {
            alert("아이디를 입력해주세요.");
            return;
        }

        try {
        console.log(loginId);
            const data = {
                loginId: loginId

            };
        console.log(data);
            const response = await axios.get(`/api/member/idDuplicateCheck`, {params: data});
            console.log(response);
            //이미 존재하는 아이디일 경우
            if(response.data === true) {
                setIdMessage("이미 사용 중인 아이디입니다.");
                setIsIdAvailable(false);
                setIdDuplicateStyle(`idUnavailable`);
            }else{
                setIdMessage("사용할 수 있는 아이디입니다.");
                //아이디 입력 필드 잠금
                setIsIdAvailable(true);
                setIdDuplicateStyle(`idAvailable`);
            }
        } catch (error) {
            alert("에러 발생");
        }
    };



    const emailDuplicateCheck = async () => {
        try {
            const data = {
                email: email
            };
            const response = await axios.get(`/api/member/emailDuplicateCheck`, {params: data});
            //이미 존재하는 이메일일 경우
            return response.data === true;
        } catch (error) {
            alert("에러 발생");
            return false;
        }
    };

    const phoneDuplicateCheck = async () => {
        try {
            const data = {
                phone: phone
            };
            const response = await axios.get(`/api/member/phoneDuplicateCheck`, {params: data});
            //이미 존재하는 전화번호일 경우
            return response.data === true;
        } catch (error) {
            alert("에러 발생");
            return false;
        }
    };

    const join = async (e) => {
        e.preventDefault();
        if(!name){
            alert("이름을 입력해주세요.");
            return;
        }

        if(!nickName){
            alert("닉네임을 입력해주세요.");
            return;
        }

        if (!loginId) {
            alert("아이디를 입력해주세요.");
            return;
        }

        if(!isIdAvailable){
            alert("아이디 중복 확인을 해주세요")
            return;
        }

        if (!loginPwd) {
            alert("비밀번호 입력해주세요.");
            return;
        }

        if (!loginPwdCheck) {
            alert("비밀번호 확인을 해주세요.");
            return;
        }

        if (!phone) {
            alert("전화번호를 입력해주세요.");
            return;
        }

        if (!email) {
            alert("이메일을 입력해주세요.");
            return;
        }

        //비밀번호 확인
        if(loginPwd === loginPwdCheck){

            //이메일 중복 확인
            const isEmailDuplicate = await emailDuplicateCheck();
            const isPhoneDuplicate = await phoneDuplicateCheck();
            if(!isEmailDuplicate){
                if(!isPhoneDuplicate){
                    try {
                        const data = {
                            name: name,
                            nickname: nickName,
                            loginId: loginId,
                            loginPwd: loginPwd,
                            phone: phone,
                            email: email
                        };
                        console.log(data);
                        const response = await axios.post(`/api/member/join`, data);
                        console.log("name : "+response.data.name);
                        navigate('/member/join/complete', {state: {loginId: data.loginId, name: data.name}}, {replace: true});
                    } catch (error) {
                        alert("회원가입에 실패했습니다.");
                    }
                }else{
                    alert("해당 전화번호로 가입된 계정이 있습니다");
                }
            }else{
                alert("해당 이메일로 가입된 계정이 있습니다");
            }
        }else{
            setLoginPwdCheck("");
            alert("비밀번호가 일치하지 않습니다");
        }
    };

    return(
        <div className="wrap main">
            <Header /> {/* Header 컴포넌트 추가 */}
            <section id="contents" className="container join-container">
                <div className="join-certified user_frame-full">
                    <div className="user_frame-sm">
                        {/* 회원가입 subtitle */}
                        <div className="join_certified-title">
                            <h2>회원가입</h2>
                        </div>
                        {/* 회원가입 form */}
                        <form id="join_form" className="join_form" onSubmit={join}>
                            {/* input submit */}
                            <fieldset>
                                <div className="join_input-group user_w-full">
                                    <label htmlFor="name"
                                    >이름 <span id="required-text">[필수]</span></label
                                    >
                                    <input
                                        id="name"
                                        name="name"
                                        className="join_input-text type-lg"
                                        type="name"
                                        onChange={handleNameChange}
                                        value={name}
                                        placeholder="이름"
                                        maxLength="12"
                                        required
                                    />
                                </div>
                                <div className="join_input-group user_w-full">
                                    <label htmlFor="name"
                                    >닉네임 <span id="required-text">[필수]</span></label
                                    >
                                    <input
                                        id="nickname"
                                        name="nickname"
                                        className="join_input-text type-lg"
                                        type="nickname"
                                        onChange={handleNickNameChange}
                                        value={nickName}
                                        placeholder="닉네임"
                                        maxLength="12"
                                        required
                                    />
                                </div>
                                <div className="join_input-group user_w-full">
                                    <label htmlFor="id"
                                    >아이디 <span id="required-text">[필수]</span>
                                    </label>
                                    <div className={`idForm`}>
                                        <input
                                            id="id"
                                            name="id"
                                            className="join_input-text type-lg"
                                            type="text"
                                            onChange={handleLoginIdChange}
                                            value={loginId}
                                            placeholder="아이디"
                                            maxLength="20"
                                            required
                                        />
                                        <button onClick={idDuplicateCheck}>중복 확인</button>
                                      </div>
                                    <div className={`${idDuplicateStyle}`}>{idMessage}</div>
                                </div>
                                <div className="join_input-group user_w-full">
                                    <label htmlFor="pw"
                                    >비밀번호 <span id="required-text">[필수]</span></label>
                                    <input
                                        id="pw"
                                        name="pw"
                                        className="join_input-text type-lg"
                                        type="password"
                                        onChange={handleLoginPwdChange}
                                        value={loginPwd}
                                        placeholder="비밀번호"
                                        maxLength="20"
                                        required
                                    />
                                    <div className={`${pwdValidateStyle}`}>{pwdValidateMessage}</div>
                                    <input
                                        id="pw2"
                                        name="pw2"
                                        className="join_input-text type-lg"
                                        type="password"
                                        onChange={handleLoginPwdCheckChange}
                                        value={loginPwdCheck}
                                        placeholder="비밀번호 확인"
                                        maxLength="20"
                                        required
                                    />
                                    <div className={`${pwdDuplicateStyle}`}>{pwdMessage}</div>
                                </div>
                                <div className="join_input-group user_w-full">
                                    <label htmlFor="phone">전화번호 <span id="required-text">[필수]</span></label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        className="join_input-text type-lg phone"
                                        type='text'
                                        onChange={handlePhoneChange}
                                        value={displayFormattedPhoneNumber(phone)}
                                        placeholder="01012345678"
                                        maxLength="13"
                                        required
                                    />
                                </div>
                                <div className="join_input-group user_w-full">
                                    <label htmlFor="email"
                                    >이메일 <span id="required-text">[필수]</span></label
                                    >
                                    <input
                                        id="email"
                                        name="email"
                                        className="join_input-text type-lg"
                                        type="email"
                                        onChange={handleEmailChange}
                                        value={email}
                                        placeholder="이메일"
                                        maxLength="100"
                                        required
                                    />
                                </div>
                                <button onClick={join} className="user_btn-primary user_w-full">
                                    <span>회원가입</span>
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </section>
            <Footer /> {/* Footer 컴포넌트 추가 */}
        </div>
    )
}

export default Join;