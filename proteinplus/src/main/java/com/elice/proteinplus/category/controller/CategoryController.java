package com.elice.proteinplus.category.controller;

import com.elice.proteinplus.category.entity.Category;
import com.elice.proteinplus.category.entity.CategoryDTO;
import com.elice.proteinplus.category.entity.UpdateCategoryDTO;
import com.elice.proteinplus.category.service.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/category")
@Slf4j
public class CategoryController {


    private final CategoryService categoryService;


    @GetMapping("/test")
    public List<Category> getCategory(){

        List<Category> category= categoryService.findAllCategory();

        return category;
    }

    //관리자 영역
    //부모 카테고리 조회
    @GetMapping
    public List<String> findParentCategory(){

        List<String> findCategories = categoryService.findParentCategory();

        return findCategories;
    }

    //자식 카테고리 조회
    @GetMapping("/{parent_id}")
    public List<String> findChildCategory(@PathVariable(name = "parent_id") Long parent_id){

        List<String> childCategories = categoryService.findChildCategory(parent_id);

        return childCategories;
    }


    //부모 카테고리 추가
    //부모 카테고리 목록에서 조회하므로 parent_id가 0임
    @PostMapping("/add")
    public Category createParentCategory(@RequestParam(name = "name")String name){

        Category createdCategory = categoryService.createParentCategory(name);
        return createdCategory;
    }

    //자식 카테고리 추가
    //자식 카테고리 목록에서 조회하므로 parent_id가 0일 수 없음
    @PostMapping("/add/{parent_id}")
    public Category createChildCategory(@RequestBody CategoryDTO categoryDTO){

        Category createdCategory = categoryService.createChildCategory(categoryDTO);
        return createdCategory;
    }

    //카테고리 수정
    @PutMapping("/edit")
    public Category updateParentCategory(@RequestParam(name = "name") String name, @RequestBody UpdateCategoryDTO updateCategoryDTO){

        Long parentId = null;
        //name을 이용하여 특정 카테고리 id 조회
        Long updateCategoryId = categoryService.findCategoryIdByNameAndParentId(name, parentId);

        Category updatedCategory = categoryService.updateCategory(updateCategoryId, updateCategoryDTO);

        return updatedCategory;
    }

    //자식 카테고리 수정
    @PutMapping("/edit/{parent_id}}")
    public Category updateChildCategory(@RequestParam(name = "name") String name, @PathVariable(name="parent_id") Long parent_id, @RequestBody UpdateCategoryDTO updateCategoryDTO){

        //name을 이용하여 특정 카테고리 id 조회
        Long updateCategoryId = categoryService.findCategoryIdByNameAndParentId(name, parent_id);

        Category updatedCategory = categoryService.updateCategory(updateCategoryId, updateCategoryDTO);

        return updatedCategory;
    }

    //카테고리 삭제
    @DeleteMapping("/delete")
    public void deleteCategory(@RequestParam(name = "category_id") Long id){

        categoryService.deleteCategory(id);
    }


}
