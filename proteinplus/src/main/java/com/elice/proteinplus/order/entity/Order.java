package com.elice.proteinplus.order.entity;

import com.elice.proteinplus.global.entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString
@Table(name ="order")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user; //한명의 회원은 여러번의 주문 할 수 있다. (주문엔티티 기준 다대일 단방향)

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product; //한명의 회원은 여러번의 주문 할 수 있다. (주문엔티티 기준 다대일 단방향)

    @Column(name = "order_date", nullable = false)
    private LocalDateTime orderDate; //주문일

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus; //주문상태

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderDetail> orderDetails = new ArrayList<>(); //하나의 주문이 여러개의 주문 상품을 가지므로 List사용

    //cascade : order를 저장할때 delivery도 자동으로 persist 해준다.
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL) //하나의 배송정보는 하나의 주문정보만 가져야 하니까
    @JoinColumn(name = "delivery_id")  //연관관계 주인 fk
    private Delivery delivery; //배송정보


    //주문 객체 만들기
    public void addOrderItem(OrderDetail orderDetail) {
        orderDetails.add(orderDetail);
        orderDetail.setOrder(this);
    }


    public static Order createOrder(User user, List<OrderDetail> orderDetailList) {
        Order order = new Order();
        order.setUser(user); //상품을 주문한 회원의 정보를 세팅

        for (OrderDetail orderDetail : orderDetailList) {
            order.addOrderItem(orderDetail);
        }
        order.setOrderStatus(OrderStatus.ORDER); //주문 상태 세팅
        order.setOrderDate(LocalDateTime.now()); //현재 시간을 주문 시간으로 세팅

        return order;
    }

    //주문 취소 = 상품 재고 더하기 + 주문상태 취소로 바꾸기
    public void cancelOrder() {
        this.orderStatus = OrderStatus.CANCEL;
        for (OrderDetail orderDetail : orderDetails) {
            orderDetail.cancel();
        }
    }

    //총 주문 금액
    public int getTotalPrice() {
        int totalPrice = 0;
        for (OrderDetail orderDetail : orderDetails) {
            totalPrice += orderDetail.getTotalPrice();
        }
        return totalPrice;
    }

}