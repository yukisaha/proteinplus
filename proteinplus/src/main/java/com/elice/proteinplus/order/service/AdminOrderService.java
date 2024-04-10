package com.elice.proteinplus.order.service;

import com.elice.proteinplus.order.dto.OrderDetailDto;
import com.elice.proteinplus.order.dto.OrderHistDto;
import com.elice.proteinplus.order.entity.Order;
import com.elice.proteinplus.order.entity.OrderDetail;
import com.elice.proteinplus.order.entity.OrderStatus;
import com.elice.proteinplus.order.repository.OrderDetailRepository;
import com.elice.proteinplus.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class AdminOrderService {

    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;

    /* 전체 주문리스트 조회(관리자) */
    public Page<OrderHistDto> getAllOrders(Pageable pageable) {
        List<Order> orders = orderRepository.findAll(pageable).getContent(); // DB에서 모든 주문 내역 조회
        return convertToOrderDtoList(orders, pageable);
    }

    /* 회원별 주문리스트 조회(관리자) */
    public Page<OrderHistDto>  getOrdersByUserId(Long userId, Pageable pageable) {
        List<Order> orders = orderRepository.findByUserIdOrders(userId, pageable); // 회원별 주문 내역 조회
        return convertToOrderDtoList(orders, pageable);
    }

    private Page<OrderHistDto>  convertToOrderDtoList(List<Order> orders, Pageable pageable) {
        List<OrderHistDto> orderHistDtos = new ArrayList<>();
        for (Order order : orders) {
            OrderHistDto orderHistDto = new OrderHistDto(order);
            List<OrderDetail> orderDetails = order.getOrderDetails();
            for (OrderDetail orderDetail : orderDetails) {
                OrderDetailDto orderDetailDto = new OrderDetailDto(orderDetail);
                orderHistDto.addOrderDetailDto(orderDetailDto);
            }
            orderHistDtos.add(orderHistDto);
        }
        // 페이지 구현 객체를 생성하여 반환
        return new PageImpl<OrderHistDto>(orderHistDtos, pageable);
    }

    /* 주문 상태 변경(관리자) */
    @Transactional
    public boolean updateOrderStatus(Long orderId, OrderStatus newStatus) {
        return orderRepository.findById(orderId)
                .map(order -> {
                    order.setOrderStatus(newStatus);
                    orderRepository.save(order);
                    return true; // 주문이 존재하고 업데이트가 성공한 경우 true 반환
                })
                .orElse(false); // 주문이 존재하지 않는 경우 false 반환
    }


    /* 주문 삭제 (관리자) */
    public boolean deleteOrder(Long orderId) {
        return orderRepository.findById(orderId)
                .map(order -> {
                    orderRepository.delete(order);
                    return true;
                })
                .orElse(false);
    }

}
