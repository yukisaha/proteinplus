package com.elice.proteinplus.user.Controller;

import com.elice.proteinplus.jwt.token.dto.TokenInfo;
import com.elice.proteinplus.user.Controller.json.ApiResponseJson;
import com.elice.proteinplus.user.Service.UserJoinService;
import com.elice.proteinplus.user.dto.UserJoinDTO;
import com.elice.proteinplus.user.dto.UserLoginDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.elice.proteinplus.user.entity.User;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/member")
@RestController
@RequiredArgsConstructor
@Slf4j
public class UserJoinController {

    private final UserJoinService userService;

    //회원가입
    @PostMapping("/join")
    public ApiResponseJson join(@RequestBody UserJoinDTO joinUserDTO){

        User joinUser = userService.join(joinUserDTO);
        return new ApiResponseJson(HttpStatus.OK, Map.of(
                "loginId", joinUser.getLoginId(),
                "username", joinUser.getName()
        ));
    }

    //아이디 중복체크
    @GetMapping("/idDuplicateCheck")
    public boolean idDuplicateCheck(@RequestParam String loginId){
        return userService.idDuplicateCheck(loginId);
    }

    //이메일 중복체크
    @GetMapping("/emailDuplicateCheck")
    public boolean emailDuplicateCheck(@RequestParam String email){
        return userService.emailDuplicateCheck(email);
    }

    //전화번호 중복체크
    @GetMapping("/phoneDuplicateCheck")
    public boolean phoneDuplicateCheck(@RequestParam int phone){
        return userService.phoneDuplicateCheck(phone);
    }


    @PostMapping("/auth/login")
    public ApiResponseJson login(@RequestBody UserLoginDTO userLoginDTO){

        log.info("컨트롤러 아이디 = {}", userLoginDTO.getLoginId());
        log.info("컨트롤러 비번 = {}", userLoginDTO.getLoginPwd());
        TokenInfo tokenInfo = userService.login(userLoginDTO.getLoginId(), userLoginDTO.getLoginPwd());
        log.info("Token issued: {}", tokenInfo);

        return new ApiResponseJson(HttpStatus.OK, tokenInfo);
    }


}
