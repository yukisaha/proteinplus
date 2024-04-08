import React, { useState } from 'react';
import Header from '../../components/Header'; // frame.js에서 Header 함수 import
import Footer from '../../components/Footer'; // frame.js에서 Footer 함수 import
import '../../styles/cart/css/Cart.css'; // cart.css 파일 가져오기

function Cart() {
    const [isChecked, setIsChecked] = useState(true); // isChecked 상태와 해당 상태를 변경할 함수 setIsChecked를 생성하고 기본값으로 true를 설정합니다.

    const handleCheckAllChange = () => {
        setIsChecked(!isChecked); // isChecked 상태를 반전시킵니다.
    };

    return (
        <div className="wrap main">
            <Header /> {/* Header 컴포넌트 추가 */}
            <section id="contents" className="container">
                <div className="content-wrap frame-sm cart-jsp">
                    <div className="page-title-area">
                        <h2 className="title-page">장바구니</h2>
                        <div className="cart-option">
                            <div className="custom-checkbox">
                                <input type="checkbox" id="checkAll" className="checkbox checkboxGroup"
                                checked={isChecked} // isChecked 상태를 체크 상태로 지정합니다.
                                onChange={handleCheckAllChange} // 체크 상태가 변경될 때 handleCheckAllChange 함수를 호출합니다.
                                />
                                <label htmlFor="checkAll">전체선택</label>
                            </div>
                            <button type="button" id="deleteUserCartList" className="btn-option btn-default">
                                <span>선택삭제</span>
                            </button>
                        </div>
                    </div>

                    <div className="cart-list-area">
                        <div className="cart-list-area" id="delivery-group-1600">
                            <ul className="cart-list">
                                <li id="delivery-product-9231600N" className="delivery-product-9231600NY">
                                    <div className="prd-info-area cart-info-area">
                                        <div className="inner">
                                            <div className="column check">
                                                <div className="custom-checkbox single">
                                                    <input type="checkbox" checked id="check-product-923N" className="checkbox deleteUserCartList productCheckbox" name="check1600" />
                                                    <label htmlFor="check-product-923N" className="blind">선택</label>
                                                </div>
                                            </div>
                                            <input type="hidden" className="arrCartid-923" value="20240408000024272765" />
                                            <input type="hidden" className="vProductcd-923" value="923" />
                                            <input type="hidden" className="vProductcd-923-couponPrice couponPrice" value="0" />

                                            <div className="column img">
                                                <label htmlFor="check-product-923N">
                                                    <img src="https://file.rankingdak.com/image/RANK/PRODUCT/PRD001/20240109/IMG1704AEO777787343_100_100.jpg" alt="상품이미지" />
                                                </label>
                                            </div>
                                            <div className="column tit">
                                                <p className="tit">
                                                    <a href="/product/view?productCd=923" className="productNm">[맛있닭] 닭가슴살 스테이크</a>
                                                </p>
                                                <p className="desc">오리지널 100g / 10팩</p>
                                                <p className="desc"></p>

                                                <ul className="price-item">
                                                    <li><span className="num">17,900</span>원</li>
                                                </ul>
                                            </div>

                                            <div className="column qty">
                                                <div className="qty-group">
                                                    <button type="button" className="btn-qty cart" title="">
                                                        <i className="ico-minus-bold"></i><span className="blind">빼기</span>
                                                    </button>
                                                    <input type="text" title="" className="input-qty product-923" id="qty-20240408000024272765" value="1" data-max-qty="0" readOnly />
                                                    <button type="button" className="btn-qty cart" title="">
                                                        <i className="ico-plus-bold"></i><span className="blind">더하기</span>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="column price">
                                                <input type="hidden" id="cart-orange-save-price-minus-20240408000024272765" className="nOrangeSavePriceMinus" value="350" />
                                                <input type="hidden" id="cart-orange-save-price-20240408000024272765" className="nOrangeSavePrice" value="17550" />
                                                <div className="price-div">
                                                    <span className="num cart-price-923 brand-cd-1042 partner-cd-16 cart-price-923" id="cart-price-20240408000024272765">17,900</span>원
                                                </div>
                                            </div>

                                            <div className="column btn">
                                                <button type="button" className="btn-x-sm deleteUserCart" title="">
                                                    <i className="ico-x-black"></i><span className="blind">삭제</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                                <li id="delivery-product-F0000080611600N" className="delivery-product-F0000080611600NY">
                                    <div className="prd-info-area cart-info-area">
                                        <div className="inner">
                                            <div className="column check">
                                                <div className="custom-checkbox single">
                                                    <input type="checkbox" checked id="check-product-F000008061N" className="checkbox deleteUserCartList productCheckbox" name="check1600" />
                                                    <label htmlFor="check-product-F000008061N" className="blind">선택</label>
                                                </div>
                                            </div>
                                            <input type="hidden" className="arrCartid-F000008061" value="20240408000024272766" />
                                            <input type="hidden" className="vProductcd-F000008061" value="F000008061" />
                                            <input type="hidden" className="vProductcd-F000008061-couponPrice couponPrice" value="0" />

                                            <div className="column img">
                                                <label htmlFor="check-product-F000008061N">
                                                    <img src="https://file.rankingdak.com/image/RANK/PRODUCT/PRD001/20240105/IMG1704blS429769436_100_100.jpg" alt="상품이미지" />
                                                </label>
                                            </div>
                                            <div className="column tit">
                                                <p className="tit">
                                                    <a href="/product/view?productCd=F000008061" className="productNm">[잇메이트] 크리스피 닭가슴살</a>
                                                </p>
                                                <p className="desc">오리지널 10팩</p>
                                                <p className="desc"></p>

                                                <ul className="price-item">
                                                    <li><span className="num">26,500</span>원</li>
                                                    <li className="dlv-type"><em className="imgbadge-dlv-exp"><span className="blind">특급배송</span></em></li>
                                                </ul>
                                            </div>

                                            <div className="column qty">
                                                <div className="qty-group">
                                                    <button type="button" className="btn-qty cart" title="">
                                                        <i className="ico-minus-bold"></i><span className="blind">빼기</span>
                                                    </button>
                                                    <input type="text" title="" className="input-qty product-F000008061" id="qty-20240408000024272766" value="1" readOnly />
                                                    <button type="button" className="btn-qty cart" title="">
                                                        <i className="ico-plus-bold"></i><span className="blind">더하기</span>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="column price">
                                                <input type="hidden" id="cart-orange-save-price-minus-20240408000024272766" className="nOrangeSavePriceMinus" value="530" />
                                                <input type="hidden" id="cart-orange-save-price-20240408000024272766" className="nOrangeSavePrice" value="25970" />
                                                <div className="price-div">
                                                    <span className="num cart-price-F000008061 brand-cd-1046 partner-cd-16 cart-price-F000008061" id="cart-price-20240408000024272766">26,500</span>원
                                                </div>
                                            </div>

                                            <div className="column btn">
                                                <button type="button" className="btn-x-sm deleteUserCart" title="">
                                                    <i className="ico-x-black"></i><span className="blind">삭제</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>


                            </ul>
                        </div>
                    </div>

                    <div className="cart-total-box grid-area-span4">
                        <div className="colum">
                            <dl className="price-info">
                                <dt className="tit">상품금액</dt>
                                <dd className="price"><em className="num" id="totalProductPrice">63,700</em>원</dd>
                            </dl>
                        </div>
                        <div className="colum">
                            <dl className="price-info">
                                <dt className="tit">할인금액</dt>
                                <dd className="price"><em className="num" id="totalDiscountPrice">0</em>원</dd>
                            </dl>
                        </div>
                        <div className="colum">
                            <dl className="price-info">
                                <dt className="tit">배송비</dt>
                                <dd className="price"><em className="num" id="totalDeliveryPrice">0</em>원</dd>
                            </dl>
                        </div>
                        <div className="colum">
                            <dl className="price-info-last">
                                <dt className="tit">총 결제금액</dt>
                                <dd className="price">
                                    <em className="num text-primary totalOrderPrice">63,700</em>원
                                </dd>
                            </dl>
                        </div>
                    </div>

                    <div className="page-guide-center">
                        <ul className="bl-list-type1">
                            <li>배송방법 선택 또는 배송지에 따라 배송비가 달라질 수 있습니다.</li>
                            <li>제품별로 출고지 및 출고일정이 상이하여 합포장 또는 개별발송될 수 있습니다.</li>
                            <li>상온과 냉동 합배송이 가능한 품목의 경우에는 상온 마감시간 기준으로 합배송 출고될 수 있습니다.</li>
                        </ul>
                    </div>

                    <div className="btn-bottom-area">
                        <a href="/" className="btn-basic-xxlg btn-default-ex">
                            <span>쇼핑계속하기</span>
                        </a>
                        <a href="javascript:void(0);" className="btn-basic-xxlg btn-primary-ex" id="order">
                            <span><em className="text-num-bold totalOrderPrice">63,700</em>원 주문하기</span>
                        </a>
                    </div>

                </div>
            </section>

            <Footer /> {/* Footer 컴포넌트 추가 */}
        </div>
    );
}

export default Cart;
