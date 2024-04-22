package com.elice.proteinplus.cart.controller;

import com.elice.proteinplus.product.entity.Product;
import com.elice.proteinplus.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cart")
public class CartController {

    private final ProductService productService;

    @PostMapping
    public List<Product> getProductsInCartByIds(@RequestBody List<Long> cartIds) {
        return productService.getProductsByIds(cartIds);
    }

}
