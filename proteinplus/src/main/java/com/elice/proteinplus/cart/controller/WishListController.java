package com.elice.proteinplus.cart.controller;

import com.elice.proteinplus.cart.service.WishListService;
import com.elice.proteinplus.product.entity.Product;
import com.elice.proteinplus.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/wishList")
public class WishListController {

    private final WishListService wishListService;
    private final ProductService productService;

    // Todo: 다른페이지에서 하트누르면 찜한 상품에 추가
    // TODO: 처음 wishlist페이지 로딩될 때 찜한 상품들 상품정보 다 가져오는 거 추가
    // TODO: wishlist페이지에서 하트 누르면 찜한 목록에서 삭제

    // userId로 products 정보 받는 메소드
    @GetMapping
    public List<Product> getProductsInWishListByIds(){
        List<Long> productIds = wishListService.findProductIdsByUserId(1L); //userId 받아왔다고 가정
        return productService.getProductsByIds(productIds);
    }


    // wishListId 받음
    @DeleteMapping("/{id}")
    public void deleteWishListByTestId(@PathVariable Long id) {
        wishListService.deleteByWishListId(id);
    }
}
