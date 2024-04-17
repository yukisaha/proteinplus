package com.elice.proteinplus.order.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class OrderAndDeliveryDto {
    private OrderDto orderDto;
    private DeliveryDto deliveryDto;

}

