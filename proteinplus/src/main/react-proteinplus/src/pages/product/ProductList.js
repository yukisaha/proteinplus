import React, { useState, useEffect } from 'react';
import '../../styles/product/css/ProductList.scoped.css';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Pagination from './Pagination';
import { storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

function ProductList({categoryId}){

  const [loading, setLoading] = useState(true); // 초기에는 로딩 중 상태로 설정
  const [products, setProducts] = useState([]);
  const [selectedOption1, setSelectedOption1] = useState('uploadDateDesc');
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [categoryProductCount, setCategoryProductCount] = useState(0);
  const [includeSoldOut, setIncludeSoldOut] = useState(false);

  const Spring_Server_Ip = process.env.REACT_APP_Spring_Server_Ip;

  const fetchProducts = async () => {
    try {
      let url;
      if (includeSoldOut) {
        url = `${Spring_Server_Ip}/product/test/${categoryId}`;
      } else {
        url = `${Spring_Server_Ip}/product/test/sell/${categoryId}`;
      }
      const response = await axios.get(url);

      let sortedProducts = response.data;

      switch (selectedOption1) {
        case 'priceAsc':
          sortedProducts.sort((a, b) => calculateFinalPrice(a.price, a.discountRate) - calculateFinalPrice(b.price, b.discountRate));
          break;
        case 'priceDesc':
              sortedProducts.sort((a, b) => calculateFinalPrice(b.price, b.discountRate) - calculateFinalPrice(a.price, a.discountRate));
              break;
            case 'sales':
              // 클라이언트 측에서 정렬?
              sortedProducts.sort((a, b) => b.sales - a.sales);
              break;
            case 'uploadDateDesc':
              sortedProducts.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
              break;
            case 'discountRateDesc':
              sortedProducts.sort((a, b) => b.discountRate - a.discountRate);
              break;
            default:
              break;
          }

      const newTotalPages = Math.ceil(sortedProducts.length / itemsPerPage);
      setTotalPages(newTotalPages);

      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setProducts(sortedProducts.slice(startIndex, endIndex));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
      setLoading(false);
      }
    };

  const fetchCategoryProductCount = async () => {
    try {
      let url;
      if (includeSoldOut) {
        url = `${Spring_Server_Ip}/product/count/${categoryId}`;
      } else{
        url = `${Spring_Server_Ip}/product/count/sell/${categoryId}`;
      }
      const response = await axios.get(url);
      setCategoryProductCount(response.data);
      setLoading(false); // 데이터를 성공적으로 받아온 후 로딩 상태 해제
    } catch (error) {
      console.error('Error fetching category product count:', error);
      setLoading(false); // 데이터를 받아오는데 실패해도 로딩 상태 해제
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategoryProductCount();
  }, [categoryId, includeSoldOut, selectedOption1, currentPage, itemsPerPage]);

  const handleSelectChange1 = (event) => {
    setSelectedOption1(event.target.value);
  };

  const handleSelectChange2 = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleIncludeSoldOutChange = (event) => {
    setIncludeSoldOut(event.target.checked);
  };

  if (loading) {
    // 로딩 중인 경우
    return <div className="loading-indicator">로딩중...</div>;
  }

  // 상품이 없는 경우
  if (!products) {
    return <div className="loading-indicator">상품이 없습니다</div>;
  }

  return(
      <>
        <div className="product-list">
          <div className="dropdown-container">
            <span className="dropdown-text-count">{`총 ${categoryProductCount}개`}</span>
            <span className="dropdown-text">의 상품이 있습니다</span>
            <div className="checkbox">
              <input type="checkbox" id="includeSoldOut" checked={includeSoldOut} onChange={handleIncludeSoldOutChange} />
              <label htmlFor="includeSoldOut">품절 상품 표시하기</label>
            </div>
            <div className="dropdown">
              <select value={selectedOption1} onChange={handleSelectChange1}>
                <option value="uploadDateDesc">신상품순</option>
                <option value="sales">인기순</option>
                <option value="priceAsc">낮은가격순</option>
                <option value="priceDesc">높은가격순</option>
                <option value="discountRateDesc">할인율순</option>
              </select>
            </div>
            <div className="dropdown">
              <select value={itemsPerPage} onChange={handleSelectChange2}>
                <option value={4}>4개 보기</option>
                <option value={8}>8개 보기</option>
                <option value={12}>12개 보기</option>
                <option value={16}>16개 보기</option>
              </select>
            </div>
          </div>

          <div className="product-card-list">
            {products.map((product) => (
                <ProductCard key={product.id} product={product}/>
            ))}
          </div>
        </div>
        <Pagination className="pagination" currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </>
  )
}

function calculateFinalPrice(price, discountRate) {
  if (discountRate) {
    const discountedPrice = price - (price * (discountRate / 100));
    return discountedPrice;
  } else {
    return price;
  }
}

function ProductCard({product}) {
  return (
      <div className="product-card">
        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
          <img src={product.mainImageUrl} alt={product.name} className="product-image" />
        </Link>
        <div className="product-details">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.content}</p>
          {product.discountRate ? (
                      <>
                        <span className="product-result">{calculateFinalPrice(product.price, product.discountRate).toLocaleString()}원</span>
                        <span className="product-discount"> {product.discountRate.toLocaleString()}%</span>
                        <span className="product-price">{product.price.toLocaleString()}원</span>
                      </>
                    ) : (
                      <span className="product-result">{product.price.toLocaleString()}원</span>
                    )}
          </div>
      </div>
  );
}

export default ProductList;