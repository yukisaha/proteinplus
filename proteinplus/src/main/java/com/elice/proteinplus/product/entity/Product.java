package com.elice.proteinplus.product.entity;

import com.elice.proteinplus.category.entity.Category;
//import com.elice.proteinplus.order.entity.OrderDetail;
import com.elice.proteinplus.global.entity.BaseTimeEntity;
import com.elice.proteinplus.product.dto.ProductCreateDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "product")
@Getter
@Setter
public class Product extends BaseTimeEntity {

    @Id
    @Column(name = "product_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    @JoinColumn(name = "category_id")
    private Category category;

//    //order_detail에서 product랑 ManyToOne
//    @OneToMany(mappedBy = "product")
//    private Set<OrderDetail> orderDetails = new HashSet<>();

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    //  판매가능, (품절임박), 품절
    @Column(name = "product_status", nullable = false, length = 50)
    private String productStatus;

    @Column(name = "price", nullable = false)
    private int price;  //원가

    @Lob
    @Column(name = "content")
    private String content; //상품 상세설명

    //상품등록일
    @Column(name ="upload_date")
    private LocalDateTime uploadDate;

    @Column(name = "hits")
    private Integer hits;

    @Column(name = "discount_rate")
    private Integer  discountRate;

    @Column(nullable = false)
    private int stock;

    @Column(name = "main_image_url", length = 1000)
    private String mainImageUrl;

    @Column(name = "detail_image_url", length = 1000)
    private String detailImageUrl;

    public void updateProduct(ProductCreateDto productCreateDto){
        this.name = productCreateDto.getName();
        this.price = productCreateDto.getPrice();
        this.stock = productCreateDto.getStock();
        this.discountRate = productCreateDto.getDiscountRate();
        this.productStatus = productCreateDto.getProductStatus();
    }

    //주문 수량(count)만큼 재고 감소
//    public void decreaseStock(int count){
//        if (this.stock >= count){
//            this.stock = this.stock - count;
//            if(this.stock == 0){
//                this.productStatus = "soldOut";
//            }
//        } else{
//            throw new IllegalArgumentException("재고가 부족합니다.");
//        }
//    }

    //주문 취소하면 재고 돌려놔
//    public void increaseStock(int count){
//        this.stock = this.stock + count;
//        if(this.stock > 0 && this.productStatus.equals("soldOut")){
//            this.productStatus = "sell";
//        }
//    }

//    public void updateStock(){
//        if(this.stock == 0){
//            this.productStatus = "soldOut";
//        }else{
//            this.productStatus = "sell";
//        }
//    }

}
