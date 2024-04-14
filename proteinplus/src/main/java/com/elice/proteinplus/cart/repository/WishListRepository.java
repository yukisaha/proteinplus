package com.elice.proteinplus.cart.repository;

import com.elice.proteinplus.cart.entity.WishList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WishListRepository extends JpaRepository<WishList, Long> {

    // userId를 기준으로 해당하는 Product의 ID 목록을 반환
    @Query("SELECT w.product.id FROM WishList w WHERE w.id = :userId")
    List<Long> findProductIdsByUserId(@Param("userId") Long userId);

    void deleteById(Long id);

}
