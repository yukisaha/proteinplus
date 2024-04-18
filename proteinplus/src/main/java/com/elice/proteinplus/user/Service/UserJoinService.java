package com.elice.proteinplus.user.Service;

import com.elice.proteinplus.jwt.JwtFilter;
import com.elice.proteinplus.jwt.token.TokenProvider;
import com.elice.proteinplus.jwt.token.dto.TokenInfo;
import com.elice.proteinplus.user.entity.Role;
import com.elice.proteinplus.user.entity.User;
import com.elice.proteinplus.user.Repository.UserJoinRepository;
import com.elice.proteinplus.user.dto.UserJoinDTO;
import io.jsonwebtoken.Claims;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.OptionalLong;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserJoinService {

    private static final String PASSWORD_REGEX = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@S!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,}$";
    private static final Pattern PASSWORD_PATTERN = Pattern.compile(PASSWORD_REGEX);

    private final UserJoinRepository userJoinRepository;

    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final JwtFilter jwtFilter;

    //회원가입
    //비밀번호 암호화
    //권한 등록
    public User join(UserJoinDTO joinUserDTO){

        checkPasswordStrength(joinUserDTO.getLoginPwd());

        User user = User.builder()
                .loginId(joinUserDTO.getLoginId())
                .loginPwd(passwordEncoder.encode(joinUserDTO.getLoginPwd()))
                .name(joinUserDTO.getName())
                .nickname(joinUserDTO.getNickname())
                .phone(joinUserDTO.getPhone())
                .email(joinUserDTO.getEmail())
                .role(Role.ROLE_USER)
                .build();

        return userJoinRepository.save(user);
    }

    //비밀번호 정책 조건 체크
    private void checkPasswordStrength(String loginPwd){
        if (PASSWORD_PATTERN.matcher(loginPwd).matches()) {
            return;
        }

        log.info("비밀번호 정책 미달");
        throw new IllegalArgumentException("비밀번호는 최소 8자리에 영어, 숫자, 특수문자를 포함해야 합니다.");
    }

    //아이디 중복체크
    public boolean idDuplicateCheck(String loginId){
        return userJoinRepository.existsByLoginId(loginId);
    }

    //이메일 중복체크
    public boolean emailDuplicateCheck(String email){
        return userJoinRepository.existsByEmail(email);
    }

    //전화번호 중복체크
    public boolean phoneDuplicateCheck(int phone){
        return userJoinRepository.existsByPhone(phone);
    }


    //로그인

    public TokenInfo login(String loginId, String loginPwd){
        try {
            User user = findUserByLoginId(loginId);

            checkPassword(loginPwd, user);

            return tokenProvider.createToken(user);
        }catch (IllegalArgumentException e){
            throw new IllegalArgumentException("계정이 존재하지 않거나 비밀번호가 잘못되었습니다");
        }
    }

    private void checkPassword(String loginPwd, User user){
        if (!passwordEncoder.matches(loginPwd, user.getLoginPwd())) {
            log.info("입력값 = {}", loginPwd);
            log.info("바뀐 비번 = {}", user.getLoginPwd());
            log.info("일치하지 않는 비밀번호");
            throw new BadCredentialsException("기존 비밀번호 확인에 실패하셨습니다");
        }
    }


    private User findUserByLoginId(String loginId){

        return userJoinRepository.findByLoginId(loginId).orElseThrow(() -> {
            log.info("로그인아이디 : {}" , loginId);
            log.info("계정이 존재하지 않습니다.");
            return new IllegalArgumentException("계정이 존재하지 않습니다.");
        });
    }

    public void delete(String loginId) {
        userJoinRepository.deleteByLoginId(loginId);
    }


    @Transactional(readOnly = true)
    public User getUserById(Long UserId) {
        return userJoinRepository.findById(UserId)
                .orElseThrow(() -> new EntityNotFoundException("유저을 찾을 수 없습니다. ID: " + UserId));
    }

    // 사용자 ID 추출 메서드
    public Long getUserIdFromToken(String token) {
        if (token != null) {
            Claims claims = tokenProvider.validateToken(token).getClaims();
            if (claims != null) {
                return userJoinRepository.findUserIdByLoginId(claims.getSubject());
            }
        }
        throw new UsernameNotFoundException("Unable to extract user ID from token");
    }


}
