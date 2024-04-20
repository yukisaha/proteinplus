package com.elice.proteinplus.product.entity;

import com.elice.proteinplus.user.entity.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "review",
        uniqueConstraints = {@UniqueConstraint(columnNames = {"product_id", "user_id"})})
//동일상품에 대한 중복 리뷰 막아버리기
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "review_id")
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "user_id", nullable = false)
//    private User user;

    @Column(nullable = false)
    private int rating;

    @Column(name = "upload_date", nullable = false)
    private LocalDateTime uploadDate;

    @Column(nullable = false)
    private String content;

    //리뷰이미지는 시간남으면 하기...
    @Column(name = "review_image_url", length = 1000)
    private String reviewImageUrl;
}
