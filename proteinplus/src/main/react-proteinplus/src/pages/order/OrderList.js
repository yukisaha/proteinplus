import React, { useEffect, useState } from 'react';
import '../../styles/order/css/OrderDetail.scoped.css';
import MypageFrame from '../../components/MypageFrame';
import axios from "axios";

export default function OrderList() {
    const [orderListData, setOrderListData] = useState([]);
    const [addressData, setAddressData] = useState({}); // 주문별 배송 정보를 저장할 객체
    const token = window.localStorage.getItem("token");

    async function getOrderList() {
        try {
            const response = await axios.get(`/api/api/user/mypage/orderlist`, {
                headers: {
                    Authorization: `${token}`
                }
            });
            console.log("response.data-->", response);
            setOrderListData(response.data.content);
        } catch (error) {
            console.error('주문 내역을 불러오는 중 오류가 발생했습니다:', error);
        }
    }

    useEffect(() => {
        // 주문 내역 조회 함수 호출
        getOrderList();
    }, []);

    const handleCancelOrder = async (orderId) => {
        try {
            await axios.post(`/api/api/user/mypage/orderlist/${orderId}`);
            // 주문 취소 성공 시 화면 갱신 또는 사용자에게 알림
            alert('주문이 취소되었습니다.');
            // 취소 후 주문 목록을 다시 불러옴
            getOrderList();
        } catch (error) {
            console.error('주문 취소 중 오류가 발생했습니다:', error);
        }
    };

    useEffect(() => {
        const fetchData = async (orderId) => {
            try {
                const response = await axios.get(`/api/api/order/delivery/${orderId}`);
                console.log("addressdata-->", response.data);
                setAddressData(prevState => ({
                    ...prevState,
                    [orderId]: response.data
                }));
            } catch (error) {
                console.error(`주문 ID ${orderId}에 대한 주소 정보를 불러오는 중 오류가 발생했습니다:`, error);
            }
        };

        // 주문 목록 데이터가 변경될 때마다 주문별 주소 정보를 가져오도록 함
        orderListData.forEach(order => {
            fetchData(order.orderId);
        });
    }, [orderListData]);

    const renderOrderListItems = () => {
        if (orderListData.length === 0) {
            return (
                <div>
                    <div className="menu-title-area">
                        <h3 className="title-menu">주문내역</h3>
                    </div>
                    {/* menu-title-area */}
                    <div className="search-box">
                        <div className="search-detail">
                            <fieldset>
                                <legend>상세 검색</legend>
                                <div className="search-detail-top">
                                    <div className="search-detail-date-itemname">
                                        <div className="input-group w-full">
                                            <label htmlFor="item1-1" className="blind">검색</label>
                                            <input type="text" id="item1-1" name="srchProductNm" className="input-text"
                                                   placeholder="주문 상품명 검색" value=""/>
                                            <span className="input-group-btn">
                                                <button type="submit" className="btn-icon-search search-word"
                                                        title=""><i className="ico-btn-search"></i>
                                                    <span className="blind">검색하기</span>
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        {/* search-detail*/}
                    </div>
                    {/* search-box */}
                    <div className="order-list-area">
                        <ul className="order-list-inner">
                            <div className="no-data">
                                <p className="message">
                                    주문내역이 없습니다.
                                </p>
                            </div>
                        </ul>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div className="menu-title-area">
                    <h3 className="title-menu">주문내역</h3>
                </div>
                {/* menu-title-area */}
                <div className="search-box">
                    <div className="search-detail">
                        <fieldset>
                            <legend>상세 검색</legend>
                            <div className="search-detail-top">
                                <div className="search-detail-date-itemname">
                                    <div className="input-group w-full">
                                        <label htmlFor="item1-1" className="blind">검색</label>
                                        <input type="text" id="item1-1" name="srchProductNm" className="input-text"
                                               placeholder="주문 상품명 검색" value=""/>
                                        <span className="input-group-btn">
                                            <button type="submit" className="btn-icon-search search-word" title=""><i
                                                className="ico-btn-search"></i>
                                                <span className="blind">검색하기</span>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    {/* search-detail*/}
                </div>
                {/* search-box */}
                <div className="order-list-area">
                    <ul className="order-list-inner">
                        {orderListData.map((order) => (
                            <li key={order.orderId}>
                                {/* 주문 목록 */}
                                <div className="order-list-head">
                                    <strong className="date">{order.orderDate}</strong>
                                    <div className="right">
                                        <span className="order-item-id">{order.orderId}</span>
                                    </div>
                                </div>
                                <div className="order-content-box">
                                    <ul className="order-div-list">
                                        {order.orderDetailDtoList.map((item, index) => (
                                            <li key={index} className="order-div-item">
                                                <div className="prd-info-area">
                                                    <div className="inner">
                                                        <div className="column img">
                                                            <img src={item.mainImageUrl} alt="상품이미지"/>
                                                        </div>
                                                        <div className="column tit">
                                                            <div className="prd-state-row">
                                                                <strong className="prd-state-head">{order.orderStatus}</strong>
                                                            </div>
                                                            <div className="tit">
                                                                <a href="javascript:void(0);">{item.productName}</a>
                                                            </div>
                                                        </div>
                                                        <div className="column col-btn-group">
                                                            <div className="col-btn-group-inn">
                                                                {order.orderStatus !== 'CANCELLED' &&
                                                                    <button onClick={() => handleCancelOrder(order.orderId)} className="prd-control-btn">
                                                                        <span>취소</span>
                                                                    </button>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="price-item">
                                                            <div className="dlv-nmr">
                                                                <p className="dlv-nmr-price">
                                                                    <span className="num">{item.price}</span>원
                                                                </p>
                                                                <p className="dlv-nmr-cnt">
                                                                    <span className="num">{item.count}</span>개
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="addr-info-line">
                                        <p><i className="ico-bl-home2"></i></p>
                                        {addressData[order.orderId] ? (
                                            <>
                                                [{addressData[order.orderId].receiverPost}] {addressData[order.orderId].receiverAddr}, {addressData[order.orderId].receiverAddrDtl}
                                            </>
                                        ) : (
                                            '주소 정보를 불러오는 중입니다...'
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    };

    return <MypageFrame>{renderOrderListItems()}</MypageFrame>;
}
