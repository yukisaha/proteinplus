package com.elice.proteinplus.order.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

/**
 상품 상세 페이지에서 주문할 상품의 아이디와 주문 수량을 전달
 */
@Getter
@Setter
@AllArgsConstructor
public class OrderDto {

    @NotNull(message = "상품 아이디는 필수 입력 값입니다.")
    private List<Long> productIds;

    @Size(min = 1, max = 200, message = "주문 수량은 1에서 200 사이여야 합니다.")
    private List<Integer> counts;

    private boolean isChecked;

    @Override
    public String toString() {
        return "OrderDto{" +
                "productId=" + productIds +
                ", count=" + counts +
                ", isChecked=" + isChecked +
                '}';
    }


}
