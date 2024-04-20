package com.elice.proteinplus.user.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserUpdateDTO {

    private String loginPwd;
    private String nickname;
    private String address;
    private String detailAddress;
//    private LocalDate birth;

}
