import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../styles/home/css/Home.scoped.css';
import ImageSlide from './ImageSlide';
import {ProductCard} from '../product/ProductList';
import home1 from '../../styles/home/images/home1.png';
import home2 from '../../styles/home/images/home2.gif';
import home3 from '../../styles/home/images/home3.jpg';
import home4 from '../../styles/home/images/home4.jpg';
import home5 from '../../styles/home/images/home5.jpg';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

function Home() {
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const Spring_Server_Ip = process.env.REACT_APP_Spring_Server_Ip;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [newProducts, setNewProducts] = useState([]);
    const [bundleProducts, setBundleProducts] = useState([]);

    const handleNextButtonClick = () => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % recommendedProducts.length);
    };

    const handlePrevButtonClick = () => {
        setCurrentIndex(prevIndex => (prevIndex === 0 ? recommendedProducts.length - 1 : prevIndex - 1));
    };

    const handleRefreshBundleProducts = async () => {
        try {
            const url = `${Spring_Server_Ip}/product/test/sell`;
            const response = await axios.get(url);
            const allProducts = response.data;
            const filteredBundleProducts = allProducts.filter(product => product.name.includes('10팩'));
            const randomBundleProducts = filteredBundleProducts.sort(() => Math.random() - 0.5).slice(0, 2);
            setBundleProducts(randomBundleProducts);
        } catch (error) {
            console.error('상품 데이터를 가져오는 중 오류발생:', error);
        }
    };

    const images = [home1, home2, home3, home4, home5];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const url = `${Spring_Server_Ip}/product/test/sell`;
                const response = await axios.get(url);
                const allProducts = response.data;
                const filteredProducts = allProducts.filter(product => product.content && product.content.includes('추천상품'));
                setRecommendedProducts(filteredProducts);

                const filteredNewProducts = allProducts.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)).slice(0, 4);
                setNewProducts(filteredNewProducts);

                const filteredBundleProducts = allProducts.filter(product => product.name.includes('10팩'));
                const randomBundleProducts = filteredBundleProducts.sort(() => Math.random() - 0.5).slice(0, 2);
                setBundleProducts(randomBundleProducts);
            } catch (error) {
                console.error('상품 데이터를 가져오는 중 오류발생:', error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="wrap main">
            <Header /> {/* Header 컴포넌트 추가 */}
            <section id="contents" className="container">
                <ImageSlide images={images} />

                <h2 className="recommended-product"> 프로틴플러스의 추천상품 </h2>
                <div className="recommended-product-container">
                    <button className="prev-btn" onClick={handlePrevButtonClick}>&#10094;</button>
                    <div className="recommended-product-list">
                        {[0, 1, 2, 3].map((offset) => {
                            const index = (currentIndex + offset) % recommendedProducts.length;
                            const product = recommendedProducts[index];
                            if (product) {
                                return <ProductCard key={product.id} product={product} />;
                            } else {
                                return null;
                            }
                        })}
                    </div>
                    <button className="next-btn" onClick={handleNextButtonClick}>&#10095;</button>
                </div>

                <h2 className="new-product">따끈따끈한 신상품🆕</h2>
                <div className="new-product-list">
                    {newProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                <h2 className="bundle-product"> 추천패키지</h2>
                <h5 className="bundle-product-text">
                    프로틴플러스와 함께 건강한 몸을 만들어봐요!
                </h5>
                <div className="background-container">
                    <div className="background-image">
                        <div className="bundle-product-list">
                            {bundleProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                            <button className="refresh-bundle-btn" onClick={handleRefreshBundleProducts}>
                                <FontAwesomeIcon icon={faSync} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <Footer /> {/* Footer 컴포넌트 추가 */}
        </div>
    );
}

export default Home;
