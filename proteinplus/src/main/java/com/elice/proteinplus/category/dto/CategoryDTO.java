package com.elice.proteinplus.category.dto;

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
