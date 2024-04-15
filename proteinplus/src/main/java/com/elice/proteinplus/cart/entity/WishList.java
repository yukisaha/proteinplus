package com.elice.proteinplus.cart.entity;

import com.elice.proteinplus.product.entity.Product;
import com.elice.proteinplus.user.entity.User;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class WishList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false) // NotNull 제약 조건 추가
    @JoinColumn(name = "user_id", nullable = false) // NotNull 제약 조건 추가
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false) // NotNull 제약 조건 추가
    @JoinColumn(name = "product_id", nullable = false) // NotNull 제약 조건 추가
    private Product product;
}