package com.elice.proteinplus.jwt.token;

import com.elice.proteinplus.jwt.token.dto.TokenInfo;
import com.elice.proteinplus.jwt.token.dto.TokenValidationResult;
import com.elice.proteinplus.user.entity.UserPrinciple;
import com.elice.proteinplus.user.entity.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
public class TokenProvider {

    private static final String AUTHORITIES_KEY = "auth";
    private static final String TOKEN_ID_KEY = "tokenId";
    private static final String USERNAME_KEY = "username";


    private final Key hashKey;
    private final long accessToKenValidationInMilliseconds;

    public TokenProvider(String secret, long accessToKenValidationInMilliseconds){
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.hashKey = Keys.hmacShaKeyFor(keyBytes);
        this.accessToKenValidationInMilliseconds = accessToKenValidationInMilliseconds;
    }

    public TokenInfo createToken(User users) {
        long currentTime = (new Date()).getTime();
        Date accessTokenExpireTime = new Date(currentTime + accessToKenValidationInMilliseconds);
        String tokenId = UUID.randomUUID().toString();

        String accessToken = Jwts.builder()
                .setSubject(users.getLoginId())
                .claim(AUTHORITIES_KEY, users.getRole())
                .claim(USERNAME_KEY, users.getUsername())
                .claim(TOKEN_ID_KEY, tokenId)
                .signWith(hashKey, SignatureAlgorithm.HS512)
                .setExpiration(accessTokenExpireTime)
                .compact();

        return TokenInfo.builder()
                .ownerLoginId(users.getLoginId())
                .tokenId(tokenId)
                .accessToken(accessToken)
                .accessTokenExpireTime(accessTokenExpireTime)
                .build();
    }

    //토큰 검증
    public TokenValidationResult validateToken(String token) {
        try{
            Claims claims = Jwts.parserBuilder().setSigningKey(hashKey).build().parseClaimsJws(token).getBody();
            return new TokenValidationResult(TokenStatus.TOKEN_VALID, TokenType.ACCESS, claims.get(TOKEN_ID_KEY, String.class), claims);
        }catch (ExpiredJwtException e){
            log.info("완료된 JWT 토큰");
            Claims claims = e.getClaims();
            return new TokenValidationResult(TokenStatus.TOKEN_VALID, TokenType.ACCESS, claims.get(TOKEN_ID_KEY, String.class), null);
        }catch (SecurityException | MalformedJwtException e){
            log.info("잘못된 JWT 서명");
            return new TokenValidationResult(TokenStatus.TOKEN_WRONG_SIGNATURE, null, null, null);
        }catch (UnsupportedJwtException e){
            log.info("지원되지 않는 JWT 서명");
            return new TokenValidationResult(TokenStatus.TOKEN_HASH_NOT_SUPPORTED, null, null, null);
        }catch (IllegalArgumentException e){
            log.info("잘못된 JWT 토큰");
                return new TokenValidationResult(TokenStatus.TOKEN_WRONG_SIGNATURE, null, null, null);
        }
    }

    public Authentication getAuthentication(String token, Claims claims) {
        Collection<? extends GrantedAuthority> authorities = Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                .map((SimpleGrantedAuthority::new))
                .collect(Collectors.toList());

        UserPrinciple principle = new UserPrinciple(claims.getSubject(), claims.get(USERNAME_KEY, String.class), authorities);

        return new UsernamePasswordAuthenticationToken(principle, token, authorities);
    }

    private TokenValidationResult getExpiredTokenValidationResult(ExpiredJwtException e) {
        Claims claims = e.getClaims();
        return new TokenValidationResult(TokenStatus.TOKEN_EXPIRED, TokenType.ACCESS, claims.get(TOKEN_ID_KEY, String.class), null);
    }


}
