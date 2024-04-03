import React from 'react';
import '../res/css/header.css';

export default function Header() {
    return (
        <header id="header" className="header">
            <div className="header-inner">
                <h1 className="logo "><a href="/"><span className="blind">ProteinPlus</span></a></h1>

                <div className="util">
                    <ul>
                        <li><a href="/auth/login">로그인</a></li>
                        <li><a href="/member/join/general">회원가입</a></li>
                        <li><a href="/mypage/orderlist">주문조회</a></li>
                        <li><a href="/service/center">고객센터</a></li>
                    </ul>
                </div>

                <div className="header-search">
                    <div className="top-search">
                        <input type="search" className="input-search" value="" maxLength="100" />

                        <button type="button" className="btn-top-search" id="btnTopSearch" name="btnTopSearch" data-search-type="real" >
                            <span className="blind">검색</span>
                        </button>
                    </div>
                </div>

                <div className="my-menu">
                    <ul>
                        <li><a href="" className="btn-util-pedometer" title=""><span className="blind">만보기</span></a></li>
                        <li><a href="" className="btn-util-coupon" title=""><span className="blind">쿠폰</span></a></li>
                        <li><a href="" className="btn-util-mypage" title=""><span className="blind">마이페이지</span></a></li>
                        <li>
                            <a href="" className="btn-util-cart" title="">
                                <span className="blind">장바구니</span>
                                <em className="count">0</em>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="gnb-wrap">
                <div className="inner">
                    <div className="category-wrap">
                        <a href="#all-category" className="btn-menu-all"><span>카테고리</span></a>
                    </div>
                    <nav id="gnb" className="gnb">
                        <ul>
                            <li className="">
                                <a href="">
                                    <span>랭킹</span>
                                </a>
                            </li>
                            <li className="">
                                <a href="">
                                    <span>이달의 특가</span>
                                </a>
                            </li>
                            <li className="">
                                <a href="">
                                    <span>브랜드관</span>
                                </a>
                            </li>
                            <li className="">
                                <a href="">
                                    <span>1팩 담기</span>
                                </a>
                            </li>
                            <li className="">
                                <a href="">
                                    <span>혜택정리</span>
                                </a>
                            </li>
                            <li className="">
                                <a href="">
                                    <span>이벤트</span>
                                </a>
                            </li>
                            <li className="">
                                <a href="">
                                    <span>..</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}
