package com.elice.proteinplus.order.controller;

import com.elice.proteinplus.order.dto.DeliveryDto;
import com.elice.proteinplus.order.dto.OrderDto;
import com.elice.proteinplus.order.dto.OrderHistDto;
import com.elice.proteinplus.order.service.OrderService;
import com.elice.proteinplus.product.service.ProductService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
@Slf4j
public class OrderController {

    private final OrderService orderService;
    private final ProductService productService;

    // 특정 사용자의 주문 목록을 조회합니다.
    @GetMapping("/user/mypage/orderlist")
    public ResponseEntity<Page<OrderHistDto>> getUserOrders(Pageable pageable) {
        Page<OrderHistDto> orders = orderService.getOrders(1L, pageable);
        return ResponseEntity.ok(orders);
    }

    // 특정 사용자의 취소된 주문 목록을 조회합니다.
    @GetMapping("/user/mypage/cancellist")
    public ResponseEntity<Page<OrderHistDto>> getCancelledUserOrders(Pageable pageable) {
        Page<OrderHistDto> cancelledOrders = orderService.getCancelledOrders(1L, pageable);
        return ResponseEntity.ok(cancelledOrders);
    }

    // 주문을 생성합니다.
    @PostMapping("/order/order")
    public ResponseEntity<Long> addOrder(@RequestBody List<OrderDto> orderDtoList) {
        Long orderId = orderService.order(orderDtoList, 1L); // 여기서 1L은 사용자 ID로 변경 가능
        return ResponseEntity.status(HttpStatus.CREATED).body(orderId);
    }


    // 배송정보을 생성합니다.
    @PostMapping("/order/delivery")
    public ResponseEntity<Long> addDelivery(@RequestBody DeliveryDto deliveryDto) {
        log.info(deliveryDto.toString() + " addDelivery");
        Long orderId = deliveryDto.getOrderId(); // DeliveryDto에서 orderId를 가져옴
        Long deliveryId = orderService.delivery(deliveryDto, orderId); // orderId를 함께 전달
        return ResponseEntity.status(HttpStatus.CREATED).body(deliveryId);
    }

    // 배송정보를 조회합니다.
    @GetMapping("/order/delivery/{orderId}")
    public ResponseEntity<DeliveryDto> getAddressByOrderId(@PathVariable Long orderId) {
        try {
            DeliveryDto deliveryDto = orderService.getAddressByOrderId(orderId);
            return ResponseEntity.ok(deliveryDto);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }


//    // 주문의 배송 정보를 업데이트합니다.
//    @PutMapping("/user/mypage/orderlist/{orderId}/edit")
//    public ResponseEntity<Void> updateDeliveryInfo(@PathVariable Long orderId,
//                                                   @RequestBody DeliveryDto deliveryDto) {
//        boolean updated = orderService.updateDeliveryInfo(orderId, deliveryDto);
//        if (updated) {
//            return ResponseEntity.ok().build();
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }

    // 주문을 취소합니다.
    @PostMapping("/user/mypage/orderlist/{orderId}")
    public ResponseEntity<Void> cancelOrder(@PathVariable Long orderId) {
        boolean cancelled = orderService.cancelOrder(orderId);
        if (cancelled) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
