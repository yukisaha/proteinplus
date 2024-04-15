package com.elice.proteinplus.user.Controller;

import com.elice.proteinplus.user.Service.UserJoinService;
import com.elice.proteinplus.user.dto.JoinUserDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.elice.proteinplus.user.entity.User;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/member/join")
@RestController
@RequiredArgsConstructor
@Slf4j
public class JoinUserController {

    private final UserJoinService userService;

    //회원가입
    @PostMapping
    public User join(JoinUserDTO joinUserDTO){

        User joinUser = userService.join(joinUserDTO);
        return joinUser;
    }

    //아이디 중복체크
    @GetMapping("/idDuplicateCheck")
    public boolean idDuplicateCheck(@RequestParam String loginId){
        return userService.idDuplicateCheck(loginId);
    }

    //이메일 중복체크
    //해당 이메일로 가입된 계정이 있습니다
    @GetMapping("emailDuplicateCheck")
    public boolean emailDuplicateCheck(@RequestParam String email){
        return userService.emailDuplicateCheck(email);
    }

}
