package com.elice.proteinplus.user.entity;

import com.elice.proteinplus.order.entity.Order;
import com.elice.proteinplus.user.dto.UserUpdateDTO;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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
    private String name;

    @Column(name = "nickname", nullable = false)
    private String nickname;

    @Column(name = "phone", nullable = false, unique = true)
    private String phone;

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

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Order> orders = new ArrayList<>();


    @Builder
    public User(String loginId, String loginPwd, String name, String nickname,
                String phone, String email, LocalDate birth, String address,
                String detailAddress, Role role, String isDelete){
        this.loginId = loginId;
        this.loginPwd = loginPwd;
        this.name = name;
        this.nickname = nickname;
        this.phone = phone;
        this.email = email;
        this.birth = birth;
        this.address = address;
        this.detailAddress = detailAddress;
        this.role = role;
        this.isDelete = isDelete;
    }

    public void update(UserUpdateDTO userUpdateDTO){
        this.loginPwd = userUpdateDTO.getLoginPwd();
        this.nickname = userUpdateDTO.getNickname();
        this.address = userUpdateDTO.getAddress();
        this.detailAddress = userUpdateDTO.getDetailAddress();
    }

    public void setIsDelete(String isDelete) {
        this.isDelete = isDelete;
    }
}
