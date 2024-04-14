package com.elice.proteinplus.cart.service;

import com.elice.proteinplus.cart.entity.WishList;
import com.elice.proteinplus.cart.repository.WishListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WishListService {

    private final WishListRepository wishListRepository;


    // userId를 기준으로 해당하는 Product의 ID 목록을 반환
    public List<Long> findProductIdsByUserId(Long userId) {
        return wishListRepository.findProductIdsByUserId(userId);
    }
    public void deleteByWishListId(Long id) {
        wishListRepository.deleteById(id);
    }
}
