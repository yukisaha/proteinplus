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
import ProductList from "./pages/product/ProductList";
import Join from "./pages/user/Join";
import JoinComplete from "./pages/user/JoinComplete";
import Login from "./pages/user/Login";
import UserDelete from "./pages/user/UserDelete";
import UserProfileEdit from "./pages/user/UserProfileEdit";
import UserProfileEditPwdCheck from "./pages/user/UserProfileEditPwdCheck";

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
    },
    {
        path: "/product",
        element: <ProductList />
    },
    {
        path: "/member/join",
        element: <Join />
    },
    {
        path: "/member/join/complete",
        element: <JoinComplete />
    },
    {
        path: "/auth/login",
        element: <Login />
    },
    {
        path: "/mypage/member/delete",
        element: <UserDelete />
    },
    {
        path: "/mypage/info/edit",
        element: <UserProfileEdit />
    },
    {
        path: "/member-pwd-check",
        element: <UserProfileEditPwdCheck />
    }

]);

export default function App(){
    return (
        <RouterProvider router={router} />
    );
}
