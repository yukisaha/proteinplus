package com.elice.proteinplus;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TestController {
    @GetMapping(path = "/order")
    public String hello() {
        return "order/order";
    }
}