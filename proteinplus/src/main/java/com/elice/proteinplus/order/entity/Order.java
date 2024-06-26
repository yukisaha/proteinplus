package com.elice.proteinplus.order.entity;

import com.elice.proteinplus.global.entity.BaseTimeEntity;
import com.elice.proteinplus.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString
@Table(name ="orders")
public class Order extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user; //한명의 회원은 여러번의 주문 할 수 있다. (주문엔티티 기준 다대일 단방향)

    @Column(name = "order_date", nullable = false)
    private LocalDateTime orderDate; //주문일

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus; //주문상태

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderDetail> orderDetails = new ArrayList<>(); //하나의 주문이 여러개의 주문 상품을 가지므로 List사용

    @OneToOne(mappedBy = "order", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Delivery delivery; //배송정보


    //주문 객체 만들기
    public void addOrderItem(OrderDetail orderDetail) {
        orderDetails.add(orderDetail); //OrderDetail 객체를 order 객체의 OrderDetail에 추가합니다.
        orderDetail.setOrder(this);
    }

    // 주문하기 = 주문상태 주문으로 바꾸기 + 현재 시간을 주문 시간으로 세팅
    public static Order createOrder(User user, LocalDateTime orderDate, OrderStatus orderStatus) {
        Order order = new Order();
        order.setUser(user);
        order.setOrderDate(orderDate);
        order.setOrderStatus(orderStatus);
        order.setOrderStatus(OrderStatus.ORDER);
        order.setOrderDate(LocalDateTime.now());
        return order;
    }

    //주문 취소 = 상품 재고 더하기 + 주문상태 취소로 바꾸기
    public void cancelOrder() {
        if(this.getOrderStatus() == OrderStatus.PREPARE_DELIVERY){ //COMP 는 이미 배송이 완료된 상품이다.
            throw new IllegalStateException("이미 배송 준비중인 상품은 취소가 불가능합니다.");
        }
        if(this.getOrderStatus() == OrderStatus.ON_DELIVERY){ //COMP 는 이미 배송이 완료된 상품이다.
            throw new IllegalStateException("이미 배송중인 상품은 취소가 불가능합니다.");
        }
        if(this.getOrderStatus() == OrderStatus.DELIVERY_OVER){ //COMP 는 이미 배송이 완료된 상품이다.
            throw new IllegalStateException("이미 배송완료된 상품은 취소가 불가능합니다.");
        }
        this.setOrderStatus(OrderStatus.CANCEL);
        for (OrderDetail orderDetail : orderDetails) {
            orderDetail.cancel();
        }
    }

    public void updateOrder(int count) {

        for(OrderDetail orderDetail : orderDetails) {
            orderDetail.update(count);
        }
    }

}