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

@RestController
@RequestMapping("/api/admin/orders")
@RequiredArgsConstructor
public class AdminOrderController {

    private final AdminOrderService adminOrderService;

    @GetMapping("/all")
    public ResponseEntity<Page<OrderHistDto>> getAllOrders(Pageable pageable) {
        Page<OrderHistDto> orders = adminOrderService.getAllOrders(pageable);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Page<OrderHistDto>> getOrdersByUserId(@PathVariable Long userId, Pageable pageable) {
        Page<OrderHistDto> orders = adminOrderService.getOrdersByUserId(userId, pageable);
        return ResponseEntity.ok(orders);
    }

    @PutMapping("/update/status/{orderId}")
    public ResponseEntity<String> updateOrderStatus(@PathVariable Long orderId, @RequestParam OrderStatus newStatus) {
        boolean result = adminOrderService.updateOrderStatus(orderId, newStatus);
        if (result) {
            return ResponseEntity.ok("Order status updated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found.");
        }
    }

    @DeleteMapping("/delete/{orderId}")
    public ResponseEntity<String> deleteOrder(@PathVariable Long orderId) {
        boolean result = adminOrderService.deleteOrder(orderId);
        if (result) {
            return ResponseEntity.ok("Order deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found.");
        }
    }
}

