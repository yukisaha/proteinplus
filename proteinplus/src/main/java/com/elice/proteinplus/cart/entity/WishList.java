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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;
}