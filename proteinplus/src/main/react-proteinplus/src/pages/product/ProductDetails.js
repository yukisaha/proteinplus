import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import '../../styles/product/css/ProductDetails.scoped.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import Review from './Review';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import axios from 'axios';

function ProductDetails() {

    const Spring_Server_Ip = process.env.REACT_APP_Spring_Server_Ip;

    const [product, setProduct] = useState(null);
    const {productId} = useParams();
    const [like, setLike] = useState(false);
    const [reviewOpen, setReviewOpen] = useState(false);

    const getProductById = async (productId) => {
        try {
            const url = `${Spring_Server_Ip}/product/${productId}`;
            const response = await axios.get(url);
            setProduct(response.data);
        } catch (error){
            console.error('Error getting product: ', error);
        }
    }

    useEffect(() => {
        getProductById(productId);
    }, [productId]);

    const clickLike = () =>{
        setLike(!like);
    };

    const openReview = () =>{
        setReviewOpen(true);
    }
    const closeReview = () =>{
        setReviewOpen(false);
    }

    if (!product){
        return <div>로딩중...</div>
    }

    const resultPrice = product.discountRate ? product.price - (product.price * (product.discountRate / 100)) : product.price;

    return (
        <>
        <Header/>
        <div className="product-detail">
            <div className="main-container">
            <img src={product.mainImageUrl} alt={product.name} className="main-image"/>
            <div className="main-detail-container">
            <button onClick={openReview} className="review-btn">리뷰</button>
            <div className="main-detail">
                <p className="main-product-name">{product.name}</p>
                <p>{product.content}</p>
                <p className="main-result">{resultPrice}<span className="won">원</span></p>
                {product.discountRate && <span className="main-discount">
                    {product.discountRate}
                    <span className="main-discount-text">% 할인</span>
                </span>}
                {product.discountRate !== null && product.price && <span className="main-price">(정상가격 : {product.price}원)</span>}
                <p className="main-sales">{product.sales ? product.sales.toLocaleString() : 0}
                    <span className="main-sales-text">개의 상품이 구매됨</span>
                </p>
                <div className="product-btn-container">
                    <button className={`like-btn ${like ? 'liked' : ''}`} onClick={clickLike}>
                        <FontAwesomeIcon icon={like ? solidHeart : regularHeart} />
                    </button>
                    <button className="cart-btn">장바구니 담기</button>
                    <button className="product-order-btn">바로구매</button>
                </div>
                </div>
            </div>
            </div>
        </div>
        {reviewOpen && <Review closeReview={closeReview} />}
        <Footer/>
        </>
    )

}

export default ProductDetails