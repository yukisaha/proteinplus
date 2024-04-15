import React from 'react';

const OrderComplete = ({ orderInfo }) => {
    return (
        <div>
            <h2>주문이 완료되었습니다!</h2>
            <p>주문 번호: {orderInfo.orderId}</p>
            <p>주문한 상품 목록:</p>
            <ul>
                {orderInfo.products.map(product => (
                    <li key={product.productId}>
                        {product.name} - {product.price}원
                    </li>
                ))}
            </ul>
            {/* 기타 주문 정보 표시 */}
        </div>
    );
};

export default OrderComplete;
