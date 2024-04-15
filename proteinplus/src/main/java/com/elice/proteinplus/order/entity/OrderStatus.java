package com.elice.proteinplus.order.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum OrderStatus {
    ORDER,
    PREPARE_DELIVERY,
    ON_DELIVERY,
    DELIVERY_OVER,
    CANCEL
}
