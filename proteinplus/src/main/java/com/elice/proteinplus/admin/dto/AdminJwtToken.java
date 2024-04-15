package com.elice.proteinplus.admin.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminJwtToken {
    private final String token;
}
