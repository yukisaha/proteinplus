package com.elice.proteinplus.category.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class CategoryDTO {
    private String name;
    private Long parent_id;
}
