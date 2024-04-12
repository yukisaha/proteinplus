package com.elice.proteinplus.admin.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminDTO {
    /*
     * TODO
     * 변수명 ERD 일치시키기
     */
    private Long id;
    private String adminId;
    private String adminPwd;
}
