import React from 'react';
import '../../styles/product/css/ProductInfo.scoped.css';

function ProductInfo() {

    return (
        <div className="product-info-container">
                <h2 className="title">배송안내</h2>
                <hr/>
                <div className="row">
                    <div className="left">택배사</div>
                    <div className="right">
                        CJ대한통운 (1588-1255), 롯데택배(1588-2121), 한진택배(1588-0011)
                    </div>
                </div>
                <div className="row">
                    <div className="left">유의사항</div>
                    <div className="right">
                        <ul>
                            <li>※도서산간, 택배사 사유, 재고 상황 등의 이유로 도착 예정일은 변동될 수 있습니다.</li>
                            <li>※금요일 주문 마감 시간 이전 주문은 토요일에 배송됩니다.</li>
                            <li>(공휴일인 경우, 다음 영업일 발송)</li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="left">일반배송</div>
                    <div className="right">
                        <ul>
                            <li>※일반배송 안내</li>
                            <li>- 평일 17시까지 주문 시, 당일 발송!</li>
                            <li>- 일요일 17시까지 주문 시, 당일 발송!</li>
                            <li>&nbsp;</li>
                            <li>※ 유의사항</li>
                            <li>- 제주 및 도서산간 지역은 목요일 배송 마감됩니다.</li>
                        </ul>
                    </div>
                </div>

                <h2 className="title">교환/반품 안내</h2>
                <hr/>
                <div className="row">
                    <div className="left">주의사항</div>
                    <div className="right">
                        <ul>
                            <li>- 본 상품은 제품 특성상 단순 변심에 의한 교환 · 반품은 불가합니다.</li>
                            <li>- 군부대, 사서함 주소의 경우 배송이 안될 수 있으니 고객센터 확인 후 주문 바랍니다.</li>
                            <li>(구매 전 제품 상세 및 배송 · 반품에 대한 내용을 확인해 주세요.)</li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="left">교환/반품 신청</div>
                    <div className="right">
                        <ul>
                            <li>제품의 교환 및 반품 시 고객센터 담당자에게 교환 또는 반품 신청을 해주시기 바랍니다.</li>
                            <li>(전화 : 070-4633-2017 / 홈페이지 고객센터)</li>
                            <li>&nbsp;</li>
                            <li>- 교환 및 반품은 고객센터 담당자와 협의를 통해 이루어지며, 임의로 수취거부 및 반송하는 경우 반품 처리되지 않습니다</li>
                            <li>- 냉동/냉장 식품의 경우 제품의 특성상 ‘단순변심’에 의한 반품 및 환불은 불가합니다.</li>
                            <li>주문전 충분히 제품 상세페이지 및 제품 설명을 참고하시고 주문바랍니다. </li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="left">교환/반품이 가능한 경우</div>
                    <div className="right">
                        <ul>
                            <li>- 주문한 제품과 다르거나 판매자의 제공정보와 상이한 경우</li>
                            <li>- 제품이 불량이거나 손상된 경우</li>
                            <li>- 배송사의 귀책 사유에 따른 배송 지연 발생 및 제품이 변질 된 경우</li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="left">교환/반품이 불가능한 경우</div>
                    <div className="right">
                        <ul>
                            <li>- 판매자와 교환/반품에 대한 협의 없이 임의로 폐기 처분 또는 반품/배송한 경우</li>
                            <li>- 냉동·냉장 보관 식품 및 채소 상품에 대한 단순 변심의 경우</li>
                            <li>- 잘못된 주소나 연락처 기재로 인한 반송 또는 고객의 부재로 인해 배송이 지연되어 제품이 변질된 경우</li>
                            <li>- 수령 후, 보관/취급 부주의로 인해 제품이 변질 또는 손상된 경우</li>
                            <li>- PC 및 휴대폰의 화면과 실제 상품의 색상이나 이미지 차이 또는 개인적 취향이나 기호에 따른 교환/반품</li>
                        </ul>
                    </div>
                </div>
                <div className="row">
                    <div className="left">교환/반품 절차</div>
                    <div className="right">
                        <ul>
                            <li>- 전화 및 이메일을 통해 반송처 및 교환/반품 방법을 안내해드립니다.</li>
                            <li>- 반품시 결제방식에 따라 카드 승인취소 또는 계좌입금 처리를 해드립니다.</li>
                        </ul>
                    </div>
                </div>
        </div>
    )
}

export default ProductInfo;