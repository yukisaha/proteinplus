package com.elice.proteinplus.rank.service;

import com.elice.proteinplus.category.entity.Category;
import com.elice.proteinplus.category.service.CategoryService;
import com.elice.proteinplus.rank.entity.RankCategory;
import com.elice.proteinplus.rank.repository.RankCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RankCategoryService {

    private final RankCategoryRepository rankRepository;
    private final CategoryService categoryService;

    //rank 에 해당하는 카테고리 정보 조회
    public List<Category> findAllCategory() {
        //모든 랭크 조회
        List<RankCategory> rankCategories = rankRepository.findAll();
        //카테고리 id만 조회
        return rankCategories.stream()
                .map(rank -> rank.getCategory())
                .collect(Collectors.toList());
    }
    //rank 에 해당하지 않는 카테고리 정보 조회
    public List<Category> findExceptRankCategory() {
        List<Category> exceptRankCategories = rankRepository.findExceptRankCategory();

        return exceptRankCategories;
    }

    //rank 에 카테고리 추가
    public RankCategory findCategoryByCategoryId(Long categoryId){

        Category category = categoryService.findCategoryById(categoryId);

        RankCategory createdRank = new RankCategory();
        createdRank.create(category);

        // Rank 엔티티 저장
        return rankRepository.save(createdRank);
    }

    //rank 목록에서 카테고리를 삭제하는 건 자유 (조건 X)
    public void deleteRankCategory(Long categoryId){

        Long id = rankRepository.findIdByCategoryId(categoryId);
        rankRepository.deleteById(id);
    }
}