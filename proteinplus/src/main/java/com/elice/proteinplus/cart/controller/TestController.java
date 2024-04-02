package com.elice.proteinplus.cart.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TestController {


    @GetMapping("cart")
    public String test(){
        return "cart/cart";
    }

    @GetMapping("mypage")
    public String mypageTest(){
        return "mypageFrame";
    }

    @GetMapping("wishList")
    public String wishListTest(){
        return "cart/wishList";
    }
}
