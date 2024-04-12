package com.elice.proteinplus.product.service;

import com.elice.proteinplus.product.dto.ProductCreateDto;
import com.elice.proteinplus.product.entity.Product;
import com.elice.proteinplus.product.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    //상품 등록
    public Long createProduct(ProductCreateDto productCreateDto){
        Product product = productCreateDto.createProduct();
        productRepository.save(product);

        return product.getId();
    }

    //상푸 수정
    public void updateProduct(ProductCreateDto productCreateDto) {
        Product product = productRepository.findById(productCreateDto.getId())
                .orElseThrow(() -> new EntityNotFoundException("상품을 찾을 수 없습니다. ID: " + productCreateDto.getId()));

        product.updateProduct(productCreateDto); // 엔티티 업데이트
        productRepository.save(product); // 변경된 엔티티 저장
    }

    //상품 삭제
    public void deleteProduct(Long productId){
        productRepository.deleteById(productId);
    }

    //상품 정렬
    @Transactional(readOnly = true)
    public Page<Product> findAllByCategoryIdAndSortedBy(Long categoryId, Pageable pageable, String orderBy) {
        return switch (orderBy) {
//            case "sales" -> productRepository.findAllByCategoryIdOrderBySales(pageable, categoryId);
            case "priceAsc" -> productRepository.findAllByCategoryIdOrderByFinalPriceAsc(pageable, categoryId);
            case "priceDesc" -> productRepository.findAllByCategoryIdOrderByFinalPriceDesc(pageable, categoryId);
            case "uploadDateDesc" -> productRepository.findAllByCategoryIdOrderByUploadDateDesc(pageable, categoryId);
            case "discountRateDesc" -> productRepository.findAllByCategoryIdOrderByDiscountRateDesc(pageable, categoryId);
            default -> productRepository.findAllByCategoryId(pageable, categoryId);
        };
    }


    //카테고리 id에 해당하는 상품의 수
    @Transactional(readOnly = true)
    public Long countByCategoryId(Long categoryId) {
        return productRepository.countByCategoryId(categoryId);
    }

    @Transactional(readOnly = true)
    public Page<Product> findAllIncludingSoldOut(Pageable pageable) {
        return productRepository.findAllIncludingSoldOut(pageable);
    }

    @Transactional(readOnly = true)
    public Page<Product> findAllExcludingSoldOut(Pageable pageable) {
        return productRepository.findAllExcludingSoldOut(pageable);
    }

    //상품 상세 페이지로
    @Transactional(readOnly = true)
    public Product getProductById(Long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("상품을 찾을 수 없습니다. ID: " + productId));
    }

    // 장바구니에 있는 제품들을 가져오는 메소드
    public List<Product> getProductsInCartByIds(List<Long> ids) {
        return productRepository.findAllByIdIn(ids);
    }
}
