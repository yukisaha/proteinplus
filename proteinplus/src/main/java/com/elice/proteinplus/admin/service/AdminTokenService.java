package com.elice.proteinplus.admin.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class AdminTokenService {

    private final String testKey = "key123"; // TODO: .gitignore 된 파일로 키 옮겨서 `@Value(${jwt.secret})`로 호출

    private DecodedJWT generateDecodedJWT(String token){
        Algorithm algorithm = Algorithm.HMAC256(testKey);
        return JWT.require(algorithm).build().verify(token);
    }

    public String generateToken(String username) {
        Algorithm algorithm = Algorithm.HMAC256(testKey);
        return JWT.create()
                .withSubject(username)
                .withExpiresAt(new Date(System.currentTimeMillis() + 60*60*1000))
                .sign(algorithm);
    }

    public boolean validateToken(String token) {
        try {
            generateDecodedJWT(token);
            return true;
        } catch (JWTVerificationException exception) {
            return false;
        }
    }

    public void authUserFromToken(String token) {
        try {
            String username = generateDecodedJWT(token).getSubject();
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    username, null, Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN")));

            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        } catch (Exception e) { // 인증 실패
            SecurityContextHolder.clearContext();
            throw new RuntimeException("Authentication failed", e);
        }
    }
}
