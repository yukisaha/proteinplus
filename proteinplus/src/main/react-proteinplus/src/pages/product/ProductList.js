import React, { useState, useEffect } from 'react';
import '../../styles/product/css/ProductList.scoped.css';
import {Link} from 'react-router-dom';
import axios from 'axios';

function ProductList({categoryId}){
  const [loading, setLoading] = useState(true); // 초기에는 로딩 중 상태로 설정

  const [products, setProducts] = useState([]);

  const [selectedOption1, setSelectedOption1] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [categoryProductCount, setCategoryProductCount] = useState(0);
  const [includeSoldOut, setIncludeSoldOut] = useState(false);

  const Spring_Server_Ip = process.env.REACT_APP_Spring_Server_Ip;

  // const fetchProducts = async () => {
  //     try {
  //       let url;
  //       if (includeSoldOut) {
  //         url = `${Spring_Server_Ip}/product/includingSoldOut`;
  //       } else {
  //         url = `${Spring_Server_Ip}/product/excludingSoldOut`;
  //       }
  //       const response = await axios.get(url, {
  //         params: {
  //           categoryId: categoryId,
  //           orderBy: selectedOption1,
  //           page: currentPage,
  //           size: itemsPerPage
  //         }
  //       });
  //       setProducts(response.data.content);
  //       setTotalPages(response.data.totalPages);
  //     } catch (error) {
  //       console.error('Error fetching products:', error);
  //     }
  //   };


  const fetchProducts = async () => {
    try {
      let url;
      if (includeSoldOut) {
        url = `${Spring_Server_Ip}/product/test/${categoryId}`;
      } else {
        url = `${Spring_Server_Ip}/product/test/sell/${categoryId}`;
      }
      const response = await axios.get(url);
      setProducts(response.data);
      setTotalPages(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
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

  // useEffect(() => {
  //   fetchProducts();
  //   fetchCategoryProductCount();
  // }, [categoryId, selectedOption1, itemsPerPage, currentPage, includeSoldOut]);

  useEffect(() => {
    fetchProducts();
    fetchCategoryProductCount();
  }, [categoryId, includeSoldOut]);


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
                <option value={10}>10개 보기</option>
                <option value={30}>30개 보기</option>
                <option value={60}>60개 보기</option>
                <option value={100}>100개 보기</option>
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
          {/*<span className="product-result">{product.finalPrice}</span>*/}
          <span className="product-discount">{product.discountRate}</span>
          <span className="product-price"> {product.price}</span>
        </div>
      </div>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
      <div className="pagination">
        {pageNumbers.map((number) => (
            <span key={number} className={number === currentPage ? 'active' : ''} onClick={() => onPageChange(number)}>
          {number}
        </span>
        ))}
      </div>
  );
}
export default ProductList;