package com.elice.proteinplus.user.entity;

import com.elice.proteinplus.user.dto.UserJoinDTO;
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

    @Column(name = "login_pwd", nullable = false)
    private String loginPwd;

    @Column(name = "name", nullable = false)
    private String name;

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


    public void create(UserJoinDTO joinUserDTO){
        this.name = joinUserDTO.getName();
        this.nickname = joinUserDTO.getNickname();
        this.loginId = joinUserDTO.getLoginId();
        this.loginPwd = joinUserDTO.getLoginPwd();
        this.phone = joinUserDTO.getPhone();
        this.email = joinUserDTO.getEmail();
    }
}
