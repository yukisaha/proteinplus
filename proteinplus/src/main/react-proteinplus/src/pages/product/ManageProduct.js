import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {uploadImage, deleteImage} from './firebase';

function ManageProduct({productId}){

    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [content, setContent] = useState('');
    const [stock, setStock] = useState('');
    const [discountRate, setDiscountRate] = useState('');
    const [productStatus, setProductStatus] = useState('');
    const [mainImage, setMainImage] = useState(null);
    const [detailImage, setDetailImage] = useState(null);
    const [categoryId, setCategoryId] = useState('');
    const [parentCategoriesEdit, setParentCategoriesEdit] = useState([]);
    const [childCategoriesEdit, setChildCategoriesEdit] = useState([]);
    const [selectedParentCategoryId, setSelectedParentCategoryId] = useState('');
    const [selectedChildCategoryId, setSelectedChildCategoryId] = useState('');
    const [productInfo, setProductInfo] = useState(null);

    const Spring_Server_Ip = process.env.REACT_APP_Spring_Server_Ip;

    useEffect(() => {
        const fetchProductInfo = async () => {
            try {
                const response = await axios.get(`${Spring_Server_Ip}/product/${productId}`);
                const productInfo = response.data;
                setProductInfo(productInfo);

                setProductName(productInfo.name);
                setPrice(productInfo.price);
                setContent(productInfo.content);
                setStock(productInfo.stock);
                setDiscountRate(productInfo.discountRate);
                setProductStatus(productInfo.productStatus);
                setProductStatus(productInfo.productStatus);
                setMainImage(productInfo.mainImageUrl);
                setDetailImage(productInfo.detailImageUrl);
                setCategoryId(productInfo.categoryId);

            } catch (error) {
                console.error('상품 정보 조회 실패:', error);
            }
        };
        fetchProductInfo();
    }, [productId]);

    useEffect(() => {
        const fetchParentCategoriesEdit = async () => {
            try {
                const response = await axios.get(`${Spring_Server_Ip}/category`);
                setParentCategoriesEdit(response.data);
            } catch (error) {
                console.error('부모 카테고리 조회 실패:', error);
            }
        };
        fetchParentCategoriesEdit();
    }, []);

    const fetchChildCategoriesEdit = async (selectedParentCategoryId) => {
        try {
            const response = await axios.get(`${Spring_Server_Ip}/category/${selectedParentCategoryId}`);
            console.log("자식 카테고리 조회 응답:", response.data);
            setChildCategoriesEdit(response.data);
        } catch (error) {
            console.error('자식 카테고리 조회 실패:', error);
        }
    };

    useEffect(() => {
        if (selectedParentCategoryId) {
            console.log("부모 카테고리가 선택되었습니다.");
            fetchChildCategoriesEdit(selectedParentCategoryId);
        }
    }, [selectedParentCategoryId]);

    const handleParentCategoryChange = async (e) => {
        const selectedParentCategoryId = e.target.value;
        setSelectedParentCategoryId(selectedParentCategoryId);
        setSelectedChildCategoryId('');
        setCategoryId('');
        await fetchChildCategoriesEdit(selectedParentCategoryId);
    };

    const handleChildCategoryChange = (e) => {
        const selectedChildCategoryId = e.target.value;
        setSelectedChildCategoryId(selectedChildCategoryId);
        setCategoryId(selectedChildCategoryId);
    };

     const updateProductImages = async (productId, newMainImage, newDetailImage) => {
        try {
            let mainImageUrl, detailImageUrl;

            if (newMainImage) {
              mainImageUrl = await uploadImage(newMainImage);
              await deleteImage(mainImageUrl);
            }

            if (newDetailImage) {
              detailImageUrl = await uploadImage(newDetailImage);
              await deleteImage(detailImageUrl);
            }

            await axios.put(`${Spring_Server_Ip}/product/admin/edit/${productId}`, {
                id: productId,
                mainImageUrl: mainImageUrl ? mainImageUrl : undefined,
                detailImageUrl: detailImageUrl ? detailImageUrl : undefined
            });

            alert('이미지 업데이트가 완료되었습니다.');
        } catch (error) {
          alert('이미지 업데이트 중 오류발생:', error);
          console.error('이미지 업데이트 오류:', error);
        }
     };

    const handleUpdateProduct = async () => {
        try {
            const updatedProductData = {};

            if (productName !== productInfo.name) {
                updatedProductData.name = productName;
            }
            if (parseInt(price) !== productInfo.price) {
                updatedProductData.price = parseInt(price);
            }
            if (content !== productInfo.content) {
                updatedProductData.content = content;
            }
            if (parseInt(stock) !== productInfo.stock) {
                updatedProductData.stock = parseInt(stock);
            }
            if (parseInt(discountRate) !== productInfo.discountRate) {
                updatedProductData.discountRate = parseInt(discountRate);
            }
            if (productStatus !== productInfo.productStatus) {
                updatedProductData.productStatus = productStatus;
            }
            if (selectedChildCategoryId !== productInfo.categoryId) {
                updatedProductData.categoryId = selectedChildCategoryId;
            }
            if (Object.keys(updatedProductData).length === 0) {
                alert('수정된 내용이 없습니다.');
                return;
            }
            const response = await axios.put(`${Spring_Server_Ip}/product/admin/edit/${productId}`, updatedProductData);

            await updateProductImages(productId, mainImage, detailImage);

            alert('상품 수정이 완료되었습니다.');
        } catch (error) {
            alert('상품 수정 중 오류가 발생했습니다.');
            console.error('상품 수정 오류:', error);
        }
    };


    return(
        <div className="manage-product-container">
            <label htmlFor="parentCategory">부모 카테고리:</label>
            <select
                id="parentCategory"
                value={selectedParentCategoryId}
                onChange={handleParentCategoryChange}
            >
                <option value="">부모 카테고리 선택</option>
                {parentCategoriesEdit.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>

            <label htmlFor="childCategory">자식 카테고리:</label>
            <select
                id="childCategory"
                value={selectedChildCategoryId}
                onChange={handleChildCategoryChange}
                disabled={!selectedParentCategoryId}
            >
                <option value="">자식 카테고리 선택</option>
                {childCategoriesEdit.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
            <h2>상품 수정</h2>
            <label htmlFor="productName">상품명:</label>
            <input
                type="text"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
            />

            <label htmlFor="price">가격:</label>
            <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />

            <label htmlFor="content">상품 정보:</label>
            <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>

            <label htmlFor="stock">재고:</label>
            <input
                type="number"
                id="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
            />

            <label htmlFor="discountRate">할인율:</label>
            <input
                type="number"
                id="discountRate"
                value={discountRate}
                onChange={(e) => setDiscountRate(e.target.value)}
            />

            <label htmlFor="productStatus">상품 상태:</label>
            <select
                id="productStatus"
                value={productStatus}
                onChange={(e) => setProductStatus(e.target.value)}
            >
                <option value="">상품 상태를 선택하세요</option>
                <option value="sell">판매중</option>
                <option value="soldout">품절</option>
            </select>

            <label htmlFor="mainImage">대표 이미지:</label>
            <input
                type="file"
                id="mainImage"
                onChange={(e) => setMainImage(e.target.files[0])}
            />

            <label htmlFor="detailImage">상세 이미지:</label>
            <input
                type="file"
                id="detailImage"
                onChange={(e) => setDetailImage(e.target.files[0])}
            />
            <button onClick={handleUpdateProduct}>상품 수정</button>
        </div>
    )
}

export default ManageProduct;