import React from 'react';
import '../../styles/order/css/Order.css';
import Header from '../../components/Header'; // frame.js에서 Header 함수 import
import Footer from '../../components/Footer'; // frame.js에서 Footer 함수 import


export default function Order(){
    function openUserDeliveryListPop(check) {
        $('body').css("overflow", "hidden");

        let deliveryListUrl = "/order/order";
        if (check == true) {
            deliveryListUrl += "?phoneCheck="+check;
        }

        $('#userDeliveryListPop').load(deliveryListUrl);
    }

    return (
        <div className="wrap main">
            <Header />
            {/* ========== 컨텐츠 영역 :: container ========== */}
            <section id="contents" className="container">
                <div className="content-wrap frame-sm">
                    <div className="page-title-area">
                        <h2 className="title-page">주문/결제</h2>
                    </div>
                    <div className="order-payment-area">
                        <form id="ordFrm" name="ordFrm" action="/order/Order" method="post" data-gtm-form-interact-id="0">
                            <div className="order-info">
                                <div className="list-head-sub">
                                    <h3 className="title-list">배송지 정보</h3>
                                    <a href="javascript:void(0);" className="btn-basic-sm2 btn-default" onClick={openUserDeliveryListPop}>
                                        <span>배송지변경</span>
                                        <i className="ico-arr-right"></i>
                                    </a>
                                </div>
                                <div className="lineless-table type1">
                                    <div id="addressInfoDiv">
                                        <h3>이름<em className="badge-point2">기본배송지</em></h3>
                                        <p><strong className="addr-name"></strong> 주소</p>
                                        <ul className="order-order-info">
                                            <li>
                                                <span>010-000-0000</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="order-info">
                                <div className="order-item-box">
                                    <div id="userOrderList">
                                        <div className="delivery-state normal">
                                            <h4 className="tit">일반배송 1개</h4>
                                            <div className="right-dlv-info">
                                                <i className="ico-bl-box2"></i>
                                                <p className="txt">
                                                    <span id="dlvPrice">무료배송</span>
                                                </p>
                                            </div>
                                        </div>
                                        <ul className="cart-list" data-dlv-cd="D00063100" data-delivery-state="normal" data-n-dlv-price="0">
                                            <li>
                                                <div className="prd-info-area ">
                                                    <input type="hidden" className="vProductCd" value="F000010060"/>
                                                        <div className="inner">
                                                            <div className="column img">
                                                                <a href="javascript:void(0);">
                                                                    <img src="https://file.rankingdak.com/image/RANK/PRODUCT/PRD001/20240325/IMG1711Aya334807868_100_100.jpg" alt="상품이미지"/>
                                                                </a>
                                                            </div>
                                                            <div className="column tit">
                                                                <p className="tit"><a href="#">상품이름</a></p>
                                                                <p className="desc">상품옵션</p>
                                                                <ul className="price-item">
                                                                    <li><span className="num">가격</span>원</li>
                                                                    <li><span className="num">개수</span>개</li>
                                                                </ul>
                                                            </div>
                                                            <div className="column price w70">
                                                                <span className="num">가격</span>원
                                                            </div>
                                                        </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="dlv-request-box" id="norReqBox">
                                    <div className="inner-div">
                                        <div className="request-tit"><h5>배송 요청사항</h5></div>
                                        <div className="request-detail">
                                            <div className="ui-select select-box w-full" data-value="" id="div_normal_comment">
                                                <a href="#none" title="" className="select-value" onClick="return false;">
                                                    <span>메세지를 선택해 주세요</span>
                                                </a>
                                                <div className="select-list">
                                                    <ul>
                                                        <li data-name="01" className="ui-direct-select"><a href="#direct-item-nor" onClick="return false;"><span>직접입력</span></a></li>
                                                        <li data-name="02" className=""><a href="#none" onClick="return false;" className="selected"><span>배송전, 연락 부탁드립니다.</span></a></li>
                                                        <li data-name="03" className=""><a href="#none" onClick="return false;"><span>부재시, 전화 또는 문자 주세요.</span></a></li>
                                                        <li data-name="04" className=""><a href="#none" onClick="return false;"><span>부재시, 경비(관리)실에 맡겨주세요.</span></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div id="direct-item-nor" className="ui-direct-input hide">
                                                <input type="text" className="input-text w-full deliveryComment removeEmoji" name="dlv_memo" placeholder="배송 요청 사항을 입력하세요"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="side-fix-area fixed">
                                <div className="payment-info-box ui-box-fix">
                                    <h3 className="tit">주문결제 금액</h3>
                                    <div className="order-price">
                                        <ul className="div-price">
                                            <li>
                                                <div className="list-inner">
                                                    <span className="tit">상품금액</span>
                                                    <p className="price"><strong className="num resetOrderPaySide" id="txt_tot_price">가격</strong> 원
                                                        <span className="text-guide-sm" id="txt_add_cold_price">(보냉제 추가 <span id="totalIcePackPrice">0</span>원 포함)</span>
                                                    </p>
                                                    <input type="hidden" name="tot_price" className="resetOrderPaySide" value="가격"/>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="list-inner">
                                                    <span className="tit">배송비</span>
                                                    <p className="price">
                                                        <strong className="num resetOrderPaySide" id="txt_tot_dlv_price">0</strong> 원
                                                    </p>
                                                    <input type="hidden" name="tot_dlv_price" className="resetOrderPaySide" value="0"/>
                                                </div>
                                                <p className="text-guide-sm" id="txt_island">(도서산간 배송비 포함)</p>
                                            </li>
                                        </ul>
                                        <div className="total-price">
                                            <div className="list-inner">
                                                <span className="tit">최종 결제금액</span>
                                                <div className="price">
                                                    <strong className="num text-primary resetOrderPaySide" id="txt_tot_pg_price">가격</strong> 원
                                                    <input type="hidden" name="tot_pg_price" className="resetOrderPaySide" value="가격"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="point-container-box">
                                        <ul className="list-sub-inner">
                                            <li><span className="tit">적립예정 포인트</span><span className="txt"><span id="totalSavePointTot">0</span>P</span></li>
                                        </ul>
                                    </div>
                                    <ul className="terms-view">
                                        <li>
                                            <a href="#popup-terms-type-04" className="ui-open-pop" onClick="return false;">
                                                <span className="txt">처리위탁 및 3자 제공 동의</span>
                                                <span className="view">내용보기<i className="ico-arrfill-right"></i></span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#popup-terms-type-02" className="ui-open-pop" onClick="return false;">
                                                <span className="txt">결제대행서비스 이용 동의</span>
                                                <span className="view">내용보기<i className="ico-arrfill-right"></i></span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#popup-terms-type-14" className="ui-open-pop" onClick="return false;">
                                                <span className="txt">개인정보 수집 및 이용 동의</span>
                                                <span className="view">내용보기<i className="ico-arrfill-right"></i></span>
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="check-area">
                                        <div className="custom-checkbox">
                                            <input type="checkbox" id="checkTerms" className="checkbox" name="check_terms" data-nonmember-yn="N"/>
                                            <label htmlFor="checkTerms">상기 필수약관을 확인하였으며<br/>결제에 동의합니다.</label>
                                        </div>
                                        <div className="final-info-box">
                                            <div className="inner">
                                                <ul className="list">
                                                    <li id="payType" className="final-info-box-reset"></li>
                                                    <li id="divCardInst" className="final-info-box-reset"></li>
                                                    <li><span id="totPgPrice" className="final-info-box-reset">35,900</span>원</li>
                                                </ul>
                                                <p className="address final-info-box-reset" id="address"></p>
                                                <a className="link-txt" id="dlvLocationSaveBtn" href="javascript:void(0);" onClick="openUserDeliveryListPop();"><span>배송지변경</span><i className="ico-arr-right"></i></a>
                                            </div>
                                            <button className="btn-x-sm3" type="button"><i className="ico-x-white"></i><span className="blind">닫기</span></button>
                                        </div>
                                    </div>
                                    <button type="button" className="btn-basic-xlg btn-primary" onClick="fnCheckOrder()">
                                        <span className="num"><span id="txt_btn_payment" className="resetOrderPaySide">가격</span>원 결제하기</span>
                                    </button>
                                </div>
                            </div>
                            <div className="order-info">
                                <div className="lineless-table type1">
                                    <h3 className="title-list">포인트</h3>
                                    <table>
                                        <caption>포인트 사용</caption>
                                        <tbody>
                                        <tr>
                                            <th scope="row"><span className="tit">포인트 사용</span></th>
                                            <td>
                                                <div className="order-point">
                                                    <div className="input-group-wrap box-type">
                                                        <div className="input-group">
                                                            <input type="hidden" id="currentPoint" name="currentPoint" value="1582"/>
                                                                <input type="hidden" id="usePoint" name="usePoint" value="0"/>
                                                                    <input type="text" title="" className="input-text ui-point-input" id="textUsePoint" name="textUsePoint" placeholder="2,000P부터 사용가능" onkeydown="return numberOnly(event)" onkeyup="removeChar(event)" onblur="fnUsePoint()"/>
                                                    <span className="input-group-btn">
                                                        <button type="button" className="btn-ex-grey" onClick="fnUsePoint('all')"><span>전액사용</span></button>
                                                    </span>
                                                        </div>
                                                    </div>
                                                    <p className="point-guide">사용 가능 포인트 <em className="text-num-bold">포인트값</em>P</p>
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="order-info">
                                <div className="list-head">
                                    <h3 className="title-list">결제방법</h3>
                                </div>{/* list-head */}

                                <div className="payment-select">
                                    <div className="grid-area">
                                        <div className="colum col12">
                                            <ul className="radio-grid-span4">
                                                <li>
                                                    <div className="custom-radio">
                                                        <input type="radio" id="radio-grid-1" className="radio-box-grid" name="payType" value="CARD" data-card-type="GE" checked=""/>
                                                            <label htmlFor="radio-grid-1"><em className="txt"><i className="ico-pay-creditcard"></i>신용카드</em></label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="custom-radio">
                                                        <input type="radio" id="radio-grid-2" className="radio-box-grid" name="payType" value="VBANK"/>
                                                            <label htmlFor="radio-grid-2"><em className="txt"><i className="ico-pay-vbank"></i>무통장입금</em></label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="custom-radio">
                                                        <input type="radio" id="radio-grid-3" className="radio-box-grid" name="payType" value="BANK"/>
                                                            <label htmlFor="radio-grid-3"><em className="txt"><i className="ico-pay-bank"></i>실시간계좌이체</em></label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="custom-radio">
                                                        <input type="radio" id="radio-grid-4" className="radio-box-grid" name="payType" value="MOBILE"/>
                                                            <label htmlFor="radio-grid-4"><em className="txt"><i className="ico-pay-mobile"></i>휴대폰결제</em></label>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>{/* payment-select */}
                            </div>

                        </form>
                    </div>
                </div>
            </section>

            {/* ========== 컨텐츠 영역 :: container ========== */}
            <Footer />
        </div>
    );
};
