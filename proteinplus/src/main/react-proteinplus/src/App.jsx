import React from 'react';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

import Home from './pages/home/Home.js';
import Cart from './pages/cart/Cart.js';
import MypageFrame from './components/MypageFrame.js';
import WishList from './pages/cart/WishList.js';
import Category from "./pages/category/Category";
import Rank from "./pages/rank/Rank";
import Order from "./pages/order/Order";
import OrderDetail from "./pages/order/OrderDetail";
import CancelDetail from "./pages/order/CancelDetail";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/cart",
        element: <Cart />
    },
    {
        path: "/mypageFrame",
        element: <MypageFrame />
    },
    {
        path: "/wishList",
        element: <WishList />
    },
    {
        path: "/product/list/:categoryId",
        element: <Category />
    },
    {
        path: "/product/rank/:categoryId",
        element: <Rank />
    },
    {
        path: "/product/rank/:categoryId/sales",
        element:<Rank />
    },

    {
        path: "/order",
        element: <Order />
    },
    {
        path: "/orderDetail",
        element: <OrderDetail />
    },
    {
        path: "/cancelDetail",
        element: <CancelDetail />
    }
]);

export default function App(){
    return (
        <RouterProvider router={router} />
    );
}
