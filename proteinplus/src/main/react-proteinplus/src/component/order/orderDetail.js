import React from 'react';
import '../../res/css/order/orderDetail.css';
import '../../res/css/frame.css';
import '../../res/css/mypageFrame.css';

const OrderDetailPage = () => {
    // function fnBtnTopSearch(keyword) {
    //
    //     let url = "";
    //     let searchKeyword = "";
    //
    //     switch (keyword.dataset.searchType) {
    //
    //         case 'real':
    //             // 상단 검색창 키워드
    //             searchKeyword = $("#rankKeyword").val();
    //             break;
    //
    //         case 'recent':
    //             // 최근검색어
    //             searchKeyword = $(keyword).text();
    //             break;
    //
    //         case 'popular':
    //             // 인기검색어
    //             searchKeyword = $(keyword).find('.word').text();
    //             break;
    //
    //         default:
    //             // 상단 검색창 키워드
    //             searchKeyword = $("#rankKeyword").val();
    //             break;
    //     }
    //
    //     // 검색창 광고관리 기능
    //     if (isEmpty(searchKeyword)) {
    //
    //         const searchData = {};
    //         searchData.code    = $("#rankKeyword").data('link-code') + '';
    //         searchData.url     = $("#rankKeyword").data('advert-url');
    //         searchData.keyword = $("#rankKeyword").prop('placeholder');
    //
    //         fnPageSearchMove(searchData);
    //
    //     } else {
    //         // 리다이렉션 키워드관리 검색
    //         fnRedirectKeyword(searchKeyword);
    //     }
    // }

    return (
        <div className="wrap main">

            {/* ========== 공통 헤더 :: header ========== */}
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
                    </div>{/* util */}

                    <div className="header-search">
                        <div className="top-search">
                            <input type="search" className="input-search" value="" maxLength="100"/>

                                <button type="button" className="btn-top-search" id="btnTopSearch" name="btnTopSearch"
                                        data-search-type="real" onClick="fnBtnTopSearch(this);">
                                    <span className="blind">검색</span>
                                </button>
                        </div>
                    </div>{/* header-search */}

                    <div className="my-menu">
                        <ul>
                            <li><a href="" className="btn-util-pedometer" title=""><span className="blind">만보기</span></a></li>
                            <li><a href="" className="btn-util-coupon" title=""><span className="blind">쿠폰</span></a></li>
                            <li><a href="" className="btn-util-mypage" title=""><span className="blind">마이페이지</span></a>
                            </li>
                            <li>
                                <a href="" className="btn-util-cart" title="">
                                    <span className="blind">장바구니</span>
                                    <em className="count">0</em>
                                </a>
                            </li>
                        </ul>
                    </div>{/* my-menu */}
                </div>
                {/* header-inner */}

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
                </div>{/*  gnb-wrap */}
            </header>
            {/* ========== 공통 헤더 :: header ========== */}




            {/* ========== 컨텐츠 영역 :: container ========== */}
            <section id="contents" className="container">

                {/* 여기서부터 작업 */}
                <div className="content-wrap">
                    <div className="frame-full head-mypage">
                        <div className="user-info-box">
                            <div className="inner">
                                <div className="column user-info ">
                                    <div className="txt">
                                        <span className="img">
                                            <i className="ico-cou-level01"></i>
                                        </span>
                                        <p className="greeting">
                                            <strong className="name">정주용</strong>님 반갑습니다
                                        </p>
                                    </div>
                                </div>{/* user-info */}
                            </div>{/* inner */}
                        </div>{/* user-info-box */}
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
                                                <li className=""><a href="/mypage/routineDelivery">정기배송 관리</a></li>
                                                <li className=""><a href="/mypage/routineDelivery/card">정기결제 관리</a></li>
                                                <li className=""><a href="/mypage/restock/list">재입고 알림 상품</a></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="#" className="menu">혜택관리</a>
                                            <ul className="depth2">
                                                <li className=""><a href="/mypage/myCoupon">나의 쿠폰</a></li>
                                                <li className=""><a href="/mypage/myPoint">포인트</a></li>
                                                <li className=""><a href="/mypage/giftCard/list">랭킹닭컴 상품권 관리</a></li>
                                                {/* 활성화될 경우 li에 addClass current  */}
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="#" className="menu">활동관리</a>
                                            <ul className="depth2">
                                                <li className=""><a href="/mypage/recentProduct/list">최근 본 상품</a></li>
                                                <li className=""><a href="/mypage/wish/list">찜한상품</a></li>
                                                <li className=""><a href="/mypage/wishBrand/list">관심브랜드</a></li>
                                                <li><a href="/mypage/userCounsel/list">1:1문의</a></li>
                                                {/* 활성화될 경우 li에 addClass current  */}
                                                <li><a href="/mypage/prodReview/list">상품후기</a></li>
                                                {/* 활성화될 경우 li에 addClass current  */}
                                                <li><a href="/mypage/prodCounsel/list">상품문의내역</a></li>
                                                {/* 활성화될 경우 li에 addClass current  */}
                                                <li><a href="/mypage/dietManage/list">식단상담 목록</a></li>
                                                {/* 활성화될 경우 li에 addClass current  */}
                                            </ul>
                                        </li>
                                        <li>
                                            <a href="" className="menu goVipView">VIP전용관</a>
                                        </li>
                                        <li className="">
                                            <a href="/mypage/orangeMember" className="menu">오렌지멤버스</a>
                                        </li>
                                        <li>
                                            <a href="/mypage/delivery" className="menu">회원정보관리</a>
                                            <ul className="depth2">
                                                <li className=""><a href="/mypage/delivery">배송지 관리</a></li>
                                                <li><a href="/mypage/info/mypage">정보수정</a></li>
                                                {/* 활성화될 경우 li에 addClass current  */}
                                            </ul>
                                        </li>
                                    </ul>
                                </nav>{/* menu-mypage */}
                                <div className="aside-link-box">
                                    <a href="/service/voc"><i className="ico-bl-speaker"></i><span>고객의 소리</span><i
                                        className="ico-arr-right"></i></a>
                                </div>
                            </div>{/* aside-menu-wrap */}
                        </div>


                        <div className="frame-right order-list-wrap">
                            <div className="frame-cnt-inner">
                                <form id="myPageOrderList" name="myPageOrderList" action="/mypage/orderlist?srchFlag=Y&amp;nowPageNo=&amp;mypage-order-search-radio=PERIOD&amp;periodOption=PERIOD&amp;dStartDtm=2023-10-01&amp;dEndDtm=2024-03-31&amp;srchProductNm=&amp;dlvTypeAll=Y&amp;dlvNrm=Y&amp;dlvRtn=Y" method="get">
                                    <div className="menu-title-area">
                                        <h3 className="title-menu">주문내역</h3>
                                    </div>{/* menu-title-area */}
                                    <div className="search-box">
                                        <div className="search-detail">
                                            <fieldset>
                                                <legend>상세 검색</legend>
                                                <div className="search-detail-top">
                                                    <div className="search-detail-date-itemname">
                                                        <div className="input-group w-full">
                                                            <label for="item1-1" className="blind">검색</label>
                                                            <input type="text" id="item1-1" name="srchProductNm" className="input-text" placeholder="주문 상품명 검색" value=""/>
                                                            <span className="input-group-btn">
                                                                <button type="submit" className="btn-icon-search search-word" title=""><i className="ico-btn-search"></i>
                                                                    <span className="blind">검색하기</span>
                                                                </button>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>{/* search-detail*/}
                                    </div>{/* search-box */}
                                </form><div className="order-list-area">
                                <ul className="order-list-inner">
                                    <li>
                                        <div className="order-list-head">
                                            <strong className="date">주문날짜</strong>
                                            <div className="right">
                                                <span className="order-item-id">주문번호</span>
                                            </div>

                                        </div>{/* list-head */}
                                        <div className="order-content-box">
                                            <ul className="order-div-list">
                                                <li className="order-div-item">
                                                    <div className="prd-info-area">
                                                        <div className="inner">
                                                            <div className="column img">
                                                                <a href="javascript:void(0);" onClick="onClickMyPageOrderListOrderCd(this); return false;" ordercd="주문번호">
                                                                    <img src="https://file.rankingdak.com/image/RANK/PRODUCT/PRD001/20230517/IMG1684SDC309384667_100_100.png" alt="상품이미지"/>
                                                                </a>
                                                            </div>
                                                            <div className="column tit">
                                                                <div className="prd-state-row">
                                                                    <strong className="prd-state-head">배송상태표시</strong>
                                                                </div>
                                                                <div className="tit">
                                                                    <a href="javascript:void(0);" onClick="onClickMyPageOrderListOrderCd(this); return false;" ordercd="RK2310140004898434">상품이름</a>
                                                                </div>
                                                                <p className="desc">
                                                                    상품옵션</p>
                                                            </div>{/* column  */}
                                                            <div className="price-item">
                                                                <div className="dlv-nmr">
                                                                    <p className="dlv-nmr-price">
                                                                        <span className="num">가격</span>원
                                                                    </p>
                                                                    <p className="dlv-nmr-cnt">
                                                                        <span className="num">상품개수</span>개
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>{/* prd-info-area */}
                                                </li>{/* order-div-item || 상품별 list 1 */}
                                            </ul>{/* order-div-list */}
                                            <div className="addr-info-line">
                                                <p><i className="ico-bl-home2"></i>주소</p>
                                            </div>{/* addr-info-line */}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            </div>
                            <form id="command" name="deliveryPop" action="/mypage/main" method="post"><input type="hidden" name="actionFlag" value="M"/>
                                <input type="hidden" name="vDeliveryid"/>
                                <input type="hidden" name="vOrderCd"/>
                                <div>
                                    <input type="hidden" name="_csrf" value="9b875e96-0bdf-4014-973d-fe95f7c829fb"/>
                                </div>
                            </form>
                            <div className="layer-wrap" id="modal-my-delivery"></div>
                        </div>
                    </div> {/* frame-sm */}
                </div>
            </section>
            {/* ========== 컨텐츠 영역 :: container ========== */}

            {/* ========== 공통 푸터 :: footer :: include.footer() 영역  ========== */}
            <footer id="footer" className="footer">
                <div className="footer-menu">
                    <div className="frame-sm">
                        <ul className="footer-menu-list">
                            <li><a>회사소개</a></li>
                            <li><a>공지사항</a></li>
                            <li><a>입점 · 제휴 · 광고문의</a></li>
                            <li><a>이용약관</a></li>
                            <li><a className="text-black2 text-md">개인정보처리방침</a></li>
                        </ul>{/* footer-menu-list */}
                    </div>{/* footer-info-list */}
                </div>{/* frame-sm */}
                <div className="footer-info">
                    <strong className="footer-logo"><span className="blind">ProteinPlus</span></strong>
                    <div className="colum-info">
                        <h5 className="blind">회사 정보</h5>
                        <ul className="footer-biz-info">
                            <li><span className="company-name">(주)푸드나무</span></li>
                            <li>대표 : 김영문</li>
                            <li>주소 : 서울특별시 마포구 월드컵북로 396, 15층(상암동, 누리꿈스퀘어 비지니스타워)</li>
                            <li>사업자등록번호 : 105-87-81968
                                사업자정보 확인
                            </li>
                            <li>통신판매업신고번호 : 제2015-서울마포-1058호</li>
                            <li>개인정보보호책임자 : 이재길</li>
                        </ul>
                        <p className="copyright">Copyright©ProteinPlus All rights reserved.</p>
                    </div>{/* colum */}
                    <div className="colum-info">
                        <ul className="customer-info">
                            <li className="cscenter">고객센터 <em className="footer-tel">02-6405-8088</em></li>
                            <li>FAX. 02-6351-8088</li>
                            <li>E-mail. admin@foodnamoo.com</li>
                        </ul>
                        <div className="customer-btns">
                            <a href="#"><span>고객의 제안</span></a>
                            <a href="#"><span>1:1 문의</span></a>
                        </div>
                        <ul className="footer-sns-list">
                            <li><a target="_blank"><i className="ico-sns-facebook"></i><span className="sns_blind">페이스북</span></a>
                            </li>
                            <li><a target="_blank"><i className="ico-sns-instagram"></i><span className="sns_blind">인스타그램</span></a>
                            </li>
                            <li><a target="_blank"><i className="ico-sns-blog"></i><span className="sns_blind">네이버블로그</span></a>
                            </li>
                            <li><a target="_blank"><i className="ico-sns-post"></i><span className="sns_blind">네이버포스트</span></a>
                            </li>
                            <li><a target="_blank"><i className="ico-sns-kakaotalk"></i><span className="sns_blind">카카오톡</span></a>
                            </li>
                            <li><a target="_blank"><i className="ico-sns-youtube"></i><span className="sns_blind">유튜브</span></a>
                            </li>
                        </ul>
                    </div>{/* colum */}
                </div>{/* footer-info */}
            </footer>
        </div>
    );
};

export default OrderDetailPage;