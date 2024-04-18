import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "../../styles/user/css/join.scoped.css"

function JoinComplete(){

    let location = useLocation();
    const loginId = location.state.loginId;

    return(
        <div className="wrap main">
            <Header /> {/* Header 컴포넌트 추가 */}
            <section id="contents" className="container join-container">
                <div className="join-certified user_frame-full">
                    <div className="user_frame-sm">
                        <div className="join-greeting">
                            <div className={`and loginId`}>{loginId}</div>
                            {/*<div className={`and`}>님,</div>*/}
                            <br/>회원가입을 축하합니다.
                            <br/>
                            <span>로그인 후 다양한 서비스를 이용하실 수 있습니다.</span>
                        </div>
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
                    </div>
                </div>
            </section>
            <Footer /> {/* Footer 컴포넌트 추가 */}
        </div>
    )
}

export default JoinComplete;