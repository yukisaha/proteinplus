package com.elice.proteinplus.order.repository;

import com.elice.proteinplus.order.entity.Delivery;
import com.elice.proteinplus.order.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
    boolean existsByOrder_Id(Long orderId);

    Optional<Delivery> findByOrderId(Long orderId);

}
