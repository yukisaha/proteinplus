package com.elice.proteinplus.order.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
public class OrderRequestDto {

    private Long productId;

    private Long userId;

    private int count;

    private int orderPrice;

    private DeliveryDto deliveryDto;

}
