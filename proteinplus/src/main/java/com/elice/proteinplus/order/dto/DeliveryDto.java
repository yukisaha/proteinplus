package com.elice.proteinplus.order.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DeliveryDto {

    private Long orderId;

    private String receiverName;

    private int receiverPhoneNumber;

    private String deliveryReq;

    private String receiverAddr;

    private String receiverPost;

    private String receiverAddrDtl;

}
