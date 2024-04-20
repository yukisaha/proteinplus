package com.elice.proteinplus.admin.controller;


import com.elice.proteinplus.admin.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {

    private final AdminService adminService;


    @GetMapping("")
    public String loginAdmin(){
        return "admin"; /* React 빌드 필요*/
    }

    @GetMapping("/add/product")
    public String getAddProductPage(){
        return "submitProduct"; /* React 빌드 필요*/
    }

//    @PostMapping("/add")
//    public String postProduct(@ModelAttribute ProductCreateDTO productCreateDTO){
//        ProductCreateDTO res = adminService.createProduct(productCreateDTO);
//        if (res == null) {
//            return "error";
//        }
//        return "null"; /* React 빌드 필요*/
//    }




}
