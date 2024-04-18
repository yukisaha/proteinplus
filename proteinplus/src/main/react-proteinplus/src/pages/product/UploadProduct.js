import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {uploadImage} from './firebase';

function UploadProduct() {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [content, setContent] = useState('');
  const [stock, setStock] = useState('');
  const [discountRate, setDiscountRate] = useState('');
  const [productStatus, setProductStatus] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [detailImage, setDetailImage] = useState(null);

  const Spring_Server_Ip = process.env.REACT_APP_Spring_Server_Ip;

  const uploadProductImages = async (mainImage, detailImage) => {
    try{
        const mainImageUrl = await uploadImage(mainImage);
        const detailImageUrl = await uploadImage(detailImage);
        return { mainImageUrl, detailImageUrl };
    } catch (error){
        alert('이미지 업로드 실패: ', error);
        console.error('이미지 업로드 실패:', error);
        throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      if (productStatus === '') {
        alert('상품 상태를 선택해주세요.');
        return;
      }

      const { mainImageUrl, detailImageUrl } = await uploadProductImages(
        mainImage,
        detailImage
      );

      const statusToSend = productStatus === '' ? null : productStatus;

      const response = await axios.post( `${Spring_Server_Ip}/product/admin/add`, {
        name: productName,
        price: parseInt(price),
        content: content,
        stock: parseInt(stock),
        discountRate: discountRate ? parseInt(discountRate) : null,
        productStatus: statusToSend,
        categoryId: category,
        mainImageUrl: mainImageUrl,
        detailImageUrl: detailImageUrl
      });

      alert('상품 등록 성공:', response.data);
      // 상품 등록이 성공시에 할 작업을 추가
    } catch (error) {
      alert('상품 등록 실패:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${Spring_Server_Ip}/category/find/category`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="upload-product-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="productName">상품명</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
          <label htmlFor="price">가격</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <label htmlFor="content">상품정보</label>
          <input
              type="text"
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
          />
          <label htmlFor="stock">재고</label>
          <input
            type="number"
            id="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
          <label htmlFor="discountRate">할인율</label>
          <input
            type="number"
            id="discountRate"
            value={discountRate}
            onChange={(e) => setDiscountRate(e.target.value)}
          />
          <label htmlFor="productStatus">상품상태</label>
            <select
              id="productStatus"
              value={productStatus}
              onChange={(e) => setProductStatus(e.target.value)}
            >
              <option value="">상품상태를 선택하세요</option>
              <option value="sell">판매가능</option>
              <option value="soldout">품절</option>
            </select>
          <label htmlFor="category">카테고리</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(parseInt(e.target.value))}
            required
          >
            <option value="">카테고리를 선택하세요</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <input type="file" onChange={(e) => setMainImage(e.target.files[0])} />
          <input type="file" onChange={(e) => setDetailImage(e.target.files[0])} />
          <button type="submit">상품 등록</button>
      </form>
    </div>
  );
}

export default UploadProduct;
