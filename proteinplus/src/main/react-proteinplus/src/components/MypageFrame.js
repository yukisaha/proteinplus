import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import '../styles/common/css/MypageFrame.css';
import {Link} from "react-router-dom";
import axios from "axios";

export default function MypageFrame({children}) {
  const Spring_Server_Ip = process.env.REACT_APP_Spring_Server_Ip;
  const [userName, setUserName] = useState('');
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    checkToken();
    getUserName();
  }, []);

  async function checkToken() {
    if (!token) {
      // 토큰이 없는 경우 로그인 페이지로 리디렉션
      window.location.href = '/auth/login'; // 로그인 페이지로 이동
    }
  }

  async function getUserName() {
    try {
      const response = await axios.get(`${Spring_Server_Ip}/mypage`, {
        headers: {
          Authorization: `${token}`
        }
      });
      const name = response.data; // 여기서 name을 가져오거나 응답 데이터 구조에 맞게 변경
      setUserName(name);
    } catch (error) {
      console.error('유저 이름을 가져오는 중 에러가 발생했습니다:', error);
    }
  }

    return (
        <div className="wrap main">
            {/* ========== 컨텐츠 영역 :: container ========== */}
            <Header /> {/* Header 컴포넌트 추가 */}
            <section id="contents" className="container">
                <div className="content-wrap">
                    <div className="frame-full head-mypage">
                        <div className="user-info-box">
                            <div className="inner">
                                <div className="column user-info">
                                    <div className="txt">
                                        <span className="img">
                                          <i className="ico-cou-level01"></i>
                                        </span>
                                        <div
                                            className=""
                                            style={{ display: 'inline-block', width: 'calc(100% - 60px)' }}
                                        >
                                            <p className="greeting">
                                                <strong className="name">{userName}</strong>님 반갑습니다
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/*// user-info */}
                            </div>
                            {/*// inner */}
                        </div>
                        {/*// user-info-box */}
                    </div>
                    <div className="frame-sm">
                        <div className="frame-left">
                            <div className="aside-menu-wrap">
                                <nav className="aside-menu">
                                    <ul className="menu-list">
                                        <li>
                                            <a href="/mypage/orderlist" className="menu">주문관리</a>
                                            <ul className="depth2">
                                                <li><a href="/mypage/orderlist">주문내역</a></li>
                                                <li><a href="/mypage/cancellist">취소/반품 내역</a></li>
                                                <li className="">
                                                    <a href="/mypage/routineDelivery">정기배송 관리</a>
                                                </li>
                                                <li className="">
                                                    <a href="/mypage/routineDelivery/card"
                                                    >정기결제 관리</a
                                                    >
                                                </li>
                                                <li className="">
                                                    <a href="/mypage/restock/list">재입고 알림 상품</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="#" className="menu">혜택관리</a>
                                            <ul className="depth2">
                                                <li className="">
                                                    <a href="/mypage/myCoupon">나의 쿠폰</a>
                                                </li>
                                                <li className=""><a href="/mypage/myPoint">포인트</a></li>
                                                <li className="">
                                                    <a href="/mypage/giftCard/list"
                                                    >랭킹닭컴 상품권 관리</a
                                                    >
                                                </li>
                                                {/* 활성화될 경우 li에 addClass current  */}
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="#" className="menu">활동관리</a>
                                            <ul className="depth2">
                                                <li className="">
                                                    <a href="/mypage/recentProduct/list">최근 본 상품</a>
                                                </li>
                                                <li className="">
                                                    <a href="/mypage/wishList">찜한상품</a>
                                                </li>
                                                <li className="">
                                                    <a href="/mypage/wishBrand/list">관심브랜드</a>
                                                </li>
                                                <li><a href="/mypage/userCounsel/list">1:1문의</a></li>
                                                {/* 활성화될 경우 li에 addClass current  */}
                                                <li><a href="/mypage/prodReview/list">상품후기</a></li>
                                                {/* 활성화될 경우 li에 addClass current  */}
                                                <li>
                                                    <a href="/mypage/prodCounsel/list">상품문의내역</a>
                                                </li>
                                                {/* 활성화될 경우 li에 addClass current  */}
                                                <li>
                                                    <a href="/mypage/dietManage/list">식단상담 목록</a>
                                                </li>
                                                {/* 활성화될 경우 li에 addClass current  */}
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="" className="menu goVipView">VIP전용관</a>
                                        </li>
                                        <li className="">
                                            <a href="/mypage/orangeMember" className="menu"
                                            >오렌지멤버스</a
                                            >
                                        </li>
                                        <li>
                                            <a href="/mypage/delivery" className="menu">회원정보관리</a>
                                            <ul className="depth2">
                                                <li className="">
                                                    <a href="/mypage/delivery">배송지 관리</a>
                                                </li>
                                                <li><a href="/mypage/memberPwdCheck">회원정보수정</a></li>
                                                {/* 활성화될 경우 li에 addClass current  */}
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>
                                {/*// menu-mypage */}
                                <div className="aside-link-box">
                                    <a href="/service/voc">
                                        <i className="ico-bl-speaker"></i><span>고객의 소리</span
                                    ><i className="ico-arr-right"></i
                                    ></a>
                                </div>
                            </div>
                            {/*// aside-menu-wrap */}
                        </div>

                        <div className="frame-right">
                            <div className="frame-cnt-inner">
                                {/* 여기서부터 작업*/}
                                {children}
                            </div>
                            {/*// frame-cnt-inner */}
                        </div>
                        {/*// content-wrap */}
                        <form
                            id="command"
                            name="deliveryPop"
                            action="/mypage/main"
                            method="post"
                        >
                            <input type="hidden" name="actionFlag" value="M" />
                            <input type="hidden" name="vDeliveryid" />
                            <input type="hidden" name="vOrderCd" />
                            <div>
                                <input
                                    type="hidden"
                                    name="_csrf"
                                    value="9b875e96-0bdf-4014-973d-fe95f7c829fb"
                                />
                            </div>
                        </form>
                        <div
                            className="layer-wrap"
                            id="modal-my-delivery"
                            style={{ display: 'none' }}
                        ></div>
                    </div>
                    {/*// frame-sm */}
                </div>
            </section>
            {/*// ========== 컨텐츠 영역 :: container ========== */}
            <Footer /> {/* Footer 컴포넌트 추가 */}
        </div>
    );
}
