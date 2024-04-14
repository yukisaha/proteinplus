package com.elice.proteinplus.user.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "login_id", nullable = false)
    private String loginId;

    @Column(name = "login_pwd",nullable = false)
    private String loginPwd;

    @Column(nullable = false)
    private String name;

    private String nickname;

    @Column(nullable = false)
    private int phone;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private LocalDate birth;

    @Column(nullable = false)
    private String address;

    @Column(name = "detail_address",nullable = false)
    private String detailAddress;

    @Column(name = "is_delete",nullable = false, columnDefinition = "varchar(1) default 'N'")
    private String isDelete = "N";
}
