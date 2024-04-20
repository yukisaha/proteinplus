import React, { useState, useEffect } from 'react';
import MypageFrame from '../../components/MypageFrame';
import CartModal from '../../components/Modal/CartModal';
import '../../styles/cart/css/WishList.css';
import axios from "axios";

export default function WishList() {
    const Spring_Server_Ip = process.env.REACT_APP_Spring_Server_Ip;
    const [WishList, setWishListData] = useState([]);
    const [Review, setReviewData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const token = window.localStorage.getItem("token");

    useEffect(() => {
        checkToken();
        // WishList 가져오기
        getWishList();
    }, []);

    async function checkToken() {
        if (!token) {
            // 토큰이 없는 경우 로그인 페이지로 리디렉션
            window.location.href = '/auth/login'; // 로그인 페이지로 이동
        }
    }

    async function getWishList() {
        try {
            const response = await axios.get(`${Spring_Server_Ip}/wishList`, {
                headers: {
                    Authorization: `${token}`
                }
            });
            const reviews = await axios.get(`${Spring_Server_Ip}/review`,{
                headers: {
                    Authorization: `${token}`
                }
            });
            // productId를 기준으로 리뷰 정보를 매핑
            const reviewMap = {};
            reviews.data.forEach(review => {
                const productId = review.productId;
                if (!reviewMap[productId]) {
                    reviewMap[productId] = review;
                }
            });

            // WishList와 리뷰 정보 합치기
            const wishListWithReview = response.data.map(product => {
                const productId = product.id;
                const productReview = reviewMap[productId];
                return { ...product, review: productReview };
            });

            setWishListData(wishListWithReview);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // 인증 실패 시 로그인 페이지로 리디렉션
                console.error("토큰 검증 안됨 :", error);
            } else {
                console.error("서버 요청 중 에러가 발생했습니다:", error);
            }
        }
    }



    const handleDeleteSelected = async (productId) => {
        // WishList에서 선택된 상품 삭제
        await axios.delete(`${Spring_Server_Ip}/wishList/${productId}`,{
                headers: {
                    Authorization: `${token}`
                }
            });
        // WishList를 다시 가져와서 렌더링
        await getWishList();
    };

    // 전체삭제
    const handleDeleteAll = async () => {
        // WishList를 서버에서 비우는 로직
        await axios.delete(`${Spring_Server_Ip}/wishList`,{
                headers: {
                    Authorization: `${token}`
                }
            });
        // WishList를 다시 가져와서 렌더링
        await getWishList();
    };

    const handleAddToCart = (productId) => {
        // 여기서 선택된 상품의 ID와 count를 1로 설정하여 로컬 스토리지에 추가합니다.
        const storedCartItems = localStorage.getItem('cartItems');
        let cartItems = {};
        if (storedCartItems) {
            cartItems = JSON.parse(storedCartItems);
        }
        // 상품 추가
        cartItems[productId] = { product_id: productId, count: 1, isChecked: true };
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        setModalIsOpen(true);
    };

    // 할인율을 적용한 가격 계산 함수
    const calculateDiscountedPrice = (price, discountRate) => {
        if (discountRate !== null) {
            const discountedPrice = price * (1 - discountRate / 100);
            return Math.round(discountedPrice);
        } else {
            return price;
        }
    };

    const renderWishlistItems = () => {
        if (WishList.length === 0) {
            return (
                <div>
                    <div className="menu-title-area">
                        <h3 className="title-menu">찜한 상품</h3>
                        <div className="right" style={{ display: 'block' }}>
                        </div>
                    </div>
                    <div className="grid-list-wrap ui-compare-select">
                        <ul id="wishList" className="prd-item-list grid-area-span4 gap33">
                            <div className="no-data">
                                <p className="message">
                                    찜 상품이 없습니다.
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
                    <h3 className="title-menu">찜한 상품</h3>
                    <div className="right" style={{ display: 'block' }}>
                        <button type="button" className="btn-link-txt5" id="btnDeltAll" onClick={handleDeleteAll}>
                            <i className="ico-btn-delete"></i><span>전체삭제</span>
                        </button>
                    </div>
                </div>
                <div className="grid-list-wrap ui-compare-select">
                    <ul id="wishList" className="prd-item-list grid-area-span4 gap33">

                        {WishList.map((product) => (
                            <li key={product.id} className="list-renewal ext-li colum" data-list="1">
                                <div className="prd-item type-sm2">
                                    <figure className="img w180">
                                        <a href={`/product/view?productCd=${product.id}`}>
                                            <img
                                                className="lozad"
                                                data-src={product.imageUrl}
                                                alt={product.name}
                                                src={product.mainImageUrl}
                                                data-loaded="true"
                                            />
                                        </a>
                                        <button type="button" className="btn-icon-cart2 btn-ext-cart" title="" onClick={() => handleAddToCart(product.id)}>
                                            <span className="blind">장바구니</span>
                                        </button>
                                    </figure>
                                    <div className="desc-bottom">
                                        <p className="tit">
                                            <a href={`/product/view?productCd=${product.id}`} className="text-elps2">
                                                {product.name}
                                            </a>
                                        </p>
                                        <div className="price-flex">
                      <span className={`sale ${product.discountRate === null ? 'hide' : ''}`}>
                        <strong>{product.discountRate}</strong>%
                      </span>
                                            <span className="price">
                        <em className="num">{calculateDiscountedPrice(product.price, product.discountRate)}</em>원
                      </span>
                                            <p className={`${product.discountRate === null ? 'hide' : ''} origin`}>
                                                <span>{product.price}</span>원
                                            </p>
                                        </div>

                                        {product.review ? (
                                            <div className="rating-simply">
                                                <span className="score">★{product.review.rating ? product.review.rating.toFixed(1) : '0.0'}</span>
                                                <span className="total-num">({product.review.totalReviewCount})</span>
                                            </div>
                                        ) : (
                                            <div className="rating-simply">
                                                <span className="score">★0</span>
                                                <span className="total-num">(0)</span>
                                            </div>
                                        )}

                                    </div>
                                    <div className="desc-form">
                                        <ul className="btns-list">
                                            <li>
                                                <div className="custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        id={`check-${product.id}`}
                                                        className="checkbox-wish btn-ext-wish"
                                                        name="check-wish-item"
                                                        onChange={() => handleDeleteSelected(product.id)}
                                                    />
                                                    <label htmlFor={`check-${product.id}`} title="">
                                                        <span className="blind">찜하기</span>
                                                    </label>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        ))}

                        {renderPagination()}
                    </ul>
                </div>
            </div>
        );
    };

    const renderPagination = () => {
        return (
            <div className="pagination mt20" style={{ marginTop: '60px' }}>
                <a href="javascript:CmPageMove('0')" data-page="0" className="btn-page prev">
                    <span className="page-move-blind">이전</span>
                </a>
                <a href="#" className="current">
                    <span>1</span>
                </a>
                <a href="javascript:CmPageMove('2')" data-page="2" className="btn-page next">
                    <span className="page-move-blind">다음</span>
                </a>
            </div>
        );
    };

    return (
        <div>
            <MypageFrame>{renderWishlistItems()}</MypageFrame>
            <CartModal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} />
        </div>
    );
}
