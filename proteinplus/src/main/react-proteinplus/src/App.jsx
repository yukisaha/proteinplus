import React from 'react';

import OrderPage from './component/order/order';
import CancelDetailPage from "./component/order/cancelDetail";
import OrderDetailPage from "./component/order/orderDetail";
export default function App(){
    return(
        <div className="App">
            {/*<OrderPage/>*/}
            {/*<CancelDetailPage/>*/}
            <OrderDetailPage/>
        </div>
    );
}
