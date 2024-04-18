package com.elice.proteinplus.order.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class DeliveryDto {

    private Long orderId;

    private String receiverName;

    private int receiverPhoneNumber;

    private String deliveryReq;

    private String receiverAddr;

    private String receiverPost;

    private String receiverAddrDtl;

    private int totalPrice;

}
