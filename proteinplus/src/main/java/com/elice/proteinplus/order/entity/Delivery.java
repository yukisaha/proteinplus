package com.elice.proteinplus.order.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@Setter
@Table(name = "delivery")
public class Delivery {
    @Id
    @GeneratedValue
    @Column(name ="delivery_id")
    private Long id;

    @OneToOne(mappedBy = "delivery" ,fetch = LAZY)
    private Order order; //한개의 주문에 한개의 배송정보

    //user에서 받아올 수 있나?
    @Column(name = "receiver_name", nullable = false)
    private String receiverName;

    @Column(name = "receiver_phone", nullable = false)
    private int receiverPhone;

    @Embedded
    private Address address;

    @Column(name = "delivery_request")
    private String deliveryReq; //주문 요청사항

    public Delivery update(Address address, String receiverName, Integer receiverPhone) {
        this.address = address;
        this.receiverName = receiverName;
        this.receiverPhone = receiverPhone;
        //주문 개수 수정 넣고 싶음

        return this;
    }

}
