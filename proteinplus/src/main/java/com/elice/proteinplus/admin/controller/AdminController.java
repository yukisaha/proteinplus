package com.elice.proteinplus.admin.controller;


import com.elice.proteinplus.admin.dto.AdminDTO;
import com.elice.proteinplus.admin.dto.AdminJwtToken;
import com.elice.proteinplus.admin.service.AdminTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
public class AdminController {

    private final AuthenticationManager authenticationManager;
    private final AdminTokenService adminTokenService;





    // TODO: throw로 처리해야하는가, if문으로 처리해서 ResponseEntity를 4XX로 해야하는가
    @PostMapping("/api/v1/admin")
    public ResponseEntity<?> createAuthToken(@RequestBody AdminDTO adminDTO) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(adminDTO.getAdminId(), adminDTO.getAdminPwd())
            );
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect login info", e);
        }

        return ResponseEntity.ok(new AdminJwtToken(adminTokenService.generateToken(adminDTO.getAdminId())));
    }

    @GetMapping("/api/v1/protected")
    public ResponseEntity<?> accessProtectedResource(@RequestHeader("Authorization") String token) {
        boolean isValidToken = adminTokenService.validateToken(token);
        if (isValidToken) {
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Token");
        }
    }

    @GetMapping("/admin/product/add")
    public String getAddProductPage(){
        return "submitProduct"; /* React 빌드 필요*/
    }

}
