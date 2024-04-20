package com.elice.proteinplus.cart.service;

import com.elice.proteinplus.cart.entity.WishList;
import com.elice.proteinplus.cart.repository.WishListRepository;
import com.elice.proteinplus.product.entity.Product;
import com.elice.proteinplus.product.service.ProductService;
import com.elice.proteinplus.user.Service.UserJoinService;
import com.elice.proteinplus.user.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class WishListService {

    private final WishListRepository wishListRepository;
    private final UserJoinService userService;
    private final ProductService productService;

    public void addProductToWishList(Long userId, Long productId) {
        log.info("Add Product to WishList: userId={}, productId={}", userId, productId);

        User user = userService.getUserById(userId); // 사용자 정보 조회
        Product product = productService.getProductById(productId);// 상품 정보 조회

        // WishList 엔티티 생성 및 저장
        WishList wishList = new WishList();
        wishList.setUser(user);
        wishList.setProduct(product);
        wishListRepository.save(wishList);
    }

    // userId를 기준으로 해당하는 Product의 ID 목록을 반환
    public List<Long> findProductIdsByUserId(Long userId) {
        return wishListRepository.findProductIdsByUserId(userId);
    }

    public int deleteWishListsByUserId(Long userId) {
        return wishListRepository.deleteByUserId(userId);
    }

    public void deleteSelectedWishListByIds(Long userId, Long productId) {
        log.info("WishListService in deleteSelectedWishListByIds");
        int check = wishListRepository.deleteSelectedByIds(userId, productId);
    }


    public Long findIdByProductIdAndUserId(Long productId, Long userId) {
        // 해당 상품 ID가 위시리스트에 있는지 확인
        return wishListRepository.findIdByProductIdAndUserId(productId, userId);
    }
}
