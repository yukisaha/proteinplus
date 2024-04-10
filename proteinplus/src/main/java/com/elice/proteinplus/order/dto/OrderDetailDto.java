//package com.elice.proteinplus.order.dto;
//
//import com.elice.proteinplus.order.entity.OrderDetail;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
///**
// * 조회한 주문 데이터 화면에 보낼때 사용
// * 주문 상품 정보 담음
// */
//
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//public class OrderDetailDto {
//
//    private String productName; //상품명
//    private int count; //주문 수량
//    private int orderPrice; //주문 금액
//
//    public OrderDetailDto(OrderDetail orderDetail){
//        this.productName = orderDetail.getProduct().getName();
//        this.count = orderDetail.getCount();
//        this.orderPrice = orderDetail.getOrderPrice();
//    }
//}
