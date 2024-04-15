package com.elice.proteinplus.product.service;

import com.elice.proteinplus.product.dto.ReviewTotalDto;
import com.elice.proteinplus.product.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;


    @Transactional(readOnly = true)
    public List<ReviewTotalDto> getReviewTotalDtoByProductIds(List<Long> productIds) {
        return reviewRepository.getReviewTotalDtoByProductIds(productIds);
    }
}
