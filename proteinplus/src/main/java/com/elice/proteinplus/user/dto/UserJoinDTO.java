package com.elice.proteinplus.user.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserJoinDTO {

    //회원가입 시 필요한 정보
    private String name;
    private String nickname;
    private String loginId;
    private String loginPwd;
    private String phone;
    private String email;
}
