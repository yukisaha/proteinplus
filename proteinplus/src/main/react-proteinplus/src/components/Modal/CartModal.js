import React, { useState } from 'react';
import '../../styles/common/css/CartModal.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function CartModal({ isOpen, onRequestClose }) {
  const [modalIsOpen, setModalIsOpen] = useState(isOpen); // 상태를 로컬로 관리

  // Modal이 열렸을 때 isOpen 상태를 업데이트
  if (modalIsOpen !== isOpen) {
    setModalIsOpen(isOpen);
  }

  // 확인 버튼 클릭 시 Cart.js 페이지로 이동하는 함수
  const handleConfirm = () => {
    window.location.href = '/order/cart'; // 페이지 이동
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={onRequestClose}
      overlayClassName="non-css" // 기본 react-modal css 안 먹게 하려고 non-css 추가
      className="non-css" // 기본 react-modal css 안 먹게 하려고 non-css 추가
      contentLabel="Custom Modal"
    >
      <div className="dialog_overlay">
        <div id="alert_wrap" className="alert_wrap_box">
          <div className="alertTitleWrap">
            <h2 className="alert_title" style={{ paddingBottom: '0px' }}>
              상품이 추가되었습니다.<br />장바구니로 이동하시겠습니까?
            </h2>
            <p className="alert_sub_title"></p>
          </div>
          <div className="alertBtnWrap">
            <button className="alertCancel" onClick={onRequestClose}>
              <span>취소</span>
            </button>
            <button className="alertOkay" onClick={handleConfirm}> {/* 확인 버튼에 onClick 이벤트 핸들러 추가 */}
              <span>확인</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
