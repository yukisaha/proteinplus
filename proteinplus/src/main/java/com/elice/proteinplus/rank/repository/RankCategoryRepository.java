package com.elice.proteinplus.rank.repository;

import com.elice.proteinplus.category.entity.Category;
import com.elice.proteinplus.rank.entity.RankCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RankCategoryRepository extends JpaRepository<RankCategory, Long>{

    @Query("select r.id from RankCategory r where r.category.id = :categoryId")
    Long findIdByCategoryId(@Param("categoryId") Long categoryId);

    @Query("select c from Category c where c.parent.id is null and c.id not in (select r.category.id from RankCategory r)")
    List<Category> findExceptRankCategory();
}
