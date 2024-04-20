package com.elice.proteinplus.user.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserLoginDTO {

    //로그인 시 필요한 정보
    private String LoginId;
    private String LoginPwd;
}
