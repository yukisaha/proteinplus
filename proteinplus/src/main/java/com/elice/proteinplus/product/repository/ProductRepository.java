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
    List<Product> findProductByCategoryId(@Param("categoryId") Long categoryId);

    //랭크 카테고리에 있는 전체 상품 조회 < 품절 상품 제외 >
    //p.category의 id 또는 parent.id 값이 rank의 category.id 값과 일치한 는 경우 -< 해당 p를 출력
//    @Query("SELECT p FROM Product p JOIN p.category c WHERE p.productStatus = 'sell'")
//    List<Product> findSellProducts();

    @Query("SELECT p FROM Product p JOIN p.category c WHERE p.productStatus = 'sell' AND (c.id IN (SELECT r.category.id FROM RankCategory r) OR c.parent.id IN (SELECT r.category.id FROM RankCategory r))")
    List<Product> findSellProducts();

    //카테고리별 상품 조회 < 품절 상품 제외 >
    @Query("SELECT p FROM Product p JOIN p.category c WHERE (c.id = :categoryId OR c.parent.id = :categoryId) AND p.productStatus = 'sell'")
    List<Product> findSellProduct(@Param("categoryId") Long categoryId);

    //카테고리 상품 총 개수
    @Query("SELECT count(p.id) FROM Product p JOIN p.category c WHERE c.id = :categoryId OR c.parent.id = :categoryId")
    Long countByCategoryId(@Param("categoryId") Long categoryId);

    //카테고리 id 상품 중 판매중인 상품의 수
    @Query("SELECT count(p.id) FROM Product p JOIN p.category c WHERE (c.id = :categoryId OR c.parent.id = :categoryId) AND p.productStatus = 'sell'")
    Long countBySellCategoryId(@Param("categoryId") Long categoryId);

    // 장바구니에 있는 제품들을 조회하는 메소드
    List<Product> findAllByIdIn(List<Long> ids);
}
