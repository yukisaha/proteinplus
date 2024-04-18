package com.elice.proteinplus.cart.controller;

import com.elice.proteinplus.product.entity.Product;
import com.elice.proteinplus.user.Service.UserJoinService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/mypage")
@Slf4j
public class MypageController {

    private final UserJoinService userService;

    @GetMapping
    public String getUserNameFromToken(@RequestHeader("Authorization") String token){
            // JWT 디코딩하여 사용자 ID 추출
            log.info("getUserNameFromToken token : "+token);

            // username 가져오기
            return userService.getUserNameFromToken(token);
        }
}
