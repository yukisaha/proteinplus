package com.elice.proteinplus.order.entity;

import com.elice.proteinplus.global.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "orderDetail")
public class OrderDetail extends BaseTimeEntity {
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

    @Column(name = "order_price")
    private int orderPrice; //주문가격

    @Column(name = "order_count")
    private int orderCount; //수량

    //상품 주문
    public static OrderDetail createOrderItem(Product product, int count){
        OrderDetail orderDetail = new OrderDetail();
        orderDetail.setProduct(product); //주문 상품
        orderDetail.setOrderCount(count); //주문 수량 세팅
        orderDetail.setOrderPrice(product.getPrice()); //나중에 쿠폰이나 할인 설정

        //주문한 수량만큼 재고 감소
        product.removeStock(count);
        return orderDetail;
    }

    //주문 가격 *수량 = 총 가격
    public int getTotalPrice(){
        return orderPrice*orderCount;
    }

    //주문 취소
    public void cancel(){
        this.getProduct().addStock(orderCount);
    }

}
