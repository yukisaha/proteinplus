package com.elice.proteinplus.order.service;

import com.elice.proteinplus.order.dto.DeliveryDto;
import com.elice.proteinplus.order.dto.OrderDetailDto;
import com.elice.proteinplus.order.dto.OrderDto;
import com.elice.proteinplus.order.dto.OrderHistDto;
import com.elice.proteinplus.order.entity.*;
import com.elice.proteinplus.order.repository.DeliveryRepository;
import com.elice.proteinplus.order.repository.OrderDetailRepository;
import com.elice.proteinplus.order.repository.OrderRepository;
import com.elice.proteinplus.user.Repository.UserJoinRepository;
import com.elice.proteinplus.product.entity.Product;
import com.elice.proteinplus.product.repository.ProductRepository;
import com.elice.proteinplus.user.entity.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


/* 주문 로직 */
@Service
@Slf4j
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserJoinRepository userRepository;
    private final DeliveryRepository deliveryRepository;
    private final OrderDetailRepository orderDetailRepository;

    /* 회원의 주문 내역 조회(회원) */
    @Transactional
    public Page<OrderHistDto> getOrders(Long userId, Pageable pageable) {
        // 주문 상태가 CANCEL이 아닌 주문 목록 조회
        List<Order> Orders = orderRepository.findByUserIdOrderList(userId, pageable);
        // 주문 목록을 주문 이력 DTO로 변환하여 반환
        return convertToOrderHistDtoPage(Orders, userId, pageable);
    }

    /* 회원의 주문 취소 내역 조회(회원) */
    @Transactional
    public Page<OrderHistDto> getCancelledOrders(Long userId, Pageable pageable) {
        // 주문 상태가 CANCEL인 주문 목록 조회
        List<Order> cancelledOrders = orderRepository.findByUserIdCancelList(userId, pageable);
        // 주문 목록을 주문 이력 DTO로 변환하여 반환
        return convertToOrderHistDtoPage(cancelledOrders, userId, pageable);
    }

    // 주문 목록을 주문 이력 DTO로 변환하는 메서드
    private Page<OrderHistDto> convertToOrderHistDtoPage(List<Order> orders, Long userId, Pageable pageable) {
        List<OrderHistDto> orderHistDtos = new ArrayList<>();

        // 주문 리스트 순회하면서 구매 이력 페이지에 전달할 DTO 생성
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
//        return new PageImpl<OrderHistDto>(orderHistDtos, pageable);
        return new PageImpl<OrderHistDto>(orderHistDtos, pageable, orderHistDtos.size());
    }

    @Transactional
    public Long order(List<OrderDto> orderDtoList, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(EntityNotFoundException::new);

        LocalDateTime orderDate = LocalDateTime.now();
        OrderStatus orderStatus = OrderStatus.ORDER;

        Order order = Order.createOrder(user, orderDate, orderStatus);
        order = orderRepository.save(order);

        for (OrderDto orderDto : orderDtoList) {
            List<Long> productIds = orderDto.getProductIds();
            List<Integer> counts = orderDto.getCounts();

            for (int i = 0; i < productIds.size(); i++) {
                Long productId = productIds.get(i);
                Integer count = counts.get(i);

                Product product = productRepository.findById(productId)
                        .orElseThrow(EntityNotFoundException::new);

                OrderDetail orderDetail = OrderDetail.createOrderDetail(order, product, count);
                orderDetailRepository.save(orderDetail);
            }
        }

        return order.getId();
    }



    @Transactional
    public Long delivery(DeliveryDto deliveryDto, Long orderId) {
        // 주문에 대한 배송 정보가 이미 존재하는지 확인
        if (deliveryRepository.existsByOrder_Id(orderId)) {
            throw new IllegalStateException("이 주문에 대한 배송 정보가 이미 존재합니다.");
        }

        // 주문 조회
        Order order = orderRepository.findById(orderId)
                .orElseThrow(EntityNotFoundException::new);

        // 배송 정보 생성
        Delivery delivery = new Delivery();
        delivery.setOrder(order); // 주문 객체 설정
        delivery.setReceiverName(deliveryDto.getReceiverName());
        delivery.setReceiverPhone(deliveryDto.getReceiverPhoneNumber());
        delivery.setDeliveryReq(deliveryDto.getDeliveryReq());
        delivery.setReceiverAddr(deliveryDto.getReceiverAddr());
        delivery.setReceiverPost(deliveryDto.getReceiverPost());
        delivery.setReceiverAddrDtl(deliveryDto.getReceiverAddrDtl());
        delivery.setTotalPrice(deliveryDto.getTotalPrice());

        // 배송 정보 저장
        deliveryRepository.save(delivery);

        return delivery.getId();
    }

    public DeliveryDto getAddressByOrderId(Long orderId) {
        // 주문 ID로 배송 정보를 조회합니다.
        Delivery delivery = deliveryRepository.findByOrderId(orderId)
                .orElseThrow(() -> new EntityNotFoundException("주문 ID에 해당하는 배송 정보를 찾을 수 없습니다: " + orderId));

        DeliveryDto deliveryDto = new DeliveryDto();
        deliveryDto.setOrderId(delivery.getOrder().getId()); // 주문 ID 설정
        deliveryDto.setReceiverName(delivery.getReceiverName());
        deliveryDto.setReceiverPhoneNumber(delivery.getReceiverPhone()); // 문자열로 변환
        deliveryDto.setDeliveryReq(delivery.getDeliveryReq());
        deliveryDto.setReceiverAddr(delivery.getReceiverAddr());
        deliveryDto.setReceiverPost(delivery.getReceiverPost());
        deliveryDto.setReceiverAddrDtl(delivery.getReceiverAddrDtl());
        deliveryDto.setTotalPrice(delivery.getTotalPrice()); // totalPrice 설정

        return deliveryDto;
    }




    /* 주문 수정(회원) - 배송지 */
    @Transactional
    public boolean updateDeliveryInfo(Long orderId, DeliveryDto deliveryDto) {
        return orderRepository.findById(orderId)
                .map(order -> {
                    Delivery delivery = order.getDelivery();
                    if (delivery == null) {
                        delivery = new Delivery();
                        delivery.setOrder(order);
                    }
                    delivery.setReceiverName(deliveryDto.getReceiverName());
                    delivery.setReceiverPhone(deliveryDto.getReceiverPhoneNumber());
                    delivery.setDeliveryReq(deliveryDto.getDeliveryReq());
                    deliveryRepository.save(delivery);
                    return true; // 주문이 존재하고 배송 정보가 업데이트된 경우 true 반환
                })
                .orElse(false); // 주문이 존재하지 않는 경우 false 반환
    }

    /* 주문 취소(회원) */
    @Transactional
    public boolean cancelOrder(Long orderId){
        return orderRepository.findById(orderId)
                .map(order -> {
                    order.cancelOrder();
                    orderRepository.save(order);
                    return true;
                })
                .orElse(false);
    }


}