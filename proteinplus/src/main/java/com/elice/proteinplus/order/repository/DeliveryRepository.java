package com.elice.proteinplus.order.repository;

import com.elice.proteinplus.order.entity.Delivery;
import com.elice.proteinplus.order.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;


public interface DeliveryRepository extends JpaRepository<Delivery, Long> {

}
