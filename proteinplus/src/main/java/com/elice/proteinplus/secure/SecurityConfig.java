package com.elice.proteinplus.secure;

import com.elice.proteinplus.admin.filter.AdminAutoFilter;
import com.elice.proteinplus.admin.service.AdminTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CorsConfig corsConfig;
    private final AdminTokenService adminTokenService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        AdminAutoFilter adminAutoFilter = new AdminAutoFilter(adminTokenService);

        return http
                .csrf(AbstractHttpConfigurer::disable)
                .addFilter(corsConfig.corsFilter())
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(
                                "/"
                                , "/cart"
                                , "/mypageFrame"
                                , "/wishList"
                                , "/product/**"
                                , "/order"
                                , "/orderDetail"
                                , "/cancelDetail"
                                , "/api/v1/**"
                        ).permitAll()
                        .requestMatchers("/admin/**").hasRole(Role.ADMIN.name())
                        .anyRequest().permitAll() // .authenticated()
                )
                .sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(adminAutoFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilter(adminAutoFilter)
                .formLogin(AbstractHttpConfigurer::disable) // JWT 필터 사용을 위해 로그인폼 비활성
                .httpBasic(AbstractHttpConfigurer::disable)
                .logout(logout->logout
                        .logoutSuccessUrl("/")
                )
                .exceptionHandling(exceptionHandling -> exceptionHandling
                        .accessDeniedHandler(accessDeniedHandler()))
                .build();

    }

    private AccessDeniedHandler accessDeniedHandler() {
        return (request, response, accessDeniedException) -> {
            response.sendRedirect("/"); // 접근거부 리다이렉트 주소
        };
    }
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
