package com.elice.proteinplus.product.controller;

import com.elice.proteinplus.product.dto.ProductCreateDto;
import com.elice.proteinplus.product.entity.Product;
import com.elice.proteinplus.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
@Slf4j
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
    public void updateProduct(@PathVariable("productId") Long productId, @RequestBody ProductCreateDto productCreateDto){
        productCreateDto.setId(productId);
        productService.updateProduct(productCreateDto);
    }

    //상품 삭제
    @DeleteMapping("/admin/delete/{productId}")
    public void deleteProduct(@PathVariable("categoryId") Long productId){
        productService.deleteProduct(productId);
    }

    //카테고리별 상품 조회(정렬)
    @GetMapping("/list/{categoryId}")
    public Page<Product> getAllProductsByCategoryIdAndSortedBy(
            @PathVariable Long categoryId,
            @RequestParam(required = false, defaultValue = "uploadDateDesc") String orderBy,
            Pageable pageable
    ){
        return productService.findAllByCategoryIdAndSortedBy(categoryId, pageable, orderBy);
    }

    @GetMapping("/{productId}")
    public Product getProductById(@PathVariable("productId") Long productId) {
        return productService.getProductById(productId);
    }


    /************************ react에서 사용중인 코드 *********************************/

    //카테고리 id별 상품 조회
    @GetMapping("/test/{categoryId}")
    public List<Product> getProduct(@PathVariable("categoryId") Long categoryId){

        List<Product> products = productService.findProductByCategoryId(categoryId);
        return products;
    }
    //전체 상품 조회 < 품절 상품 제외 >
    @GetMapping("test/sell")
    public List<Product> getSellProducts() {

        List<Product> sellProducts = productService.findSellProducts();
        return sellProducts;
    }


    //상품 조회 < 품절 상품 제외 >
    @GetMapping("/test/sell/{categoryId}")
    public List<Product> getSellProduct(@PathVariable("categoryId") Long categoryId) {

        List<Product> sellProducts = productService.findSellProduct(categoryId);
        return sellProducts;
    }

    //카테고리 id에 해당하는 상품의 수
    @GetMapping("/count/{categoryId}")
    public Long countByCategoryId(@PathVariable("categoryId") Long categoryId) {
        return productService.countByCategoryId(categoryId);
    }

    //카테고리 id 상품 중 판매중인 상품의 수
    @GetMapping("/count/sell/{categoryId}")
    public Long countBySellCategoryId(@PathVariable("categoryId") Long categoryId) {
        return productService.countBySellCategoryId(categoryId);
    }
}
