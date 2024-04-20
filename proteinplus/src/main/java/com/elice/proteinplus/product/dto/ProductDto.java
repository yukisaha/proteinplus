package com.elice.proteinplus.product.dto;


import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ProductDto {
    private Long id;
    private String name;
    private String productStatus;
    private int price;
    private String content;
    private LocalDateTime uploadDate;
    private Integer discountRate;
    private int stock;
    private String mainImageUrl;
    private String detailImageUrl;
}
