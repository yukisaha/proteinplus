package com.elice.proteinplus.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(
        info = @Info(title = "ProteinPlus",
                description = "ProteinPlus API 관리",
                version = "v1"))
@RequiredArgsConstructor
@Configuration
public class SwaggerConfig {


    @Bean
    public GroupedOpenApi chatOpenApi() {
        String[] paths = {"/v1/**","/admin/category/**", "/test"};

        return GroupedOpenApi.builder()
                .group("ProteinPlus v1")
                .pathsToMatch(paths)
                .build();
    }


}