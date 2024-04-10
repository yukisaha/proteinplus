import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import products from './products';
import '../../styles/product/css/ProductDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import Review from './Review';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function ProductDetails() {

    const {id} = useParams();
    const product = products.find(product => product.id === parseInt(id));
    const resultPrice = product.result.replace(/[^\d,]/g, ''); //숫자,쉼표 아니면 없애버렷
    const [like, setLike] = useState(false);
    const clickLike = () =>{
        setLike(!like);
    };
    const [reviewOpen, setReviewOpen] = useState(false);
    const openReview = () =>{
        setReviewOpen(true);
    }
    const closeReview = () =>{
        setReviewOpen(false);
    }

    return (
        <>
        <Header/>
        <div className="product-detail">
            <div className="main-container">
            <img src={product.img} alt={product.name} className="main-image"/>
            <div className="main-detail-container">
            <button onClick={openReview} className="review-btn">리뷰</button>
            <div className="main-detail">
                <p className="main-product-name">{product.name}</p>
                <p>{product.description}</p>
                <p className="main-result">{resultPrice}<span className="won">원</span></p>
                {product.discount && <span className="main-discount">{product.discount}</span>}
                {product.price && <span className="main-price">(정상가격 : {product.price})</span>}
                <p className="main-sales">{product.sales.toLocaleString()}
                    <span className="main-sales-text">개의 상품이 구매됨</span>
                </p>
                <div className="product-btn-container">
                    <button className={`like-btn ${like ? 'liked' : ''}`} onClick={clickLike}>
                        <FontAwesomeIcon icon={like ? solidHeart : regularHeart} />
                    </button>
                    <button className="cart-btn">장바구니</button>
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