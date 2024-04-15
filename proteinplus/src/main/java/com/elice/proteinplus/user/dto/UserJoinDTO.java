package com.elice.proteinplus.user.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserJoinDTO {

    //회원가입시 필요한 정보
    private String name;
    private String nickname;
    private String loginId;
    private String loginPwd;
    private int phone;
    private String email;
}
