package com.elice.proteinplus.jwt.config;

import com.elice.proteinplus.jwt.JwtAccessDeniedHandler;
import com.elice.proteinplus.jwt.JwtAuthenticationEntryPoint;
import com.elice.proteinplus.jwt.JwtProperties;
import com.elice.proteinplus.jwt.token.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;

@Configuration
@RequiredArgsConstructor
@EnableConfigurationProperties(JwtProperties.class)
@Slf4j
public class JwtConfig {

    @Bean
    public TokenProvider tokenProvider (@Qualifier("jwtProperties") JwtProperties jwtProperties) {
        return new TokenProvider(jwtProperties.getSecret(), jwtProperties.getAccessTokenValidityInSeconds());
    }

    @Bean
    public JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint() {
        return new JwtAuthenticationEntryPoint();
    }

    @Bean
    public JwtAccessDeniedHandler jwtAccessDeniedHandler() {
        return new JwtAccessDeniedHandler();
    }
}
