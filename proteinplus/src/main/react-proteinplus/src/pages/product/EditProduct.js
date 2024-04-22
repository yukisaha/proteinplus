import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {uploadImage, deleteImage} from './firebase';
import '../../styles/product/css/EditProduct.scoped.css';
import ManageProduct from './ManageProduct';

function EditProduct(){

    const [parentCategories, setParentCategories] = useState([]);
    const [childCategories, setChildCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedParentCategory, setSelectedParentCategory] = useState('');
    const [selectedChildCategory, setSelectedChildCategory] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');

    const fetchParentCategories = async () => {
      try {
        const response = await axios.get(`/api/category`);
        setParentCategories(response.data);
      } catch (error) {
        console.error('부모 카테고리 조회 실패:', error);
      }
    };

    const fetchChildCategories = async (selectedParentCategory) => {
      try {
        const response = await axios.get(`/api/category/${selectedParentCategory}`);
        setChildCategories(response.data);
      } catch (error) {
        console.error('자식 카테고리 조회 실패:', error);
      }
    };

    const fetchProducts = async (selectedChildCategory) => {
      try {
        const response = await axios.get(`/api/product/test/${selectedChildCategory}`);
        setProducts(response.data.map(product => ({ id: product.id, name: product.name })));
      } catch (error) {
        console.error('상품 조회 실패:', error);
      }
    };

    useEffect(() => {
      fetchParentCategories();
    }, [])

    useEffect(() => {
      if (selectedParentCategory) {
        fetchChildCategories(selectedParentCategory);
      }
    }, [selectedParentCategory]);

    useEffect(() => {
      if (selectedChildCategory) {
        fetchProducts(selectedChildCategory);
      }
    }, [selectedChildCategory]);

    return (
        <div className="edit-product-container">
          <div className="dropdowns">
            <label htmlFor="parentCategory">부모 카테고리:</label>
            <select
              id="parentCategory"
              value={selectedParentCategory}
              onChange={(e) => setSelectedParentCategory(e.target.value)}
            >
              <option value="">부모 카테고리 선택</option>
              {parentCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <label htmlFor="childCategory">자식 카테고리:</label>
            <select
              id="childCategory"
              value={selectedChildCategory}
              onChange={(e) => setSelectedChildCategory(e.target.value)}
              disabled={!selectedParentCategory}
            >
              <option value="">자식 카테고리 선택</option>
              {childCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <label htmlFor="product">상품:</label>
            <select
              id="product"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              disabled={!selectedChildCategory}
            >
              <option value="">상품 선택</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
              {selectedProduct && (
                <>
                <h2>제발좀</h2>
                <ManageProduct productId={selectedProduct}/>
                </>
              )}
        </div>
    )
}
export default EditProduct;