package com.elice.proteinplus.admin.domain;

import com.elice.proteinplus.secure.Role;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String adminId;
    private String adminPwd;
    private Role role;

    public Admin(String adminId, String adminPwd){
        this.adminId = adminId;
        this.adminPwd = adminPwd;
        this.role = Role.ADMIN;
    }
}
