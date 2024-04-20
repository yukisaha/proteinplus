package com.elice.proteinplus.product.service;

import com.elice.proteinplus.product.dto.ReviewTotalDto;
import com.elice.proteinplus.product.entity.Product;
import com.elice.proteinplus.product.entity.Review;
import com.elice.proteinplus.product.repository.ReviewRepository;
import com.elice.proteinplus.user.Service.UserJoinService;
import com.elice.proteinplus.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
//    private final ProductService productService;
//    private final UserJoinService userJoinService;
//
//    @Transactional
//    public Review createReview(Long productId, Long userId, int rating, String content) {
//        Product product = productService.getProductById(productId);
//        User user = userJoinService.getUserById(userId);
//
//        if (product == null) {
//            throw new IllegalArgumentException("Invalid product ID");
//        }
//        if (user == null) {
//            throw new IllegalArgumentException("Invalid user ID");
//        }
//
//        Review review = new Review();
//        review.setProduct(product);
//        review.setUser(user);
//        review.setRating(rating);
//        review.setContent(content);
//        review.setUploadDate(LocalDateTime.now());
//
//        return reviewRepository.save(review);
//    }

    @Transactional(readOnly = true)
    public List<ReviewTotalDto> getReviewTotalDtoByProductIds(List<Long> productIds) {
        return reviewRepository.getReviewTotalDtoByProductIds(productIds);
    }

    //특정상품 리뷰조회
    @Transactional(readOnly = true)
    public List<Review> getReviewsByProductId(Long productId) {
        return reviewRepository.findByProductId(productId);
    }

//    //특정 회원 리뷰조회
//    @Transactional(readOnly = true)
//    public List<Review> getReviewsByUserId(Long userId) {
//        return reviewRepository.findByUserId(userId);
//    }
//
//    //특정상품에서 특정회원의 리뷰 조회
//    @Transactional(readOnly = true)
//    public Optional<Review> getReviewByProductIdAndUserId(Long productId, Long userId) {
//        return reviewRepository.findByProductIdAndUserId(productId, userId);
//    }
//

}
