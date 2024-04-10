package com.elice.proteinplus.category.service;

import com.elice.proteinplus.category.entity.Category;
import com.elice.proteinplus.category.entity.CategoryDTO;
import com.elice.proteinplus.category.entity.UpdateCategoryDTO;
import com.elice.proteinplus.category.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<Category> findAllCategory() { return categoryRepository.findAllCategoryByParentIdAscNullsFirstCategoryIdAsc(); }

    //부모 카테고리 조회
    public List<String> findParentCategory(){
        return categoryRepository.findParentCategory();
    }

    //자식 카테고리 조회
    public List<String> findChildCategory(Long parent_id){
        return categoryRepository.findChildCategory(parent_id);
    }

    //특정 카테고리 조회
    public Long findCategoryIdByNameAndParentId(String name, Long parent_id) { return categoryRepository.findCategoryIdByNameAndParentId(name, parent_id); }

    //부모 카테고리 추가
    //카테고리 명 중복일 경우 에러 코드 ㄱㄱ  수정할 때도
    public Category createParentCategory(String name){

        Category parentCategory = null;

        Category createCategory = new Category();
        createCategory.create(name, parentCategory);

        Category createdCategory = categoryRepository.save(createCategory);
        return createdCategory;
    }

    //자식 카테고리 추가
    public Category createChildCategory(CategoryDTO categoryDTO){

        String categoryName = categoryDTO.getName();
        Long parentId = categoryDTO.getParent_id();

        Category parentCategory = categoryRepository.findCategoryById(parentId);

        Category createCategory = new Category();
        createCategory.create(categoryName, parentCategory);

        Category createdCategory = categoryRepository.save(createCategory);
        return createdCategory;
    }

    //카테고리 수정 -> 이름만 변경가능
    //이름을 가지고 parent_id = null 인 카테고리를 찾음
    //그 후 해당 카테고리 id를 찾아 name을 수정
    public Category updateCategory(Long id, UpdateCategoryDTO updateCategoryDTO){

        //id를 이용하여 특정카테고리 조회
        Category updateCategory = categoryRepository.findCategoryById(id);

        //특정 카테고리의 name 변경
        updateCategory.update(updateCategoryDTO.getName());

        Category updatedCategory = categoryRepository.save(updateCategory);


        return updatedCategory;
    }

    //카테고리 삭제
    //카테고리 목록이 보여지는 상황에서 삭제를 하는 것이기에 null의 가능성 배제
    public void deleteCategory(Long id) {

        List<Category> deleteChildCategory = categoryRepository.findCategoryByParentId(id);

        // 자식 카테고리들을 순회하면서 삭제
        for (Category childCategory : deleteChildCategory) {
            deleteCategory(childCategory.getId()); // 재귀적으로 자식 카테고리 삭제
        }

        categoryRepository.deleteById(id);

    }
}
