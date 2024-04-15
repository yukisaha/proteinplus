package com.elice.proteinplus.product.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReviewTotalDto {
    private Long productId;
    private Long totalReviewCount;
    private Double rating;

}
