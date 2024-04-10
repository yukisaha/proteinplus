//package com.elice.proteinplus.order.dto;
//
//import com.elice.proteinplus.order.entity.Order;
//import com.elice.proteinplus.order.entity.OrderStatus;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.Setter;
//
//import java.time.format.DateTimeFormatter;
//import java.util.ArrayList;
//import java.util.List;
//
////주문 정보 담음
//@Getter
//@Setter
//public class OrderHistDto {
//
//    private Long orderId; //주문아이디
//    private String orderDate; //주문날짜
//    private OrderStatus orderStatus; //주문 상태
//
//    //주문 상품 리스트
//    private List<OrderDetailDto> orderDetailDtoList = new ArrayList<>();
//
//    public OrderHistDto(Order order){ //order 객체를 파라미터로 받아서 멤벼 변수 값 세팅
//        this.orderId = order.getId();
//        this.orderDate = order.getOrderDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));
//        this.orderStatus = order.getOrderStatus();
//    }
//
//
//    //주문 상품리스트
//    public void addOrderDetailDto(OrderDetailDto orderDetailDto){
//        orderDetailDtoList.add(orderDetailDto);
//    }
//
//}
