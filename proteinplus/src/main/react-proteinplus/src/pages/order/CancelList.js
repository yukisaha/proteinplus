import React, {useEffect, useState} from 'react';
import '../../styles/order/css/OrderDetail.scoped.css';
import MypageFrame from '../../components/MypageFrame';
import axios from "axios";

export default function CancelList(){
    // 임시 데이터를 사용하여 상품 목록 생성
    const tempProductData = [
        {
            id: 1,
            name: '[맛있닭] 닭가슴살 스테이크',
            imageUrl: 'https://file.rankingdak.com/image/RANK/PRODUCT/PRD001/20240109/IMG1704AEO777787343_330_330.jpg',
            salePercent: 29,
            price: '17,900',
            originalPrice: '24,900',
            rating: '★4.9',
            totalRating: '(82,648)'
        }
    ];

    const [cancelListData, setCancelListData] = useState([]);

    async function getCancelList() { // Axios 방식 사용
        const Spring_Server_Ip = process.env.REACT_APP_Spring_Server_Ip;
        const response = await axios.get(`${Spring_Server_Ip}/api/user/mypage/cancellist`);
        setCancelListData(response.data);
    }

    useEffect(() => {
        // 카테고리 전체 조회 함수 호출
        getCancelList();
    }, []);

    const renderOrderListItems = () => {
        if (tempProductData.length === 0) {
            return (
                <div>
                    <div className="menu-title-area">
                        <h3 className="title-menu">취소내역</h3>
                    </div>
                    {/* menu-title-area */}
                    <div className="search-box">
                        <div className="search-detail">
                            <fieldset>
                                <legend>상세 검색</legend>
                                <div className="search-detail-top">
                                    <div className="search-detail-date-itemname">
                                        <div className="input-group w-full">
                                            <label for="item1-1" className="blind">검색</label>
                                            <input type="text" id="item1-1" name="srchProductNm" className="input-text"
                                                   placeholder="취소 상품명 검색" value=""/>
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
                            <div className = "no-data">
                                <p className = "message">
                                    취소내역이 없습니다.
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
                    <h3 className="title-menu">취소내역</h3>
                </div>
                {/* menu-title-area */}
                <div className="search-box">
                    <div className="search-detail">
                        <fieldset>
                            <legend>상세 검색</legend>
                            <div className="search-detail-top">
                                <div className="search-detail-date-itemname">
                                    <div className="input-group w-full">
                                        <label for="item1-1" className="blind">검색</label>
                                        <input type="text" id="item1-1" name="srchProductNm" className="input-text"
                                               placeholder="취소 상품명 검색" value=""/>
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
                        <li>
                            {/* 취소 목록 */}
                            <div className="order-list-head">
                                <strong className="date">취소날짜</strong>
                                <div className="right">
                                    <span className="order-item-id">주문번호</span>
                                </div>
                            </div>
                            <div className="order-content-box">
                                <ul className="order-div-list">
                                    {tempProductData.map(item => (
                                        <li key={item.id} className="order-div-item">
                                            <div className="prd-info-area">
                                                <div className="inner">
                                                    <div className="column img">
                                                        <a href="javascript:void(0);">
                                                            <img src={item.imageUrl} alt="상품이미지"/>
                                                        </a>
                                                    </div>
                                                    <div className="column tit">
                                                        <div className="prd-state-row">
                                                            <strong className="prd-state-head">주문취소</strong>
                                                        </div>
                                                        <div className="tit">
                                                            <a href="javascript:void(0);">{item.name}</a>
                                                        </div>
                                                        <p className="desc">상품옵션</p>
                                                    </div>
                                                    <div className="price-item">
                                                        <div className="dlv-nmr">
                                                            <p className="dlv-nmr-price">
                                                                <span className="num">{item.price}</span>원
                                                            </p>
                                                            <p className="dlv-nmr-cnt">
                                                                <span className="num">상품개수</span>개
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    };

    return <MypageFrame>{renderOrderListItems()}</MypageFrame>;
}

