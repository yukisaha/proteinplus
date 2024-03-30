package com.elice.proteinplus.category.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TestController {

    @GetMapping
    public String getPage() {
        return "category/category";
    }

}
