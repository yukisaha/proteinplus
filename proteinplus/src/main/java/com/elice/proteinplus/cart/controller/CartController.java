package com.elice.proteinplus.cart.controller;

import com.elice.proteinplus.product.entity.Product;
import com.elice.proteinplus.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/cart")
public class CartController {

    private final ProductService productService;

    @GetMapping
    public List<Product> findProductsInCartByIds(@RequestParam("ids") List<Long> ids) {
        return productService.getProductsInCartByIds(ids);
    }


    @GetMapping("/test")
    public String testEndpoint() {
        return "This is a test endpoint for /cart";
    }
}
