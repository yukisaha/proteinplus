import React from 'react';
import {Link} from 'react-router-dom';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../../styles/user/css/login.scoped.css"
import "../../styles/common/css/MypageFrame.css"

function Login(){

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
                    <form id="login_form" name="login_form" action="" method="">
                        {/* input submit */}
                        <fieldset>
                            <div className="login_input-group w-full">
                                <label htmlFor="id" className="blind">아이디</label>
                                <input
                                    type="text"
                                    id="id"
                                    name="id"
                                    className="login_input-text login_type-lg"
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
                                    placeholder="비밀번호"
                                    maxLength="100"
                                    required
                                />
                            </div>

                            {/*로그인 로직*/}
                            <button type="submit" className="user_btn-primary w-full">
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