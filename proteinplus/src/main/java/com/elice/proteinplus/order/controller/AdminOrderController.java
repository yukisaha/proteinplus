package com.elice.proteinplus.order.controller;

import com.elice.proteinplus.order.dto.OrderHistDto;
import com.elice.proteinplus.order.entity.OrderStatus;
import com.elice.proteinplus.order.service.AdminOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/admin")
public class AdminOrderController {

    private final AdminOrderService adminOrderService;

    // 모든 주문 조회 (페이지네이션 포함)
    @GetMapping("/orders")
    public ResponseEntity<Page<OrderHistDto>> getAllOrders(Pageable pageable) {
        Page<OrderHistDto> orders = adminOrderService.getAllOrders(pageable);
        return ResponseEntity.ok(orders);
    }

    // 특정 사용자의 주문 조회 (페이지네이션 포함)
    @GetMapping("/order/user/{userId}")
    public ResponseEntity<Page<OrderHistDto>> getOrdersByUserId(@PathVariable Long userId, Pageable pageable) {
        Page<OrderHistDto> orders = adminOrderService.getOrdersByUserId(userId, pageable);
        return ResponseEntity.ok(orders);
    }

    // 주문 상태 변경
    @PutMapping("/order/{orderId}/edit")
    public ResponseEntity<Void> updateOrderStatus(@PathVariable Long orderId, @RequestParam OrderStatus newStatus) {
        boolean updated = adminOrderService.updateOrderStatus(orderId, newStatus);
        if (updated) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 주문 삭제
    @PostMapping("/order/{orderId}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long orderId) {
        boolean deleted = adminOrderService.deleteOrder(orderId);
        if (deleted) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
