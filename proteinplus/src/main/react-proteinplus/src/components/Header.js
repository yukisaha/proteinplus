import React, {useEffect, useState} from 'react';
import '../styles/common/css/Header.css';

import axios from 'axios';
import { Link } from 'react-router-dom'

export default function Header({categoryId}) {

    const [activeCategoryId, setActiveCategoryId] = useState(null);
    const [categoryData, setCategoryData] = useState(null);
    const [loading, setLoading] = useState(true); // 초기에는 로딩 중 상태로 설정
    const [isCategoryIdChanged, setIsCategoryIdChanged] = useState(false); // categoryId 변경 여부 상태

    const handleMouseOver = (itemId) => {
        setActiveCategoryId(itemId);
    };

    async function getCategory() { // Axios 방식 사용
        const Spring_Server_Ip = process.env.REACT_APP_Spring_Server_Ip;
        try {
            const response = await axios.get(`${Spring_Server_Ip}/category/find/category`);
            setCategoryData(response.data);
            setLoading(false); // 데이터를 성공적으로 받아온 후 로딩 상태 해제
        } catch (error) {
            setLoading(false); // 데이터를 받아오는데 실패해도 로딩 상태 해제
        }
    }

    useEffect(() => { // 컴포넌트가 마운트 될 때 실행
        getCategory();
    },[])

    useEffect(() => {
        // categoryId가 변경될 때 isCategoryIdChanged 상태를 true로 설정
        setIsCategoryIdChanged(true);

        // 0.5초 후에 isCategoryIdChanged 상태를 false로 다시 설정 (마우스 오버 비활성화)
        const timer = setTimeout(() => {
            setIsCategoryIdChanged(false);
        }, 500);

        // Cleanup 함수
        return () => clearTimeout(timer);
    }, [categoryId]);

    // 부모 카테고리의 첫 번째 자식 카테고리 ID를 반환하는 함수
    function getFirstChildCategoryId(parentCategoryId) {
        const firstChildCategory = categoryData.find(category => category.parent && category.parent.id === parentCategoryId);
        return firstChildCategory ? firstChildCategory.id : parentCategoryId; // 자식이 없는 경우 부모 카테고리 ID 반환
    }

    if (loading) {
        // 로딩 중인 경우
        return <div className="loading-indicator">로딩중...</div>;
    }

    // categoryData가 없는 경우
    if (!categoryData) {
        return <div className="loading-indicator">데이터를 가져오는 중입니다...</div>;
    }

    const logout = () => {
        // 로컬 스토리지에서 토큰 제거
        window.localStorage.removeItem("token");
        // 새로고침하여 로그아웃 적용
        window.location.href = '/'; // 홈으로 이동

    };

    const token = window.localStorage.getItem("token");

    return (
        <header id="header" className="header">
            <div className="header-inner">
                <h1 className="logo "><a href="/"><span>ProteinPlus</span></a></h1>

                <div className="util">
                    <ul>
                        {token ? (
                            <li><button onClick={logout}>로그아웃</button></li>
                        ) : (
                            <>
                                <li><a href="/auth/login">로그인</a></li>
                                <li><a href="/member/join">회원가입</a></li>
                            </>
                        )}
                        <li><a href="/mypage/orderlist">주문조회</a></li>
                        <li><a href="/service/center">고객센터</a></li>
                    </ul>
                </div>

                <div className="header-search">
                    <div className="top-search">
                        <input type="search" className="input-search" value="" maxLength="100" />

                        <button type="button" className="btn-top-search" id="btnTopSearch" name="btnTopSearch" data-search-type="real" >
                            <span className="blind">검색</span>
                        </button>
                    </div>
                </div>

                <div className="my-menu">
                    <ul>
                        <li><a href="" className="btn-util-coupon" title=""><span className="blind">쿠폰</span></a></li>
                        <li><a href="/mypage/orderList" className="btn-util-mypage" title=""><span className="blind">마이페이지</span></a></li>
                        <li>
                            <a href="/order/cart" className="btn-util-cart" title="">
                                <span className="blind">장바구니</span>
                                <em className="count">0</em>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="gnb-wrap">
                <div className="inner">
                    <div className="category-wrap">
                        <Link to="" className={`btn-menu-all ${isCategoryIdChanged ? 'inactive' : ''}`}><span>카테고리</span></Link>
                        <div className="category-layer">
                            <div className="first-category-list">
                                <ul className="category-menu-list">
                                    {categoryData
                                        .filter((parentCategory) => parentCategory.parent === null)
                                        .map((parentCategory) => (
                                            <li
                                                key={parentCategory.id}
                                                className={`first-category-item ${activeCategoryId === parentCategory.id ? 'active' : ''}`}
                                                onMouseEnter={() => handleMouseOver(parentCategory.id)}
                                            >
                                                <Link to={`/product/list/${parentCategory.id}`}>{parentCategory.name}</Link>
                                                <ul className="second-category-list">
                                                    <li className="second-category-item">
                                                        <Link to={`/product/list/${parentCategory.id}`}>전체</Link>
                                                    </li>
                                                    {categoryData
                                                        .filter((childCategory) => childCategory.parent && childCategory.parent.id === parentCategory.id)
                                                        .map((childCategory) => (
                                                            <li key={childCategory.id} className="second-category-item">
                                                                <Link to={`/product/list/${childCategory.id}`}>{childCategory.name}</Link>
                                                            </li>
                                                        ))}
                                                </ul>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <nav id="gnb" className="gnb">
                        <ul>
                            <li className="">
                                <a href="/product/rank/0">
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
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}
