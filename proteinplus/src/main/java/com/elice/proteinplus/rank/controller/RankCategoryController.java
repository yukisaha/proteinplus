package com.elice.proteinplus.rank.controller;

import com.elice.proteinplus.category.entity.Category;
import com.elice.proteinplus.rank.entity.RankCategory;
import com.elice.proteinplus.rank.service.RankCategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class RankCategoryController {

    //랭크 조회
    private final RankCategoryService rankService;
    @GetMapping("/rank")
    public List<Category> findRankCategory() {

        List<Category> categoryList = rankService.findAllCategory();
        return categoryList;
    }

    //랭크에 포함되지 않은 카테고리 조회
    @GetMapping("/rank/except")
    public List<Category> findExceptRank(){

        List<Category> exceptCategoryList = rankService.findExceptRankCategory();

        return exceptCategoryList;
    }


    //랭크 카테고리 추가
    @PostMapping("/rank/add")
    public RankCategory createRankCategory(@RequestParam(name="category_id") Long categoryId){
        RankCategory createdRankCategory = rankService.findCategoryByCategoryId(categoryId);
        return createdRankCategory;
    }

    //랭크 카테고리 삭제
    @DeleteMapping("/rank/delete")
    public void deleteRankCategory(@RequestParam(name = "category_id") Long categoryId){
        rankService.deleteRankCategory(categoryId);
    }
}
