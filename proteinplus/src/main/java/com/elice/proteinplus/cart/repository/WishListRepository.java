package com.elice.proteinplus.cart.repository;

import com.elice.proteinplus.cart.entity.WishList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WishListRepository extends JpaRepository<WishList, Long> {

    // userId를 기준으로 해당하는 Product의 ID 목록을 반환
    @Query("SELECT w.product.id FROM WishList w WHERE w.user.id = :userId")
    List<Long> findProductIdsByUserId(@Param("userId") Long userId);

    @Modifying //@Modifying 어노테이션은 해당 쿼리가 DML(데이터 조작 언어) 쿼리임을 나타낸다
    @Query("DELETE FROM WishList w WHERE w.user.id = :userId")
    int deleteByUserId(@Param("userId") Long userId); //쿼리 실행 이후 삭제된 행의 수를 반환

    @Modifying
    @Query("DELETE FROM WishList w WHERE w.user.id = :userId AND w.product.id = :productId")
    int deleteSelectedByIds(@Param("userId") Long userId, @Param("productId") Long productId);

    boolean existsByProductId(Long productId);
}
