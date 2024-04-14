import React, {useEffect, useRef, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import '../../styles/order/css/Order.scoped.css';
import Header from '../../components/Header'; // frame.js에서 Header 함수 import
import Footer from '../../components/Footer'; // frame.js에서 Footer 함수 import
import axios from "axios";
import Select from "react-select";


export default function Order(){

    const  options = [
        { value: "메세지를 선택해 주세요.", label: "메세지를 선택해 주세요." },
        { value: "직접입력", label: "직접입력" },
        { value: "배송전, 연락 부탁드립니다.", label: "배송전, 연락 부탁드립니다." },
        { value: "부재시, 전화 또는 문자 주세요.", label: "부재시, 전화 또는 문자 주세요." },
        { value: "부재시, 경비(관리)실에 맡겨주세요.", label: "부재시, 경비(관리)실에 맡겨주세요." }
    ]

    const [selectOption, setSelectOption] = useState(options[0]); // 셀렉박스 선택

    const [isChecked, setIsChecked] = useState(false); // 체크박스의 상태를 관리하는 useState

    const [barPosition, setBarPosition] = useState(0);

    // 오른쪽 사이드 박스 스크롤 내릴 때 따라 움직이게 하는 함수
    const handleScroll = () => {
        const position = 450 < window.scrollY ? 450 : window.scrollY;
        setBarPosition(position);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // 체크박스 클릭 시 상태를 변경하는 핸들러 함수
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked); // 상태를 반전시킴
    };

    const [userInfo, setUserInfo] = useState({
        name: "강서연",
        address: "인천광역시 연수구",
        phoneNumber: "010-0000-0000"
    });

    useEffect(() => {
        fetchUserInfo(); // 컴포넌트가 처음 렌더링될 때 사용자 정보를 가져옵니다.
    }, []);

    const fetchUserInfo = async () => {
        try {
            const response = await fetch('/api/user'); // 서버 API의 엔드포인트에 요청합니다.
            if (!response.ok) {
                throw new Error('Failed to fetch user information');
            }
            const userData = await response.json(); // JSON 형식으로 응답을 가져옵니다.
            setUserInfo(userData); // 가져온 사용자 정보를 상태에 설정합니다.
        } catch (error) {
            console.error('Error fetching user information:', error);
        }
    };

    const [selectedItems, setSelectedItems] = useState({});

    // 페이지가 로드될 때 로컬 스토리지에서 선택된 상품들을 가져옴
    useEffect(() => {
        const storedSelectedItems = localStorage.getItem('selectedItems');
        if (storedSelectedItems) {
            setSelectedItems(JSON.parse(storedSelectedItems));
        }
    }, []);

    // async function getCategory() { // Axios 방식 사용
    //     const Spring_Server_Ip = process.env.REACT_APP_Spring_Server_Ip;
    //     const response = await axios.get(`${Spring_Server_Ip}/admin/category/test`);
    //     setCategoryData(response.data);
    // }


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
                        <form id="ordFrm" name="ordFrm" action="/order/Order" method="post"
                              data-gtm-form-interact-id="0">
                            <div className="order-info">
                                <div className="list-head-sub">
                                    <h3 className="title-list">배송지 정보</h3>
                                    <a href="javascript:void(0);" className="btn-basic-sm2 btn-default">
                                        <span>배송지변경</span>
                                        <i className="ico-arr-right"></i>
                                    </a>
                                </div>
                                <div className="lineless-table type1">
                                    <div id="addressInfoDiv">
                                        <h3>{userInfo.name}<em className="badge-point2">기본배송지</em></h3>
                                        <p><strong className="addr-name">{userInfo.address}</strong></p>
                                        <ul className="order-order-info">
                                            <li>
                                                <span>{userInfo.phoneNumber}</span>
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
                                        <ul className="cart-list">
                                            {Object.values(selectedItems).map(item => (
                                                <li key={item.product_id}>
                                                    <div className="prd-info-area ">
                                                        <div className="inner">
                                                            <div className="column img">
                                                                <a href={`/product/view?productCd=${item.product_id}`}>
                                                                    <img src={item.image} alt="상품이미지"/>
                                                                </a>
                                                            </div>
                                                            <div className="column tit">
                                                                <p className="tit"><a
                                                                    href={`/product/view?productCd=${item.product_id}`}>{item.name}</a>
                                                                </p>
                                                                <p className="desc">{item.option}</p>
                                                                <ul className="price-item">
                                                                    <li><span className="num">{item.price}</span>원</li>
                                                                    <li><span className="num">{item.quantity}</span>개
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="column price w70">
                                                                <span className="num">{item.price}</span>원
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>

                                    </div>
                                </div>
                                <div className="dlv-request-box">
                                    <div className="inner-div">
                                        <div className="request-tit"><h5>배송 요청사항</h5></div>
                                        <div className="request-detail">
                                            <div className="ui-select select-box w-full">
                                                <Select options={options} //위에서 만든 배열을 select로 넣기
                                                        onChange={setSelectOption} //값이 바뀌면 setState되게
                                                        defaultValue={options[0]} />

                                            </div>
                                            {selectOption.value === '직접입력' && (
                                                <div id="direct-item-nor" className="ui-direct-input">
                                                    <input
                                                        type="text"
                                                        className="input-text w-full deliveryComment removeEmoji"
                                                        id="customRequest"
                                                        name="dlv_memo"
                                                        placeholder="배송 요청 사항을 입력하세요"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="side-fix-area fixed" style={{ top: barPosition }}>
                                <div className="payment-info-box ui-box-fix">
                                    <h3 className="tit">주문결제 금액</h3>
                                    <div className="order-price">
                                        <ul className="div-price">
                                            <li>
                                                <div className="list-inner">
                                                    <span className="tit">상품금액</span>
                                                    <p className="price"><strong className="num resetOrderPaySide"
                                                                                 id="txt_tot_price">가격</strong> 원
                                                    </p>
                                                    <input type="hidden" name="tot_price" className="resetOrderPaySide"
                                                           value="가격"/>
                                                </div>
                                            </li>
                                            <li>
                                            <div className="list-inner">
                                                    <span className="tit">배송비</span>
                                                    <p className="price">
                                                        <strong className="num resetOrderPaySide"
                                                                id="txt_tot_dlv_price">0</strong> 원
                                                    </p>
                                                    <input type="hidden" name="tot_dlv_price"
                                                           className="resetOrderPaySide" value="0"/>
                                                </div>
                                            </li>
                                        </ul>
                                        <div className="total-price">
                                            <div className="list-inner">
                                                <span className="tit">최종 결제금액</span>
                                                <div className="price">
                                                    <strong className="num text-primary resetOrderPaySide"
                                                            id="txt_tot_pg_price">가격</strong> 원
                                                    <input type="hidden" name="tot_pg_price"
                                                           className="resetOrderPaySide" value="가격"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <ul className="terms-view">
                                        <li>
                                            <a href="#popup-terms-type-04" className="ui-open-pop"
                                               onClick="return false;">
                                                <span className="txt">처리위탁 및 3자 제공 동의</span>
                                                <span className="view">내용보기<i className="ico-arrfill-right"></i></span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#popup-terms-type-02" className="ui-open-pop"
                                               onClick="return false;">
                                                <span className="txt">결제대행서비스 이용 동의</span>
                                                <span className="view">내용보기<i className="ico-arrfill-right"></i></span>
                                            </a>
                                        </li>

                                        <li>
                                            <a href="#popup-terms-type-14" className="ui-open-pop"
                                               onClick="return false;">
                                                <span className="txt">개인정보 수집 및 이용 동의</span>
                                                <span className="view">내용보기<i className="ico-arrfill-right"></i></span>
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="check-area">
                                        <div className="custom-checkbox">
                                            <input type="checkbox" id="checkTerms" className="checkbox"
                                                   name="check_terms" data-nonmember-yn="N"
                                                   checked={isChecked}
                                                   onChange={handleCheckboxChange}/>
                                            <label htmlFor="checkTerms">상기 필수약관을 확인하였으며<br/>결제에 동의합니다.</label>
                                        </div>
                                    </div>
                                    <button type="button" className="btn-basic-xlg btn-primary">
                                        <span className="num"><span id="txt_btn_payment"
                                                                    className="resetOrderPaySide">가격</span>원 결제하기</span>
                                    </button>
                                </div>
                            </div>
                            <div className="order-info">
                                <div className="list-head">
                                    <h3 className="title-list">결제방법</h3>
                                </div>
                                {/* list-head */}

                                <div className="payment-select">
                                    <div className="grid-area">
                                        <div className="colum col12">
                                            <ul className="radio-grid-span4">
                                                <li>
                                                    <div className="custom-radio">
                                                        <input type="radio" id="radio-grid-1" className="radio-box-grid"
                                                               name="payType" value="CARD" data-card-type="GE"
                                                               checked=""/>
                                                        <label htmlFor="radio-grid-1"><em className="txt"><i
                                                            className="ico-pay-creditcard"></i>신용카드</em></label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="custom-radio">
                                                        <input type="radio" id="radio-grid-2" className="radio-box-grid"
                                                               name="payType" value="VBANK"/>
                                                        <label htmlFor="radio-grid-2"><em className="txt"><i
                                                            className="ico-pay-vbank"></i>무통장입금</em></label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="custom-radio">
                                                        <input type="radio" id="radio-grid-3" className="radio-box-grid"
                                                               name="payType" value="BANK"/>
                                                        <label htmlFor="radio-grid-3"><em className="txt"><i
                                                            className="ico-pay-bank"></i>실시간계좌이체</em></label>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="custom-radio">
                                                        <input type="radio" id="radio-grid-4" className="radio-box-grid"
                                                               name="payType" value="MOBILE"/>
                                                        <label htmlFor="radio-grid-4"><em className="txt"><i
                                                            className="ico-pay-mobile"></i>휴대폰결제</em></label>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {/* payment-select */}
                            </div>

                        </form>
                    </div>
                </div>
            </section>

            {/* ========== 컨텐츠 영역 :: container ========== */}
            <Footer/>
        </div>
    );
};
