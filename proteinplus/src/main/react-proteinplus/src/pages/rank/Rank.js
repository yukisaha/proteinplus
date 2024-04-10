import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation  } from 'react-router-dom';
import Header from '../../components/Header'; // frame.js에서 Header 함수 import
import Footer from '../../components/Footer'; // frame.js에서 Footer 함수 import
import '../../styles/rank/css/Rank.scoped.css';
import axios from "axios";

function Rank() {

    const { categoryId } = useParams(); // URL에서 카테고리 이름 파라미터 추출

    const location = useLocation();

    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(true); // 초기에는 로딩 중 상태로 설정

    async function getCategory() { // Axios 방식 사용
        const Spring_Server_Ip = process.env.REACT_APP_Spring_Server_Ip;
        try {
            const response = await axios.get(`${Spring_Server_Ip}/rank`);
            setCategoryData(response.data);
            setLoading(false); // 데이터를 성공적으로 받아온 후 로딩 상태 해제
        } catch (error) {
            setLoading(false); // 데이터를 받아오는데 실패해도 로딩 상태 해제
        }
    }

    useEffect(() => {
        // 카테고리 전체 조회 함수 호출
        getCategory();
    }, []);

    if (loading) {
        // 로딩 중인 경우
        return <div className="loading-indicator">로딩중...</div>;
    }

    // categoryData가 없는 경우
    if (!categoryData) {
        return <div className="loading-indicator">데이터를 가져오는 중입니다...</div>;
    }

    return (
        <div className="wrap main">
            <Header /> {/* Header 컴포넌트 추가 */}
            <section id="contents" className="container">
                <div className="content-wrap ranking-content">
                    <div className="page-head">
                        <div className="title-area">
                            <h2 className="tit">랭킹</h2>
                        </div>
                        <ul className="side-tab-menu">
                            <li className="realtime">
                                <Link to={`/product/rank/${categoryId}`} className="tit_rank">실시간랭킹</Link>
                            </li>
                            {/*
                            <li className="ingredient">
                                <Link to={`/product/rank/${categoryId}/ingredient`} className="tit_rank">성분별랭킹</Link>
                            </li>
                            */}
                        </ul>
                    </div>

                    <div className="frame-sm">
                        <div className="rank-category-tb-wrap">
                            <div className="rank-category-table">
                                <div className={`category-list ${categoryId == 0 ? 'active' : ''}`}>
                                    <ul>
                                        <li>
                                            <Link to={`/product/rank/0 `}>
                                                전체
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                {categoryData.map((parentCategory) => (
                                    <div key={parentCategory.id} className={`category-list ${categoryId === `${parentCategory.id}` ? 'active' : ''}`}>
                                        <ul>
                                            <li>
                                                <Link to={`/product/rank/${parentCategory.id}`}>
                                                    {parentCategory.name}
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="sorting-tab-menu">
                            <h2 className="text-left">오늘의 전체 랭킹 순위!</h2>
                            <ul>
                                <li className={`sorting-tab-menu-list ${location.pathname === `/product/rank/${categoryId}/sales` ? '' : 'active'}`}>
                                    <Link to={`/product/rank/${categoryId}`} className={`tit_type`} data-type="REALTIME">실시간</Link>
                                </li>
                                <li className={`sorting-tab-menu-list ${location.pathname === `/product/rank/${categoryId}/sales` ? 'active' : ''}`}>
                                    <Link to={`/product/rank/${categoryId}/sales`} className={`tit_type`} data-type="SALE">판매량</Link>
                                </li>
                            </ul>
                        </div>


                        {/* 랭킹 리스트 */}
                        <div className="rank-list-wrap" id="div-rankList">
                            <ol className="ranking-list">

                                {/* 1위 */}
                                <li className="list-renewal-2 rank-item" data-list="1">
                                    <span className="number-rd-empty">1</span>
                                    <div className="prd-info-area">
                                        <div className="inner">
                                            <div className="column img w110">
                                                <a href="상품상세페이지링크">
                                                    <img className="lozad" data-src="이미지 링크" alt="이미지 정보" src="이미지 링크"
                                                         loaded="true"></img>
                                                </a>
                                            </div>
                                            <div className="column tit">
                                                <span className="prd-brand">브랜드명</span>
                                                <p className="tit">
                                                    <a href="상품상세페이지링크" className="text-elps2">[브랜드명] 상품이름</a>
                                                </p>
                                                <p className="tit-sub text-elps">상품 요약? 또는 추가 상품</p>
                                                <p className="text-guide-sm"></p>
                                                {/*
                                                    <div class="flex-box">
                                                      <em class="imgbadge-div-exp">
                                                        <span class="blind">특급배송</span>
                                                      </em>
                                                    </div>
                                                */}
                                            </div>
                                            <div className="column point2">3% 적립</div>
                                            <div className="column dlv2">
                                                <div className="rating-simply">
                                                    <span className="score">4.9</span> {/* 평점 */}
                                                    <span className="total-num">(82,644)</span> {/* 평점을 작성한 유저 수 */}
                                                </div>
                                            </div>
                                            <div className="column price text-left">
                                                <p className="origin">
                                                    <span>24,900</span> {/* 원가 */}
                                                    원
                                                </p>
                                                <div className="price-flex">
                                                    <span className="sale">
                                                        <strong>29</strong> {/* 할인율 */}
                                                        %
                                                    </span>
                                                                                    <span className="price">
                                                      <em className="num">17,900</em> {/* 할인가 */}
                                                        원
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="column btn2">
                                                <ul className="btn-list">
                                                    <li className="btn-icon-cart-li">
                                                        <button type="button" className="btn-icon-cart2 btn-ext-cart"
                                                                title>
                                                            <span className="blind">장바구니</span>
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button className="custom-checkbox">
                                                            <input type="checkbox" id="check-0" name="check-wish-item"
                                                                   className="checkbox-wish btn-ext-wish"/>
                                                                <label htmlFor="check-0" title>
                                                                    <span className="blind">찜하기</span>
                                                                </label>
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                             </ol>
                        </div>
                    </div>
                </div>
            </section>
            <Footer /> {/* Footer 컴포넌트 추가 */}
        </div>
    );
}

export default Rank;