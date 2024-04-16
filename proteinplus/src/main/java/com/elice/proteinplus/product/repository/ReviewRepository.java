package com.elice.proteinplus.product.repository;

import com.elice.proteinplus.product.dto.ReviewTotalDto;
import com.elice.proteinplus.product.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("SELECT new com.elice.proteinplus.product.dto.ReviewTotalDto(r.product.id, COUNT(r), AVG(r.rating)) " +
            "FROM Review r WHERE r.product.id IN :productIds " +
            "GROUP BY r.product.id")
    List<ReviewTotalDto> getReviewTotalDtoByProductIds(List<Long> productIds);


}
