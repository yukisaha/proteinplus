import React from 'react';
import '../../styles/admin/css/submitProduct.module.css';

export default function SubmitProduct() {

  return (
    <div>
      <h1>제품 등록</h1>

      <form id="productDetailsForm" method="post" novalidate>
        <h2 class="required">제품 카테고리</h2>
        <select id="mainCategory" required onchange="updateSubcategories()">
          <option value="">전체 카테고리 선택</option>
        </select>

        <select id="subCategory" required>
          <option value="">세부 카테고리 선택</option>
        </select>

        <h2>제품 옵션 목록</h2>
        <div id="dropdownOptionContainer"></div>
        <button class="btn-mini" onclick="addDropdown()">+</button>

        <h2>제품 세부정보</h2>
        <div class="form-row">
          <label for="productName" class="required">제품명</label>
          <input type="text" id="productName" name="productName" required />
        </div>
        <div class="form-row">
          <label for="brandName" class="required">브랜드명</label>
          <input type="text" id="brandName" name="brandName" required />
        </div>
        <div class="form-row">
          <label for="storageMethod">보관방법</label>
          <input type="text" id="storageMethod" name="storageMethod" />
        </div>
        <div class="form-row">
          <label for="notice">공지사항</label>
          <input type="text" id="notice" name="notice" />
        </div>
        <input type="submit" value="상품 추가하기" />
      </form>

      <div id="warningMessage" style={{color: "red", display: "none"}}>
        필수 입력 항목을 모두 입력해주세요.
      </div>
    </div>
  )

}