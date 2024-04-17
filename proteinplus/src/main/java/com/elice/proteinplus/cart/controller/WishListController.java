package com.elice.proteinplus.cart.controller;

import com.elice.proteinplus.cart.service.WishListService;
import com.elice.proteinplus.product.entity.Product;
import com.elice.proteinplus.product.service.ProductService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/wishList")
@Slf4j
public class WishListController {

    private final WishListService wishListService;
    private final ProductService productService;

    // Todo: 다른페이지에서 하트누르면 찜한 상품에 추가

    // userId로 products 정보 받는 메소드
//    @GetMapping
//    public List<Product> getProductsInWishListByIds(){
//        List<Long> productIds = wishListService.findProductIdsByUserId(1L); //userId 받아왔다고 가정
//        log.info("찜 목록의 상품 아이템 아이디들 : " + productIds);
//        return productService.getProductsByIds(productIds);
//    }
    @GetMapping
    public List<Product> getProductsInWishListByIds(@RequestHeader("Authorization") String token){
        // JWT 디코딩하여 사용자 ID 추출
        log.info("token ---------------------- : "+token);

        // userId로 상품 아이디 리스트 가져오기
        List<Long> productIds = wishListService.findProductIdsByUserId(1L);
        log.info("찜 목록의 상품 아이템 아이디들 : " + productIds);

        // 상품 아이디 리스트로 상품 목록 가져오기
        return productService.getProductsByIds(productIds);
    }


    @DeleteMapping
    @Transactional
    public void deleteWishListsByUesrId() { // 전체삭제
        int deletedRows = wishListService.deleteWishListsByUserId(1L); //userId 받아왔다고 가정
        log.info("WishList 전체 삭제된 행의 수 : "+deletedRows);
    }

    @DeleteMapping("/{productId}")
    @Transactional
    public void deleteWishListByIds(@PathVariable("productId") Long productId) {
        log.info("productId : " +productId);
        wishListService.deleteSelectedWishListByIds(1L, productId);
    }
}
