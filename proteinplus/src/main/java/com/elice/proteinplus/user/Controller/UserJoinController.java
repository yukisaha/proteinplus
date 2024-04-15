package com.elice.proteinplus.user.Controller;

import com.elice.proteinplus.user.Service.UserJoinService;
import com.elice.proteinplus.user.dto.UserJoinDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.elice.proteinplus.user.entity.User;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/member/join")
@RestController
@RequiredArgsConstructor
@Slf4j
public class UserJoinController {

    private final UserJoinService userService;

    //회원가입
    @PostMapping
    public User join(UserJoinDTO joinUserDTO){

        User joinUser = userService.join(joinUserDTO);
        return joinUser;
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

}
