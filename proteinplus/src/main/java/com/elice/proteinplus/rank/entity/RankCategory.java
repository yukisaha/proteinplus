package com.elice.proteinplus.rank.entity;

import com.elice.proteinplus.category.entity.Category;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name= "rank_category")
public class RankCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "category_id")
    private Category category;

    public void create(Category category){
        this.category = category;
    }

}
