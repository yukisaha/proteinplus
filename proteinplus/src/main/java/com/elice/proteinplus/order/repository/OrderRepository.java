package com.elice.proteinplus.order.repository;

import com.elice.proteinplus.order.entity.Order;
import com.elice.proteinplus.order.entity.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

//JPA로 주문 이력을 조회
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    //모든 주문 상태 주문 목록 조회 (관리자)
    @Query("SELECT o FROM Order o WHERE o.user.id = :userId ORDER BY o.orderDate desc")
    List<Order> findByUserId(Long userId, Pageable pageable);

    // 주문 상태가 CANCEL인 주문 목록 조회 (회원)
    @Query("SELECT o FROM Order o WHERE o.user.id = :userId AND o.orderStatus = 'CANCEL' ORDER BY o.orderDate desc")
    List<Order> findByUserIdCancelList(Long userId, Pageable pageable);

    // 주문 상태가 CANCEL이 아닌 주문 목록 조회 (회원)
    @Query("SELECT o FROM Order o WHERE o.user.id = :userId AND o.orderStatus != 'CANCEL' ORDER BY o.orderDate desc")
    List<Order> findByUserIdOrderList(Long userId, Pageable pageable);

}
