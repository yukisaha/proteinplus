import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../styles/cart/css/Cart.scoped.css';
import axios from "axios";

function Cart() {
    const [isChecked, setIsChecked] = useState(true); // isChecked 상태와 해당 상태를 변경할 함수 setIsChecked를 생성하고 기본값으로 true를 설정
    // 로컬스토리지
    const [cartItems, setCartItems] = useState({});
    const [CartData, setCartData] = useState([]);



//      로컬스토리지 product_id 가져오는 코드 (오류 있음 마지막 값만 가져옴)
    useEffect(() => {
        loadCartItemsFromLocalStorage(); // 페이지 로드 시 로컬 스토리지에서 데이터 로드
    }, []);

    const loadCartItemsFromLocalStorage = async () => {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            const parsedCartItems = JSON.parse(storedCartItems);
            // 각 항목에 isChecked 속성 추가 및 true로 설정
            for (const productId in parsedCartItems) {
                parsedCartItems[productId].isChecked = true;
            }
            setCartItems(parsedCartItems);
            setIsChecked(true); // 모든 상품이 선택되도록 isChecked 상태를 true로 설정

            // product_id 배열 생성
            const productIds = Object.keys(parsedCartItems).map(productId => parsedCartItems[productId].product_id);

            // 장바구니 데이터 가져오기
            await getCartList(productIds);
        }
    };
    async function getCartList(productIds) { // Axios
        const Spring_Server_Ip = process.env.REACT_APP_Spring_Server_Ip;
        console.log("productIds:", productIds); // productIds를 콘솔에 출력하여 확인
        const response = await axios.post(`${Spring_Server_Ip}/cart`,  productIds );
        setCartData(response.data);
    }




    // 모든 상품의 체크 상태가 변경될 때 호출되는 함수
    const handleCheckAllChange = () => {
        setIsChecked(!isChecked); // isChecked 상태를 반전시킵니다.

        // isChecked 값에 따라 모든 상품의 체크 상태를 변경합니다.
        const updatedCartItems = {};
        for (const productId in cartItems) {
            updatedCartItems[productId] = { ...cartItems[productId], isChecked: !isChecked };
        }
        setCartItems(updatedCartItems);
    };

    // 각 상품의 체크 상태가 변경될 때 호출되는 함수
    const handleProductCheckChange = (productId) => {
        const updatedCartItems = { ...cartItems };
        updatedCartItems[productId] = { ...cartItems[productId], isChecked: !cartItems[productId].isChecked };
        setCartItems(updatedCartItems);
        setIsChecked(Object.values(updatedCartItems).every(item => item.isChecked));
    };

    // 모든 상품의 체크 상태를 확인하는 함수
    const areAllProductsChecked = () => {
        return Object.values(cartItems).every(item => item.isChecked);
    };

    // 선택삭제
    const handleDeleteSelectedItems = () => {
        const updatedCartItems = { ...cartItems };
        for (const productId in updatedCartItems) {
            if (updatedCartItems[productId].isChecked) {
                delete updatedCartItems[productId];
            }
        }
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    // 상품 조회
    const getItemFromCart = (productId) => {
        return cartItems[productId] || null;
    };

    // 상품 업데이트
    const updateItemInCart = (productId, updatedCount) => {
        setCartItems(prevItems => {
            if (prevItems[productId]) {
                const updatedCartItems = { ...prevItems };
                updatedCartItems[productId].count = updatedCount;
                localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
                return updatedCartItems;
            }
            return prevItems;
        });
    };

    // 상품 삭제
    const deleteItemFromCart = (productId) => {
        setCartItems(prevItems => {
            if (prevItems[productId]) {
                const updatedCartItems = { ...prevItems };
                delete updatedCartItems[productId];
                localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
                return updatedCartItems;
            }
            return prevItems;
        });
    };

    // 수량 1씩 증가
    const handleIncreaseQuantity = (productId) => {
        const currentItem = getItemFromCart(productId);
        if (currentItem) {
            const updatedCount = currentItem.count + 1;
            updateItemInCart(productId, updatedCount);
        }
    };

    // 수량 1씩 감소
    const handleDecreaseQuantity = (productId) => {
        const currentItem = getItemFromCart(productId);
        if (currentItem && currentItem.count > 1) {
            const updatedCount = currentItem.count - 1;
            updateItemInCart(productId, updatedCount);
        }
    };


    // 주문하기 버튼 클릭 시 호출될 함수
    const handleOrder = async () => {
        // 여기에 로컬 스토리지의 값을 읽어와서 필요한 데이터를 백엔드로 전송하는 코드를 추가
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            const parsedCartItems = JSON.parse(storedCartItems);

            // 필요한 데이터를 추출하여 API에 전달
            const requestData = Object.values(parsedCartItems).map(item => ({
                productId: item.product_id,
                count: item.count
            }));

            // Axios를 사용하여 HTTP POST 요청을 보냅니다.
            const Spring_Server_Ip = process.env.REACT_APP_Spring_Server_Ip;
            await axios.post(`${Spring_Server_Ip}/order`, requestData);
        }
    };


    // 장바구니 상품 렌더링 함수
    const renderCartItems = () => {
        const cartItemKeys = Object.keys(cartItems);

        // 각 상품의 총 가격을 계산하는 함수
        const calculateTotalPriceForItem = (productId) => {
            const productData = CartData.find(product => product.id === cartItems[productId].product_id);
            return productData ? productData.price * cartItems[productId].count : 0;
        };

        // 각 상품의 총 가격을 합하여 전체 상품 가격을 계산
        const totalProductPrice = cartItemKeys.reduce((total, productId) => {
            return total + calculateTotalPriceForItem(productId);
        }, 0);


        if (cartItemKeys.length === 0) {
            return (
                <div className="content-wrap frame-sm cart-jsp">
                    <div className="page-title-area">
                        <h2 className="title-page">장바구니</h2>
                    </div>
                    <div className="cart-list-area">
                        {/* 아래는 데이터값 없을 때 */}
                        <div className="no-data">
                            <p className="message">장바구니에 담긴 상품이 없습니다.</p>
                            <a href="/" className="btn-basic-lg btn-default-ex"><span>쇼핑계속하기</span></a>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="content-wrap frame-sm cart-jsp">
                <div className="page-title-area">
                    <h2 className="title-page">장바구니</h2>
                    <div className="cart-option">
                        <div className="custom-checkbox">
                            <input type="checkbox" id="checkAll" className="checkbox checkboxGroup"
                                   checked={areAllProductsChecked()} // 모든 상품이 체크되었는지 여부에 따라 상태를 설정합니다.
                                   onChange={handleCheckAllChange} // 체크 상태가 변경될 때 handleCheckAllChange 함수를 호출합니다.
                            />
                            <label htmlFor="checkAll">전체선택</label>
                        </div>
                        <button type="button" id="deleteUserCartList" className="btn-option btn-default" onClick={handleDeleteSelectedItems}>
                            <span>선택삭제</span>
                        </button>
                    </div>
                </div>

                <div className="cart-list-area">
                    <div className="cart-list-area" id="delivery-group-1600">
                        <ul className="cart-list">

                            {/* 여기에 cartItems와 CartData를 함께 사용하여 데이터를 매핑합니다. */}
                            {Object.values(cartItems).map((item) => {
                                const productData = CartData.find(product => product.id === item.product_id);

                                return (
                                    <li key={item.product_id} id={`delivery-product-${item.product_id}`} className={`delivery-product-${item.product_id}NY`}>
                                        <div className="prd-info-area cart-info-area">
                                            <div className="inner">
                                                <div className="column check">
                                                    <div className="custom-checkbox single">
                                                        <input type="checkbox" id={`check-product-${item.product_id}N`} className="checkbox deleteUserCartList productCheckbox" name="check1600"
                                                               checked={item.isChecked}
                                                               onChange={() => handleProductCheckChange(item.product_id)}
                                                        />
                                                        <label htmlFor={`check-product-${item.product_id}N`} className="blind">선택</label>
                                                    </div>
                                                </div>
                                                <input type="hidden" className={`arrCartid-${item.product_id}`} value="20240408000024272765" />
                                                <input type="hidden" className={`vProductcd-${item.product_id}`} value={item.product_id} />
                                                <input type="hidden" className={`vProductcd-${item.product_id}-couponPrice couponPrice`} value="0" />

                                                <div className="column img">
                                                    <label htmlFor={`check-product-${item.product_id}N`}>
                                                        <img src={`https://file.rankingdak.com/image/RANK/PRODUCT/PRD001/20240109/IMG1704AEO777787343_100_100.jpg`} alt="상품이미지" />
                                                    </label>
                                                </div>
                                                <div className="column tit">
                                                    <p className="tit">
                                                        <a href={`/product/view?productCd=${item.product_id}`} className="productNm">{productData ? productData.name : "상품 이름 없음"}</a>
                                                    </p>
                                                    <p className="desc">옵션</p>
                                                    <p className="desc"></p>

                                                    <ul className="price-item">
                                                        <li><span className="num">{productData ? productData.price : "가격 정보 없음"}</span>원</li>
                                                    </ul>
                                                </div>

                                                <div className="column qty">
                                                    <div className="qty-group">
                                                        <button type="button" className="btn-qty cart" title="" onClick={() => handleDecreaseQuantity(item.product_id)}>
                                                            <i className="ico-minus-bold"></i><span className="blind">빼기</span>
                                                        </button>
                                                        <input type="text" title="" className={`input-qty product-${item.product_id}`} id={`qty-20240408000024272765`} value={item.count} data-max-qty="0" readOnly />
                                                        <button type="button" className="btn-qty cart" title="" onClick={() => handleIncreaseQuantity(item.product_id)}>
                                                            <i className="ico-plus-bold"></i><span className="blind">더하기</span>
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="column price">
                                                    <input type="hidden" id={`cart-orange-save-price-minus-20240408000024272765`} className="nOrangeSavePriceMinus" value="350" />
                                                    <input type="hidden" id={`cart-orange-save-price-${item.product_id}`} className="nOrangeSavePrice" value="17550" />
                                                    <div className="price-div">
                                                        <span className="num cart-price-923 brand-cd-1042 partner-cd-16 cart-price-923" id={`cart-price-20240408000024272765`}>{calculateTotalPriceForItem(item.product_id)} {/* 각 상품의 총 가격을 표시 */}</span>원
                                                    </div>
                                                </div>

                                                <div className="column btn">
                                                    <button type="button" className="btn-x-sm deleteUserCart" title="" onClick={() => deleteItemFromCart(item.product_id)}>
                                                        <i className="ico-x-black"></i><span className="blind">삭제</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}

                        </ul>
                    </div>
                </div>

                <div className="cart-total-box grid-area-span4">
                    <div className="colum">
                        <dl className="price-info">
                            <dt className="tit">상품금액</dt>
                            <dd className="price"><em className="num" id="totalProductPrice">{totalProductPrice}</em>원</dd>
                        </dl>
                    </div>
                    <div className="colum">
                        <dl className="price-info">
                            <dt className="tit">할인금액</dt>
                            <dd className="price"><em className="num" id="totalDiscountPrice">0</em>원</dd>
                        </dl>
                    </div>
                    <div className="colum">
                        <dl className="price-info">
                            <dt className="tit">배송비</dt>
                            <dd className="price"><em className="num" id="totalDeliveryPrice">0</em>원</dd>
                        </dl>
                    </div>
                    <div className="colum">
                        <dl className="price-info-last">
                            <dt className="tit">총 결제금액</dt>
                            <dd className="price">
                                <em className="num text-primary totalOrderPrice">{totalProductPrice}</em>원
                            </dd>
                        </dl>
                    </div>
                </div>

                <div className="page-guide-center">
                    <ul className="bl-list-type1">
                        <li>배송방법 선택 또는 배송지에 따라 배송비가 달라질 수 있습니다.</li>
                        <li>제품별로 출고지 및 출고일정이 상이하여 합포장 또는 개별발송될 수 있습니다.</li>
                        <li>상온과 냉동 합배송이 가능한 품목의 경우에는 상온 마감시간 기준으로 합배송 출고될 수 있습니다.</li>
                    </ul>
                </div>

                <div className="btn-bottom-area">
                    <a href="/" className="btn-basic-xxlg btn-default-ex">
                        <span>쇼핑계속하기</span>
                    </a>
                    <a href="" className="btn-basic-xxlg btn-primary-ex" id="order" onClick={handleOrder}>
                        <span><em className="text-num-bold totalOrderPrice">{totalProductPrice}</em>원 주문하기</span>
                    </a>
                </div>
            </div>
        );
    };


    return (
        <div className="wrap main">
            <Header /> {/* Header 컴포넌트 추가 */}
            <section id="contents" className="container">
                {renderCartItems()}
            </section>
            <Footer /> {/* Footer 컴포넌트 추가 */}
        </div>
    );
}

export default Cart;
