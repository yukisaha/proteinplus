import React, { useState, useEffect } from 'react';
import '../../styles/product/css/ProductList.scoped.css';
import {Link} from 'react-router-dom';
import axios from 'axios';

function ProductList({categoryId}){

//  const categoryId = 13;

  const [loading, setLoading] = useState(true); // 초기에는 로딩 중 상태로 설정

  const [products, setProducts] = useState([]);

  const [selectedOption1, setSelectedOption1] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(3);
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
      if (selectedOption1 === 'priceAsc') {
        sortedProducts.sort((a, b) => calculateFinalPrice(a.price, a.discountRate) - calculateFinalPrice(b.price, b.discountRate));
      } else if (selectedOption1 === 'priceDesc') {
        sortedProducts.sort((a, b) => calculateFinalPrice(b.price, b.discountRate) - calculateFinalPrice(a.price, a.discountRate));
      }

      setTotalPages(Math.ceil(sortedProducts.length / itemsPerPage));

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

  useEffect(() => {
      const fetchProducts = async () => {
          try {
              let sortedProducts = [...products]; // 상품을 복사하여 정렬

              switch (selectedOption1) {
                case 'priceAsc':
                    // 클라이언트 측에서 낮은가격순으로 정렬
                    sortedProducts.sort((a, b) => calculateFinalPrice(a.price, a.discountRate) - calculateFinalPrice(b.price, b.discountRate));
                    break;
                case 'priceDesc':
                    // 클라이언트 측에서 높은가격순으로 정렬
                    sortedProducts.sort((a, b) => calculateFinalPrice(b.price, b.discountRate) - calculateFinalPrice(a.price, a.discountRate));
                    break;
                default:
                    // 나머지 경우는 서버에서 해당 순서로 정렬된 상품을 가져오도록 설정
                    let url;
                    switch (selectedOption1) {
                    case 'sales':
                        url = `${Spring_Server_Ip}/product/test/${categoryId}?orderBy=sales`;
                        break;
                    case 'uploadDateDesc':
                        url = `${Spring_Server_Ip}/product/test/${categoryId}?orderBy=uploadDateDesc`;
                        break;
                    case 'discountRateDesc':
                        url = `${Spring_Server_Ip}/product/test/${categoryId}?orderBy=discountRateDesc`;
                        break;
                    default:
                        url = `${Spring_Server_Ip}/product/test/${categoryId}?orderBy=uploadDateDesc`;
                        break;
                    }
                    const response = await axios.get(url);
                    sortedProducts = response.data;
                    break;
                }
                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                setProducts(sortedProducts.slice(startIndex, endIndex));
          } catch (error) {
                console.error('Error fetching products:', error);
          }
      };

      fetchProducts();
  }, [selectedOption1, categoryId]); // useEffect 의존성 배열에 selectedOption1과 categoryId 추가

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
                <option value="sales">인기순</option>
                <option value="priceAsc">낮은가격순</option>
                <option value="priceDesc">높은가격순</option>
                <option value="uploadDateDesc">신상품순</option>
                <option value="discountRateDesc">할인율순</option>
              </select>
            </div>
            <div className="dropdown">
              <select value={itemsPerPage} onChange={handleSelectChange2}>
                <option value={1}>1개 보기</option>
                <option value={2}>2개 보기</option>
                <option value={3}>3개 보기</option>
                <option value={4}>4개 보기</option>
              </select>
            </div>
          </div>

          <div className="product-card-list">
            {products.map((product) => (
                <ProductCard key={product.id} product={product}/>
            ))}
          </div>

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      </>
  )
}

function calculateFinalPrice(price, discountRate) {
  if (discountRate) {
    const discountedPrice = price - (price * (discountRate / 100));
    return discountedPrice;
  } else {
    return price; // 할인율이 없으면 원래 가격을 반환합니다.
  }
}

function ProductCard({product}) {
  return (
      <div className="product-card">
        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
          {/*<img src={`상품 이미지 경로`} alt={product.name} className="product-image" />*/}
          {/* 이미지 예시 */}
          <img src={'https://file.rankingdak.com/image/RANK/PRODUCT/PRD001/20240126/IMG1706rIY251836826_330_330.jpg'} className={'product-image'} />
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

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePageClick = (pageNumber) => {
      onPageChange(pageNumber);
    };

  const renderPageButtons = () => {
    const pageButtons = [];
    for (let i=1; i<=totalPages; i++) {
      pageButtons.push(
        <span key={i} className={i === currentPage ? 'active' : ''} onClick={() => handlePageClick(i)}>
          {i}
        </span>
      );
    }
    return pageButtons;
  };

  return (
    <div className="pagination">
      {currentPage > 1 && <button onClick={() => handlePageClick(currentPage - 1)}>이전</button>}
      {renderPageButtons()}
      {currentPage < totalPages && <button onClick={() => handlePageClick(currentPage + 1)}>다음</button>}
    </div>
  );
}

export default ProductList;