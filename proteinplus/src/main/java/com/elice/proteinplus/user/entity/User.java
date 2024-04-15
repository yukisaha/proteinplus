package com.elice.proteinplus.user.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "login_id", nullable = false)
    private String loginId;

    @Column(name = "login_pwd", nullable = false)
    private String loginPwd;

    @Column(name = "name", nullable = false)
    private String username;

    @Column(name = "nickname", nullable = false)
    private String nickname;

    @Column(name = "phone", nullable = false, unique = true)
    private int phone;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "birth")
    private LocalDate birth;

    @Column(name = "address")
    private String address;

    @Column(name = "detail_address")
    private String detailAddress;

    @Column(name = "is_delete", nullable = false, columnDefinition = "varchar(1) default 'N'")
    private String isDelete = "N";

    @Enumerated(EnumType.STRING)
    private Role role;

    @Builder
    public User(String loginId, String loginPwd, String username, String nickname,
                int phone, String email, LocalDate birth, String address,
                String detailAddress, Role role){
        this.loginId = loginId;
        this.loginPwd = loginPwd;
        this.username = username;
        this.nickname = nickname;
        this.phone = phone;
        this.email = email;
        this.birth = birth;
        this.address = address;
        this.detailAddress = detailAddress;
        this.role = role;
    }
}
