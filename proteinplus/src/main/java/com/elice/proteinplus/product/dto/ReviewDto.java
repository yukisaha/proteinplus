package com.elice.proteinplus.product.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ReviewDto {

    private Long id;
    private int rating;
    private LocalDateTime uploadDate;
    private String content;
    private String reviewImageUrl;

}
