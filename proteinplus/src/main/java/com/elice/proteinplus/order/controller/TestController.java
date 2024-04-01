package com.elice.proteinplus.order.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TestController {
    @GetMapping(path = "/order")
    public String order() {
        return "order/order";
    }

    @GetMapping(path = "/orderList")
    public String orderList() {
        return "order/orderDetail";
    }

    @GetMapping(path = "/cancelList")
    public String cancelList() {
        return "order/cancelDetail";
    }
}