package com.elice.proteinplus.order.entity;

import com.elice.proteinplus.global.entity.BaseTimeEntity;
import com.elice.proteinplus.product.entity.Product;
import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "orderDetail")
public class OrderDetail extends BaseTimeEntity{
    @Id
    @GeneratedValue
    @Column(name = "order_detail_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product; //하나의 상품은 여러 주문 상품으로 들어갈 수 있다. 주문 상품 기준으로 다대일 단방향

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false) //fk
    private Order order; //하나의 주문에 여러개의 상품을 주문할 수 있다. 주문상품과 주문 엔티티를 다대일 단방향

    @Column(name = "count")
    private int count; //수량

    //상품 주문
    @Builder
    public static OrderDetail createOrderDetail(Product product, int orderPrice, int count) {

        OrderDetail orderDetail = OrderDetail.builder()
                .product(product)
                .orderPrice(orderPrice)
                .count(count)
                .build();

        // product.decreaseStock(count);
        return orderDetail;
    }

    //주문 취소
    public void cancel(){
        // this.getProduct().increaseStock(count);
    }

    public void update(int count) {
    }

}
