package com.elice.proteinplus.product.repository;

import com.elice.proteinplus.product.dto.ReviewTotalDto;
import com.elice.proteinplus.product.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("SELECT new com.elice.proteinplus.product.dto.ReviewTotalDto(r.product.id, COUNT(r), AVG(r.rating)) " +
            "FROM Review r WHERE r.product.id IN :productIds " +
            "GROUP BY r.product.id")
    List<ReviewTotalDto> getReviewTotalDtoByProductIds(@Param("productIds") List<Long> productIds);

    //상품별 리뷰조회
    @Query("SELECT r FROM Review r JOIN FETCH r.product p WHERE p.id = :productId")
    List<Review> findByProductId(@Param("productId") Long productId);

//    //회원별 리뷰조회
//    List<Review> findByUserId(Long userId);
//
//    //한 상품에서 특정 회원의 리뷰 조회
//    Optional<Review> findByProductIdAndUserId(Long productId, Long userId);
//

}
