package com.elice.proteinplus.product.controller;

import com.elice.proteinplus.cart.service.WishListService;
import com.elice.proteinplus.product.dto.ReviewTotalDto;
import com.elice.proteinplus.product.entity.Review;
import com.elice.proteinplus.product.service.ReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/review")
@RequiredArgsConstructor
@Slf4j
public class ReviewController {

    private final ReviewService reviewService;
    private final WishListService wishListService;


    @GetMapping
    public List<ReviewTotalDto> getReviewTotalDtoByProductId() {
        try {
            // 여기에 해당 엔드포인트의 로직을 추가합니다.
            List<Long> productIds = wishListService.findProductIdsByUserId(1L); //userId 받아왔다고 가정
            return reviewService.getReviewTotalDtoByProductIds(productIds);
        } catch (Exception e) {
            log.error("Error occurred while processing the request: {}", e.getMessage());
            throw new RuntimeException("An error occurred while processing the request", e);
        }
    }

//    @PostMapping("/admin/add")
//    public Review createReview(
//            @RequestParam Long productId,
//            @RequestParam Long userId,
//            @RequestParam int rating,
//            @RequestParam String content
//    ){
//        return reviewService.createReview(productId, userId, rating, content);
//    }

    //특정상품 리뷰조회
    @GetMapping("/product/{productId}")
    public List<Review> getReviewsByProductId(@PathVariable Long productId){
        return reviewService.getReviewsByProductId(productId);
    }

//    //특정회원 리뷰조회
//    @GetMapping("/user/{userId}")
//    public List<Review> getReviewsByUserId(@PathVariable Long userId) {
//        return reviewService.getReviewsByUserId(userId);
//    }
//
//    //특정상품의 특정회원 리뷰조회
//    @GetMapping("/product/{productId}/user/{userId}")
//    public Optional<Review> getReviewByProductIdAndUserId(
//            @PathVariable Long productId,
//            @PathVariable Long userId
//    ) {
//        return reviewService.getReviewByProductIdAndUserId(productId, userId);
//    }

}
