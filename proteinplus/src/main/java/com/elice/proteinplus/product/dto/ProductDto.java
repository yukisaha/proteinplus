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
//    private int final_price;  //최종가격 다른 서비스단에서 계산을 구현하고 entity에 포함하지 않기로 했었어요!
//    private String description;  //기존 erd에는 없던 내용인데 필요하다면 주석 해제하고 db에 잘 저장 되었는지 확인 부탁드려요!
    private String content;
    private LocalDateTime uploadDate;
    private Integer discountRate;
    private int stock;
}
