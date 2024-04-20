package com.elice.proteinplus.jwt.token.dto;

import com.elice.proteinplus.jwt.token.TokenStatus;
import com.elice.proteinplus.jwt.token.TokenType;
import io.jsonwebtoken.Claims;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class TokenValidationResult {

    private TokenStatus tokenStatus;
    private TokenType tokenType;
    private String tokenId;
    private Claims claims;

    public String getLoginId() {
        if(claims == null){
            throw new IllegalArgumentException("Claim value is null");
        }

        return claims.getSubject();
    }

    public boolean isValid() {
        return TokenStatus.TOKEN_VALID == this.tokenStatus;
    }
}
