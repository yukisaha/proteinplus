import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation  } from 'react-router-dom';
import '../../styles/product/css/ProductList.scoped.css';
import Header from '../../components/Header'; // frame.js에서 Header 함수 import
import Footer from '../../components/Footer'; // frame.js에서 Footer 함수 import
import '../../styles/rank/css/Rank.scoped.css';
import axios from "axios";

function Rank() {

    const { categoryId } = useParams(); // URL에서 카테고리 이름 파라미터 추출

    const all = 0;

    const [categoryData, setCategoryData] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // 초기에는 로딩 중 상태로 설정

    async function getCategory() { // Axios 방식 사용
        try {
            const response = await axios.get(`/api/rank`);
            setCategoryData(response.data);
            setLoading(false); // 데이터를 성공적으로 받아온 후 로딩 상태 해제
        } catch (error) {
            setLoading(false); // 데이터를 받아오는데 실패해도 로딩 상태 해제
        }
    }

    //전체 상품 조회
    const fetchAllProducts = async () => {
        try {
            const response = await axios.get(`/api/product/test/sell`);
            let sortedProducts = response.data;
            sortedProducts.sort((a, b) => b.discountRate - a.discountRate);
            setProducts(sortedProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };


    //id별 판매중인 상품 조회
    const fetchProducts = async (categoryId) => {
        try {
            const response = await axios.get(`/api/product/test/sell/${categoryId}`);
            let sortedProducts = response.data;
            // products.sort((a, b) => b.sales - a.sales);
            sortedProducts.sort((a, b) => b.discountRate - a.discountRate);
            setProducts(sortedProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        // 카테고리 전체 조회 함수 호출
        getCategory();
        fetchAllProducts();
    }, []);

    useEffect(() => {

        if (categoryId === `${all}`) {
            // 전체 카테고리 선택 시 모든 상품 조회
            fetchAllProducts();
        } else {
            // 특정 카테고리 선택 시 해당 카테고리 상품 조회
            fetchProducts(categoryId);
        }
    }, [categoryId]);



    const limitedProducts = products.slice(0, 20); // 처음부터 40개의 상품 데이터만 추출

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
                        {/*<ul className="side-tab-menu">*/}
                        {/*    <li className="realtime">*/}
                        {/*        <Link to={`/product/rank/${categoryId}`} className="tit_rank">실시간랭킹</Link>*/}
                        {/*    </li>*/}
                        {/*    /!**/}
                        {/*    <li className="ingredient">*/}
                        {/*        <Link to={`/product/rank/${categoryId}/ingredient`} className="tit_rank">성분별랭킹</Link>*/}
                        {/*    </li>*/}
                        {/*    *!/*/}
                        {/*</ul>*/}
                    </div>

                    <div className="frame-sm">
                        <div className="rank-category-tb-wrap">
                            <div className="rank-category-table">
                                <div className={`category-list ${categoryId == 0 ? 'active' : ''}`}>
                                    <ul>
                                        <li>
                                            <Link to={`/product/rank/${all}`}>
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
                            {/*<ul>*/}
                            {/*    <li className={`sorting-tab-menu-list ${location.pathname === `/product/rank/${categoryId}/sales` ? '' : 'active'}`}>*/}
                            {/*        <Link to={`/product/rank/${categoryId}`} className={`tit_type`} data-type="REALTIME">실시간</Link>*/}
                            {/*    </li>*/}
                            {/*    <li className={`sorting-tab-menu-list ${location.pathname === `/product/rank/${categoryId}/sales` ? 'active' : ''}`}>*/}
                            {/*        <Link to={`/product/rank/${categoryId}/sales`} className={`tit_type`} data-type="SALE">판매량</Link>*/}
                            {/*    </li>*/}
                            {/*</ul>*/}
                        </div>


                        {/* 랭킹 리스트 */}
                        <div className="rank-list-wrap" id="div-rankList">
                            <ol className="ranking-list">
                                {limitedProducts.map((product, index) => (
                                    <RankProductCard key={product.id} product={product} index={index + 1}/>
                                ))}
                             </ol>
                        </div>
                    </div>
                </div>
            </section>
            <Footer /> {/* Footer 컴포넌트 추가 */}
        </div>
    );
}

function calculateFinalPrice(price, discountRate) {
    if (discountRate) {
        const discountedPrice = price - (price * (discountRate / 100));
        return discountedPrice;
    } else {
        return price;
    }
}

function RankProductCard({product, index}) {
    return (
    <li className="list-renewal-2 rank-item" data-list={index}>
        <span className="number-rd-empty">{index}</span>
        <div className="prd-info-area">
            <div className="inner">
                <div className="column img w110">
                    <Link to={`/product/${product.id}`}>
                        <img src={product.mainImageUrl} alt={product.name} className="product-image" />
                    </Link>
                </div>
                <div className="column tit">
                    <p className="tit">
                        <Link to={`/product/${product.id}`} className="text-elps2">{product.name}</Link>
                    </p>
                    <p className="tit-sub text-elps">{product.content}</p>
                    <p className="text-guide-sm"></p>
                    {/*
                        <div class="flex-box">
                          <em class="imgbadge-div-exp">
                            <span class="blind">특급배송</span>
                          </em>
                        </div>
                    */}
                </div>
                {product.discountRate ? (
                    <>
                        <div className="column price">
                            <span className="product-discount"> {product.discountRate.toLocaleString()}%</span>
                            <span className="product-price">{product.price.toLocaleString()}원</span>

                            <p className="origin">
                                <span className="product-result">{calculateFinalPrice(product.price, product.discountRate).toLocaleString()}원</span>
                            </p>
                        </div>
                        </>
                ) : (
                    <div className="column price">
                        <div className="origin">
                            <span className="product-result">{product.price.toLocaleString()}원</span>
                        </div>
                    </div>
                    )}
            </div>
                {/*<div className="column point2">3% 적립</div>*/}
                {/*<div className="column dlv2">
                        <div className="rating-simply">
                            <span className="score">4.9</span> {/* 평점 */}
                {/*            <span className="total-num">(82,644)</span> {/* 평점을 작성한 유저 수 */}
                {/*        </div>
                    </div>*/}
                {/*<div className="column price text-left">*/}
                {/*    <p className="origin">*/}
                {/*        <span>{product.price}</span> /!* 원가 *!/*/}
                {/*        원*/}
                {/*    </p>*/}

                {/*    /!* 할인가 *!/*/}
                {/*</div>*/}
                {/*<div className="column btn2">*/}
                {/*    <ul className="btn-list">*/}
                {/*        <li className="btn-icon-cart-li">*/}
                {/*            <button type="button" className="btn-icon-cart2 btn-ext-cart">*/}
                {/*                <span className="blind">장바구니</span>*/}
                {/*            </button>*/}
                {/*        </li>*/}
                {/*        <li>*/}
                {/*            <button className="custom-checkbox">*/}
                {/*                <input type="checkbox" id="check-0" name="check-wish-item"*/}
                {/*                       className="checkbox-wish btn-ext-wish"/>*/}
                {/*                <label htmlFor="check-0">*/}
                {/*                    <span className="blind">찜하기</span>*/}
                {/*                </label>*/}
                {/*            </button>*/}
                {/*        </li>*/}
                {/*    </ul>*/}
                {/*</div>*/}
            {/*</div>*/}
        </div>
    </li>
    );
}

export default Rank;