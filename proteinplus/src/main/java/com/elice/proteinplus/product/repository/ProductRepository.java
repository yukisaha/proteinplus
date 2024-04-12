package com.elice.proteinplus.product.repository;

import com.elice.proteinplus.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // 판매량(주문테이블에서 받아올것임)순 정렬
//    @Query("SELECT p FROM Product p LEFT JOIN p.orders o WHERE p.category.id = :categoryId OR p.category.parent.id = :categoryId GROUP BY p ORDER BY COUNT(o) DESC")
//    Page<Product> findAllByCategoryIdOrderBySales(Pageable pageable, @Param("categoryId") Long categoryId);

    //높은가격순
//    @Query("SELECT p FROM Product p JOIN p.category c WHERE c.id = :categoryId OR c.parent.id = :categoryId ORDER BY p.finalPrice ASC")
//    Page<Product> findAllByCategoryIdOrderByFinalPriceAsc(Pageable pageable, @Param("categoryId") Long categoryId);
//
//    //낮은가격순
//    @Query("SELECT p FROM Product p JOIN p.category c WHERE c.id = :categoryId OR c.parent.id = :categoryId ORDER BY p.finalPrice DESC")
//    Page<Product> findAllByCategoryIdOrderByFinalPriceDesc(Pageable pageable, @Param("categoryId") Long categoryId);

    //신상품순
    @Query("SELECT p FROM Product p JOIN p.category c WHERE c.id = :categoryId OR c.parent.id = :categoryId ORDER BY p.uploadDate DESC")
    Page<Product> findAllByCategoryIdOrderByUploadDateDesc(Pageable pageable, @Param("categoryId") Long categoryId);

    //할인율순
    @Query("SELECT p FROM Product p JOIN p.category c WHERE c.id = :categoryId OR c.parent.id = :categoryId ORDER BY p.discountRate DESC")
    Page<Product> findAllByCategoryIdOrderByDiscountRateDesc(Pageable pageable, @Param("categoryId") Long categoryId);

    Page<Product> findAllByCategoryId(Pageable pageable, Long categoryId);

    //카테고리 상품 총 개수
    //Long countByCategoryId(Long categoryId);

    //품절포함
//    @Query("SELECT p FROM Product p")
//    Page<Product> findAllIncludingSoldOut(Pageable pageable);
//
//    //품절 제외
//    @Query("SELECT p FROM Product p WHERE p.productStatus = 'sell'")
//    Page<Product> findAllExcludingSoldOut(Pageable pageable);


    /************************ react에서 사용중인 코드 *********************************/
    //카테고리 id 별 상품 조회
    @Query("SELECT p FROM Product p JOIN p.category c WHERE c.id = :categoryId OR c.parent.id = :categoryId")
    List<Product> findProductByCategoryId(Long categoryId);

    //상품 조회 < 품절 상품 제외 >
    @Query("SELECT p FROM Product p JOIN p.category c WHERE (c.id = :categoryId OR c.parent.id = :categoryId) AND p.productStatus = 'sell'")
    List<Product> findSellProduct(Long categoryId);

    //카테고리 상품 총 개수
    @Query("SELECT count(p.id) FROM Product p JOIN p.category c WHERE c.id = :categoryId OR c.parent.id = :categoryId")
    Long countByCategoryId(Long categoryId);

    //카테고리 id 상품 중 판매중인 상품의 수
    @Query("SELECT count(p.id) FROM Product p JOIN p.category c WHERE (c.id = :categoryId OR c.parent.id = :categoryId) AND p.productStatus = 'sell'")
    Long countBySellCategoryId(Long categoryId);

}
