package com.elice.proteinplus.order.controller;

import com.elice.proteinplus.order.dto.DeliveryDto;
import com.elice.proteinplus.order.dto.OrderDto;
import com.elice.proteinplus.order.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders") // API 엔드포인트의 기본 URL
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/create")
    public ResponseEntity<Long> createOrder(@RequestBody OrderDto orderDto, @RequestBody DeliveryDto deliveryDto, @RequestParam Long userId) {
        Long orderId = orderService.order(orderDto, deliveryDto, userId);
        return ResponseEntity.ok(orderId);
    }

    @PutMapping("/update/{orderId}")
    public ResponseEntity<String> updateOrder(@PathVariable Long orderId, @RequestBody DeliveryDto deliveryDto) {
        boolean result = orderService.updateDeliveryInfo(orderId, deliveryDto);
        if (result) {
            return ResponseEntity.ok("Order updated successfully.");
        } else {
            return ResponseEntity.badRequest().body("Failed to update order.");
        }
    }

    @DeleteMapping("/cancel/{orderId}")
    public ResponseEntity<String> cancelOrder(@PathVariable Long orderId) {
        boolean result = orderService.cancelOrder(orderId);
        if (result) {
            return ResponseEntity.ok("Order cancelled successfully.");
        } else {
            return ResponseEntity.badRequest().body("Failed to cancel order.");
        }
    }
}

