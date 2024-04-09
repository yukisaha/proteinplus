package com.elice.proteinplus.product.dto;

import com.elice.proteinplus.product.entity.Product;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class ProductCreateDto {

    private Long id;

    @NotBlank(message = "상품명을 입력해주세요.")
    private String name;

    @NotNull(message = "가격을 입력해주세요.")
    private Integer price;

    @NotBlank(message = "상품 대표정보를 입력해주세요.")
    private String description;

    @NotNull(message = "재고를 입력해주세요.")
    private Integer stock;

    private Integer discountRate;

    private String productStatus;

    private String content;

    //객체간 변환을 위해 modelmapper 사용
    private static ModelMapper modelMapper = new ModelMapper();

    //관리자가 등록한 상품을 product 엔티티로 변환
    public Product createProduct(){
        return modelMapper.map(this, Product.class);
    }

    //product 엔티티를 DTO로 보내기
    public static ProductCreateDto of(Product product){
        return modelMapper.map(product, ProductCreateDto.class);
    }

}
