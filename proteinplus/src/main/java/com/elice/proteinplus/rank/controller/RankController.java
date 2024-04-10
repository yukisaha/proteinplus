package com.elice.proteinplus.rank.controller;

import com.elice.proteinplus.category.entity.Category;
import com.elice.proteinplus.rank.service.RankService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@Slf4j
public class RankController {

    private final RankService rankService;
    @GetMapping("/rank")
    public List<Category> findRankCategory() {

        List<Category> categoryList = rankService.findAllCategory();
        log.info("categoryList = {}", categoryList);
        return categoryList;
    }
}
