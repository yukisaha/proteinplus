import React, {useState} from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../../styles/user/css/join.scoped.css"
import axios from "axios";
import {useNavigate} from "react-router-dom";


//회원가입
function Join(){

    const Spring_Server_Ip = process.env.REACT_APP_Spring_Server_Ip;


    const [loginId, setLoginId] = useState("");
    const [loginPwd, setLoginPwd] = useState("");
    const [loginPwdCheck, setLoginPwdCheck] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const join = async (e) => {
        e.preventDefault();

        //비밀번호 확인
        if(loginPwd === loginPwdCheck){

            //이메일 중복 확인
            const isEmailDuplicate = await emailDuplicateCheck();
            if(!isEmailDuplicate){
                try {
                    const data = {
                        loginId: loginId,
                        loginPwd: loginPwd,
                        email: email
                    };
                    await axios.post(`${Spring_Server_Ip}/member/join`, null, {params: data});
                    navigate('/member/join/complete', {state: {loginId: loginId}}, {replace: true});
                } catch (error) {
                    alert("회원가입에 실패했습니다.");
                }
            }else{
                alert("해당 이메일로 가입된 계정이 있습니다");
            }
        }else{
            setLoginPwdCheck("");
            alert("비밀번호가 일치하지 않습니다");
        }
    }

    const handleLoginIdChange = (e) => {
        const LoginId = e.target.value;
        setLoginId(LoginId);
    }
    const handleLoginPwdChange = (e) => {
        const LoginPwd = e.target.value;
        setLoginPwd(LoginPwd);
    }
    const handleLoginPwdCheckChange = (e) => {
        const LoginPwdCheck = e.target.value;
        setLoginPwdCheck(LoginPwdCheck);
    }
    const handleEmailChange = (e) => {
        const email = e.target.value;
        setEmail(email);
    }


    const idDuplicateCheck = async (e) => {
        e.preventDefault();

        if (!loginId) {
            alert("아이디를 입력해주세요.");
            return;
        }

        try {
            const data = {
                loginId: loginId
            };
            const response = await axios.get(`${Spring_Server_Ip}/member/join/idDuplicateCheck`, {params: data});
            //이미 존재하는 아이디일 경우
            if(response.data === true) {
                alert("이미 사용 중인 아이디입니다.");
            }else{
                alert("사용할 수 있는 아이디입니다.");
            }
        } catch (error) {
            alert("에러 발생");
        }
    }

    const emailDuplicateCheck = async () => {
        try {
            const data = {
                email: email
            };
            const response = await axios.get(`${Spring_Server_Ip}/member/join/emailDuplicateCheck`, {params: data});
            //이미 존재하는 이메일일 경우
            return response.data === true;
        } catch (error) {
            alert("에러 발생");
            return false;
        }
    }

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
                                        {/*중목체크가 되었을경우*/}
                                        {/*<div className ={`idDuplicateCheck`}>사용할 수 있는 아이디입니다</div>*/}
                                    </div>
                                </div>
                                <div className="join_input-group user_w-full">
                                    <label htmlFor="pw"
                                    >비밀번호 <span id="required-text">[필수]</span></label
                                    >
                                    <input
                                        id="pw"
                                        name="pw"
                                        className="join_input-text type-lg"
                                        type="password"
                                        onChange={handleLoginPwdChange}
                                        value={loginPwd}
                                        placeholder="비밀번호"
                                        maxLength="100"
                                        required
                                    />
                                    <input
                                        id="pw2"
                                        name="pw2"
                                        className="join_input-text type-lg"
                                        type="password"
                                        onChange={handleLoginPwdCheckChange}
                                        value={loginPwdCheck}
                                        placeholder="비밀번호 확인"
                                        maxLength="100"
                                        required
                                    />

                                    {/*비밀번호 확인이 비밀번호에 입력한 값과 동일할 경우 */}
                                    {/*<div>비밀번호가 일치합니다</div>*/}
                                    {/*동일하지 않을 경우*/}
                                    {/*<div>비밀번호가 일치하지 않습니다</div>*/}

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
                                <button type="submit" className="user_btn-primary user_w-full">
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