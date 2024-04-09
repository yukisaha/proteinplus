package com.elice.proteinplus.rank.service;

import com.elice.proteinplus.category.entity.Category;
import com.elice.proteinplus.rank.entity.Rank;
import com.elice.proteinplus.rank.repository.RankRespository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RankService {

    private final RankRespository rankRespository;

    //rank에 해당하는 카테고리 정보 조회
    public List<Category> findAllCategory() {
        //모든 랭크 조회
        List<Rank> ranks = rankRespository.findAll();
        //카테고리 id만 조회
        return ranks.stream()
                .map(rank -> rank.getCategory())
                .collect(Collectors.toList());
    }
}