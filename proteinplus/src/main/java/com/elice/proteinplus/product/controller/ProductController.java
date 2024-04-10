package com.elice.proteinplus.product.controller;

import com.elice.proteinplus.product.dto.ProductCreateDto;
import com.elice.proteinplus.product.entity.Product;
import com.elice.proteinplus.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    //상품 등록 페이지, 상품 수정 페이지 -> 프론트에서

    //상품 등록
    @PostMapping("/admin/add")
    public Long createProduct(@RequestBody ProductCreateDto productCreateDto){
        return productService.createProduct(productCreateDto);
    }

    //상품 수정
    @PutMapping("/admin/edit/{productId}")
    public void updateProduct(@PathVariable Long productId, @RequestBody ProductCreateDto productCreateDto){
        productCreateDto.setId(productId);
        productService.updateProduct(productCreateDto);
    }

    //상품 삭제
    @DeleteMapping("/admin/delete/{productId}")
    public void deleteProduct(@PathVariable Long productId){
        productService.deleteProduct(productId);
    }

    //카테고리별 상품 조회(정렬)
    @GetMapping("/list")
    public Page<Product> getAllProductsByCategoryIdAndSortedBy(
            @RequestParam Long categoryId,
            @RequestParam(required = false, defaultValue = "sales") String orderBy,
            Pageable pageable
    ){
        return productService.findAllByCategoryIdAndSortedBy(categoryId, pageable, orderBy);
    }

    @GetMapping("/count/{categoryId}")
    public Long countByCategoryId(@PathVariable Long categoryId) {
        return productService.countByCategoryId(categoryId);
    }

    @GetMapping("/includingSoldOut")
    public Page<Product> findAllIncludingSoldOut(Pageable pageable) {
        return productService.findAllIncludingSoldOut(pageable);
    }

    @GetMapping("/excludingSoldOut")
    public Page<Product> findAllExcludingSoldOut(Pageable pageable) {
        return productService.findAllExcludingSoldOut(pageable);
    }

    @GetMapping("/{productId}")
    public Product getProductById(@PathVariable Long productId) {
        return productService.getProductById(productId);
    }
}
