package com.elice.proteinplus.user.entity;

import com.elice.proteinplus.order.entity.Order;
import com.elice.proteinplus.order.entity.OrderDetail;
import com.elice.proteinplus.user.dto.JoinUserDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "login_id", nullable = false)
    private String loginId;

    @Column(name = "login_pwd", nullable = false)
    private String loginPwd;

    @Column(name = "name")
    private String name;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "phone")
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

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Order> orders = new ArrayList<>();

    public void create(JoinUserDTO joinUserDTO){
        this.loginId = joinUserDTO.getLoginId();
        this.loginPwd = joinUserDTO.getLoginPwd();
        this.email = joinUserDTO.getEmail();
    }
}
