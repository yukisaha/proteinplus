import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../../styles/user/css/login.scoped.css"
import "../../styles/common/css/MypageFrame.css"
import axios from "axios";

function Login(){

    const [loginId, setLoginId] = useState("");
    const [loginPwd, setLoginPwd] = useState("");

    const navigate = useNavigate();


    const handleLoginIdChange = (e) => {
        const LoginId = e.target.value;
        setLoginId(LoginId);
    };
    const handleLoginPwdChange = (e) => {
        const LoginPwd = e.target.value;
        setLoginPwd(LoginPwd);
    };


    const login = async (e) => {
        try {
            e.preventDefault();

            console.log("아이디" , loginId);
            console.log("비번" , loginPwd);

            const data = {
                loginId: loginId,
                loginPwd: loginPwd
            };
            const response = await axios.post(`/api/member/auth/login`, data);


            if(response.status === 200){

                //response header에 Authorization 값으로 토큰을 넣는다.
//                axios.defaults.headers.common['Authorization'] = response.data;

                // 서버에서 받은 토큰을 로컬 스토리지에 저장
                const token = response.data.data.accessToken;
                window.localStorage.setItem("token", token);

                navigate('/');
            }

        }catch (error){
            alert("계정이 존재하지 않거나 비밀번호가 잘못되었습니다");
        }
    }

    return(
        <div className="wrap main">
            <Header /> {/* Header 컴포넌트 추가 */}
            <section id="contents" className="container login-container">
                <div className="login-area">
                    {/* 로그인 환영 */}
                    <div className="login-greeting">
                        안녕하세요 :)<br/>
                        <span>Protein Plus 입니다.</span>
                    </div>
                    {/* 로그인 form */}
                    <form id="login_form" name="login_form" onSubmit={login}>
                        {/* input submit */}
                        <fieldset>
                            <div className="login_input-group w-full">
                                <label htmlFor="id" className="blind">아이디</label>
                                <input
                                    type="text"
                                    id="id"
                                    name="id"
                                    className="login_input-text login_type-lg"
                                    onChange={handleLoginIdChange}
                                    value={loginId}
                                    placeholder="아이디"
                                    maxLength="100"
                                    required
                                />
                            </div>
                            <div className="login_input-group w-full">
                                <label htmlFor="pw" className="blind">비밀번호</label>
                                <input
                                    type="password"
                                    id="pw"
                                    className="login_input-text login_type-lg"
                                    onChange={handleLoginPwdChange}
                                    value={loginPwd}
                                    placeholder="비밀번호"
                                    maxLength="100"
                                    required
                                />
                            </div>

                            {/*로그인 로직*/}
                            <button onClick={login} className="user_btn-primary w-full">
                                <span>로그인</span>
                            </button>
                        </fieldset>
                    </form>
                    {/* 아이디찾기 비번찾기 */}
                    <div className="login_page-guide-center">
                        <ul className="login_txt-link-list">
                            <li>
                                <Link to={""} className="login_text-black2">아이디 찾기</Link>
                            </li>
                            <li>
                                <Link to={""} className="login_text-black2">비밀번호 찾기</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
            <Footer /> {/* Footer 컴포넌트 추가 */}
        </div>
    )
}

export default Login;