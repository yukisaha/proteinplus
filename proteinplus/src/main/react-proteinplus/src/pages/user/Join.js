import React from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../../styles/user/css/join.scoped.css"

function Join(){

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
                        <form id="join_form" name="join_form" action="" method="">
                            {/* input submit */}
                            <fieldset>
                                <div className="join_input-group user_w-full">
                                    <label htmlFor="id"
                                    >아이디 <span id="required-text">[필수]</span>
                                    </label>
                                    <input
                                        id="id"
                                        name="id"
                                        className="join_input-text type-lg"
                                        type="text"
                                        placeholder="아이디"
                                        maxLength="100"
                                        required
                                    />
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
                                        placeholder="비밀번호"
                                        maxLength="100"
                                        required
                                    />
                                    <input
                                        id="pw2"
                                        name="pw2"
                                        className="join_input-text type-lg"
                                        type="password"
                                        placeholder="비밀번호 확인"
                                        maxLength="100"
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