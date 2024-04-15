package com.elice.proteinplus.admin.filter;

import com.elice.proteinplus.admin.service.AdminTokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.core.context.SecurityContextHolder;

import java.io.IOException;

@RequiredArgsConstructor
public class AdminAutoFilter extends OncePerRequestFilter {
    private final AdminTokenService adminTokenService;

    public void doFilterInternal(
            HttpServletRequest request
            , HttpServletResponse response
            , FilterChain filterChain
    ) throws IOException, ServletException {
        String headerToken = request.getHeader("Authorization");
        if (headerToken != null && headerToken.startsWith("Bearer ")){
            headerToken = headerToken.substring(7);
            if (adminTokenService.validateToken(headerToken)) {
                adminTokenService.authUserFromToken(headerToken);
            }
        }

        filterChain.doFilter(request, response);
    }

}
