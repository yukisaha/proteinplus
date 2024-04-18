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
import CartModal from '../../components/Modal/CartModal';

function ProductDetails() {

    const Spring_Server_Ip = process.env.REACT_APP_Spring_Server_Ip;

    const [product, setProduct] = useState(null);
    const {productId} = useParams();
    const [like, setLike] = useState(false);
    const [reviewOpen, setReviewOpen] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [imageModalIsOpen, setImageModalIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [reviews, setReviews] = useState([]);

    const getProductById = async (productId) => {
        try {
            const url = `${Spring_Server_Ip}/product/${productId}`;
            const response = await axios.get(url);
            setProduct(response.data);
        } catch (error){
            console.error('Error getting product: ', error);
        }
    }

    const getReviewsByProductId = async (productId) => {
        try {
            const url = `${Spring_Server_Ip}/review/product/${productId}`;
            const response = await axios.get(url);
            console.log(response.data);
            setReviews(response.data);
        } catch (error) {
            console.error('Error getting reviews: ', error);
        }
    }

    useEffect(() => {
        getProductById(productId);
        getReviewsByProductId(productId);
    }, [productId]);

    const checkProductInWishList = async (productId) => {
        try {
            const url = `${Spring_Server_Ip}/wishList/${productId}`;
            const response = await axios.get(url);
            setLike(response.data); // 위시리스트에 해당 상품이 있으면 true, 없으면 false
        } catch (error) {
            console.error('Error checking product in WishList: ', error);
        }
    }

    const postAddWishListByProductId = async (productId) => {
        try {
            const url = `${Spring_Server_Ip}/wishList/${productId}`;
            await axios.post(url);
            alert("찜한 상품에 담겼습니다.");
        } catch (error){
            console.error('Error Add WishList: ', error);
        }
    }

    const deleteWishListByProductId = async (productId) => {
        try {
            const url = `${Spring_Server_Ip}/wishList/${productId}`;
            await axios.delete(url);
        } catch (error){
            console.error('Error Add WishList: ', error);
        }
    }

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

    useEffect(() => {
        getProductById(productId);
        checkProductInWishList(productId); // 페이지 로드 시 위시리스트에 상품이 있는지 확인
    }, [productId]);

    const clickLike = () => {
        if (!like) {
            postAddWishListByProductId(productId);
            setLike(true);
        } else {
            // 이미 위시리스트에 있는 경우에는 위시리스트에서 삭제
            deleteWishListByProductId(productId)
            setLike(false);
        }
    };

    const openImageModal = (imageSrc) => {
        setSelectedImage(imageSrc);
        setImageModalIsOpen(true); // 상세 이미지 모달 열
    };

    const closeImageModal = () => {
        setSelectedImage('');
        setImageModalIsOpen(false);
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
            <img src={product.mainImageUrl} alt={product.name} className="main-image"
                onClick={() =>
                    openImageModal(product.detailImageUrl)} />
            <div className="main-detail-container">
            <button onClick={openReview} className="review-btn">리뷰</button>
            <div className="main-detail">
                <p className="main-product-name">{product.name}</p>
                <p>{product.content}</p>
                <p className="main-result">{resultPrice.toLocaleString()}<span className="won">원</span></p>
                {product.discountRate && <span className="main-discount">
                    {product.discountRate}
                    <span className="main-discount-text">% 할인</span>
                </span>}
                {product.discountRate !== null && product.price && <span className="main-price">(정상가격 : {product.price.toLocaleString()}원)</span>}
                <p className="main-sales">{product.sales ? product.sales.toLocaleString() : 0}
                    <span className="main-sales-text">개의 상품이 구매됨</span>
                </p>
                <div className="product-btn-container">
                    <button className={`like-btn ${like ? 'liked' : ''}`} onClick={clickLike}>
                        <FontAwesomeIcon icon={like ? solidHeart : regularHeart} />
                    </button>
                    <button className="cart-btn" onClick={() => handleAddToCart(product.id)}>장바구니 담기</button>
                    <button className="product-order-btn">바로구매</button>
                </div>
                </div>
            </div>
            </div>
        </div>
        {reviewOpen && <Review closeReview={closeReview} reviews={reviews}/>}
        <Footer/>
        <CartModal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} />
        {imageModalIsOpen && (
            <div className="detail-image-modal">
                <span className="detail-close" onClick={closeImageModal}>&times;</span>
                <div className="detail-image-container">
                    {selectedImage && <img src={selectedImage} alt="상세 이미지" className="detail-image" />}
                </div>
            </div>
        )}
        </>
    );
}

export default ProductDetails