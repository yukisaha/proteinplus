package com.elice.proteinplus.order.dto;

import com.elice.proteinplus.order.entity.Address;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class DeliveryDto {

    private Long orderId;

    private String receiverName;

    private String receiverPhoneNumber;

    private String deliveryReq;

    private Address address;

}
