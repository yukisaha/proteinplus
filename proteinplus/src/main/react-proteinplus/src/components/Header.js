import React, {useEffect, useState} from 'react';
import '../styles/common/css/Header.css';
// import categories from '../pages/category/categoriesData.js';

import axios from 'axios';
import { Link } from 'react-router-dom'

export default function Header() {

    // activeIndex 상태 설정
    const [activeIndex, setActiveIndex] = useState(null);
    const [isHovered, setIsHovered] = useState(false);

    // 마우스 오버 핸들러
    const handleMouseOver = (index) => {
        // activeIndex 상태 업데이트
        setActiveIndex(index);
    };


    // category-layer에 적용될 클래스
    const activeClass = isHovered ? 'active' : '';


    const baseUrl = "http://localhost:8080";

    const [ categoryData, setCategoryData ] = useState([]);

    useEffect(() => { // 컴포넌트가 마운트 될 때 실행
        getCategory();
    },[])

    async function getCategory() { // Axios 방식 사용
        const response = await axios.get(`${baseUrl}/admin/category/test`);

        setCategoryData(response.data);
    }

    // 부모 카테고리의 첫 번째 자식 카테고리 ID를 반환하는 함수
    function getFirstChildCategoryId(parentCategoryId) {
        const firstChildCategory = categoryData.find(category => category.parent && category.parent.id === parentCategoryId);
        return firstChildCategory ? firstChildCategory.id : parentCategoryId; // 자식이 없는 경우 부모 카테고리 ID 반환
    }

    return (
        <header id="header" className="header">
            <div className="header-inner">
                <h1 className="logo "><a href="/"><span className="blind">ProteinPlus</span></a></h1>

                <div className="util">
                    <ul>
                        <li><a href="/auth/login">로그인</a></li>
                        <li><a href="/member/join/general">회원가입</a></li>
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
                        <li><a href="" className="btn-util-pedometer" title=""><span className="blind">만보기</span></a></li>
                        <li><a href="" className="btn-util-coupon" title=""><span className="blind">쿠폰</span></a></li>
                        <li><a href="" className="btn-util-mypage" title=""><span className="blind">마이페이지</span></a></li>
                        <li>
                            <a href="" className="btn-util-cart" title="">
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
                        <a href="" className="btn-menu-all"><span>카테고리</span></a>
                        <div className="category-layer">
                            <div className="first-category-list">
                                <ul className="category-menu-list">
                                    {categoryData
                                        .filter((parentCategory) => parentCategory.parent === null)
                                        .map((parentCategory, idx) => (
                                        <li key={idx} className={`first-category-item ${idx === activeIndex ? 'active' : ''}`}
                                            onMouseOver={() => handleMouseOver(idx)}>
                                            <a href={`/product/list/${getFirstChildCategoryId(parentCategory.id)}`}>{parentCategory.name}</a>
                                            <ul className="second-category-list">
                                                {categoryData
                                                    .filter((childCategory) => childCategory.parent && childCategory.parent.id === parentCategory.id)
                                                    .map((childCategory, idx) => (
                                                    <li key={idx} className="second-category-item">
                                                        <a href={`/product/list/${childCategory.id}`}>{childCategory.name}</a>
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
                                <a href="">
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
                            <li className="">
                                <a href="">
                                    <span>..</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}
