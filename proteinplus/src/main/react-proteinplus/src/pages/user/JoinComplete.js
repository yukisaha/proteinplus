import React from 'react';
import {Link} from 'react-router-dom';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../../styles/user/css/join.scoped.css"

function JoinComplete(){

    return(
        <div className="wrap main">
            <Header /> {/* Header 컴포넌트 추가 */}
            <section id="contents" className="container join-container">
                <div className="join-certified user_frame-full">
                    <div className="user_frame-sm">
                        <div className="join-greeting">
                            {/*아이디*/}님,
                            <br/>회원가입을 축하합니다.
                            <br/>
                            <span>로그인 후 다양한 서비스를 이용하실 수 있습니다.</span>
                        </div>
                        {/* 로그인 form */}
                        {/*<form*/}
                        {/*    id="login_form"*/}
                        {/*    name="login_form"*/}
                        {/*    action="/auth/login"*/}
                        {/*    method="post"*/}
                        {/*>*/}
                        {/* input submit */}
                        <Link to={"/"}>
                            <button type="submit" className="user_btn-secondary user_w-full">
                                <span>둘러보기</span>
                            </button>
                        </Link>
                        <Link to={"/auth/login"}>
                            <button type="submit" className="user_btn-primary user_w-full">
                                <span>로그인</span>
                            </button>
                        </Link>
                        {/*</form>*/}
                    </div>
                </div>
            </section>
            <Footer /> {/* Footer 컴포넌트 추가 */}
        </div>
    )
}

export default JoinComplete;