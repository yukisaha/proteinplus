package com.elice.proteinplus.cart.controller;

import com.elice.proteinplus.cart.service.WishListService;
import com.elice.proteinplus.product.entity.Product;
import com.elice.proteinplus.product.service.ProductService;
import com.elice.proteinplus.user.Service.UserJoinService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/wishList")
@Slf4j
public class WishListController {

    private final WishListService wishListService;
    private final ProductService productService;
    private final UserJoinService userService;


    // 상품 상세페이지에서 하트누르면 찜한 상품에 추가
//    @PostMapping("/{productId}")
//    public void addProductToWishList(@PathVariable("productId") Long productId, @RequestHeader("Authorization") String token) {
//        log.info("Add Product to WishList: productId : " + productId);
//        log.info("addProductToWishList token : " + token);
//
//        Long userId = userService.getUserIdFromToken(token);
//        log.info("addProductToWishList userId : " + userId);
//
//        wishListService.addProductToWishList(userId, productId);
//    }
    @PostMapping("/{productId}")
    public ResponseEntity<?> addProductToWishList(@PathVariable("productId") Long productId, @RequestHeader("Authorization") String token) {
        try {
            log.info("Add Product to WishList: productId : " + productId);
            log.info("addProductToWishList token : " + token);

            Long userId = userService.getUserIdFromToken(token);
            log.info("addProductToWishList userId : " + userId);

            wishListService.addProductToWishList(userId, productId);

            return ResponseEntity.ok().build(); // 성공 상태 코드 반환
        } catch (Exception e) {
            log.error("Error adding product to wish list: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add product to wish list."); // 실패 상태 코드 반환
        }
    }



    @GetMapping("/{productId}")
    public Long checkProductInWishList(@PathVariable("productId") Long productId, @RequestHeader("Authorization") String token) {
        log.info("checkProductInWishList token : " + token);

        // loginId 가져오기
        Long userId = userService.getUserIdFromToken(token);
        log.info("checkProductInWishList userId : " + userId);
        log.info("checkProductInWishList productId : " + productId);

        return wishListService.findIdByProductIdAndUserId(productId, userId);
    }

    // userId로 products 정보 받는 메소드
    @GetMapping
    public List<Product> getProductsInWishListByIds(@RequestHeader("Authorization") String token) {
        // JWT 디코딩하여 사용자 ID 추출
        log.info("getProductsInWishListByIds token : " + token);

        // loginId 가져오기
        Long userId = userService.getUserIdFromToken(token);
        log.info("getProductsInWishListByIds userId : " + userId);

        List<Long> productIds = wishListService.findProductIdsByUserId(userId);
        log.info("찜 목록의 상품 아이템 아이디들 : " + productIds);

        // 상품 아이디 리스트로 상품 목록 가져오기
        return productService.getProductsByIds(productIds);
    }


    // 전체 삭제 버튼 누르면 찜 상품 전체 삭제
    @DeleteMapping
    @Transactional
    public void deleteWishListsByUesrId(@RequestHeader("Authorization") String token) {
        log.info("deleteWishListsByUesrId token : " + token);

        Long userId = userService.getUserIdFromToken(token);
        log.info("getProductsInWishListByIds userId : " + userId);

        int deletedRows = wishListService.deleteWishListsByUserId(userId);
        log.info("WishListController deleteWishListsByUesrId 삭제된 행의 수 : " + deletedRows);
    }

    // 하트 누르면 찜 상품 개별 삭제
    @DeleteMapping("/{productId}")
    @Transactional
    public void deleteWishListByIds(@PathVariable("productId") Long productId, @RequestHeader("Authorization") String token) {
        log.info("deleteWishListByIds token : " + token);

        Long userId = userService.getUserIdFromToken(token);
        log.info("getProductsInWishListByIds userId : " + userId);

        log.info("WishListController deleteWishListByIds productId : " + productId);
        wishListService.deleteSelectedWishListByIds(userId, productId);
    }
}
