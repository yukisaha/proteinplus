import React from 'react';
import Header from '../../components/Header'; // frame.js에서 Header 함수 import
import Footer from '../../components/Footer'; // frame.js에서 Footer 함수 import
import '../../styles/cart/css/Cart.css'; // cart.css 파일 가져오기

function Cart() {
    return (
        <div className="wrap main">
            <Header /> {/* Header 컴포넌트 추가 */}
            <section id="contents" className="container">
                <div className="content-wrap frame-sm cart-jsp">
                    <div className="page-title-area">
                        <h2 className="title-page">장바구니</h2>
                    </div>
                    <div className="cart-list-area">
                        <div className="no-data">
                            <p className="message">장바구니에 담긴 상품이 없습니다.</p>
                            <a href="/" className="btn-basic-lg btn-default-ex">
                                <span>쇼핑계속하기</span>
                            </a>
                        </div>
                    </div>
                    <div className="btn-bottom-area"></div>
                </div>
            </section>
            <Footer /> {/* Footer 컴포넌트 추가 */}
        </div>
    );
}

export default Cart;
