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

    //cascade : order를 저장할때 delivery도 자동으로 persist 해준다.
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL) //하나의 배송정보는 하나의 주문정보만 가져야 하니까
    @JoinColumn(name = "order_id")  //연관관계 주인 fk
    private Order order; //한개의 주문에 한개의 배송정보

    //user에서 받아올 수 있나?
    @Column(name = "receiver_name", nullable = false)
    private String receiverName;

    @Column(name = "receiver_phone", nullable = false)
    private int receiverPhone;

    @Column(name = "city", nullable = false)
    private String receiverAddr; //서울시

    @Column(name = "zipcode", nullable = false)
    private String receiverPost; //--시 --구 도로명주소

    @Column(name = "addressDetail", nullable = false)
    private String receiverAddrDtl; //상세주소

    @Column(name = "delivery_request")
    private String deliveryReq; //주문 요청사항

    @Column(name = "total_price")
    private int totalPrice;

    public Delivery update(String receiverAddr, String receiverPost, String receiverAddrDtl, String receiverName, Integer receiverPhone) {
        this.receiverAddr = receiverAddr;
        this.receiverPost = receiverPost;
        this.receiverAddrDtl = receiverAddrDtl;
        this.receiverName = receiverName;
        this.receiverPhone = receiverPhone;
        //주문 개수 수정 넣고 싶음

        return this;
    }

}
