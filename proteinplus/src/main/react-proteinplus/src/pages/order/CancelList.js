import React from 'react';
import '../../styles/order/css/OrderDetail.scoped.css';
import MypageFrame from '../../components/MypageFrame';

export default function CancelDetail(){
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
        <MypageFrame>
            <div className="menu-title-area">
                <h3 className="title-menu">취소/반품내역</h3>
            </div>{/* menu-title-area */}
            <div className="search-box">
                <div className="search-detail">
                    <fieldset>
                        <legend>상세 검색</legend>
                        <div className="search-detail-top">
                            <div className="search-detail-date-itemname">
                                <div className="input-group w-full">
                                    <label htmlFor="item1-1" className="blind">검색</label>
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
            <div className="order-list-area">
                <ul className="order-list-inner">
                    <li>
                        <div className="order-list-head">
                            <strong className="date">취소날짜</strong>
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
                                                    <strong className="prd-state-head">취소상태표시</strong>
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
        </MypageFrame>
    );
};
