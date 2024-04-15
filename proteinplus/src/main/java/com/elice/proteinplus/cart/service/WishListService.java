package com.elice.proteinplus.cart.service;

import com.elice.proteinplus.cart.entity.WishList;
import com.elice.proteinplus.cart.repository.WishListRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class WishListService {

    private final WishListRepository wishListRepository;


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
}
