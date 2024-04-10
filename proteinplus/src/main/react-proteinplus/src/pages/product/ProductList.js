import React, { useState, useEffect } from 'react';
import '../../styles/product/css/ProductList.css';
import {Link, useParams} from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import axios from 'axios';
import Category from './Category'

function ProductList(){
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedOption1, setSelectedOption1] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [categoryProductCount, setCategoryProductCount] = useState(0);
  const [includeSoldOut, setIncludeSoldOut] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategoryProductCount();
  }, [categoryId, selectedOption1, itemsPerPage, currentPage, includeSoldOut]);

  const fetchProducts = async () => {
    try {
      let url;
      if (includeSoldOut) {
        url = `/product/includingSoldOut`;
      } else {
        url = `/product/excludingSoldOut`;
      }
      const response = await axios.get(url, {
        params: {
          categoryId: categoryId,
          orderBy: selectedOption1,
          page: currentPage,
          size: itemsPerPage
        }
      });
      setProducts(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategoryProductCount = async () => {
    try {
      const response = await axios.get(`/product/count/${categoryId}`);
      setCategoryProductCount(response.data);
    } catch (error) {
      console.error('Error fetching category product count:', error);
    }
  };

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

    return(
      <>
      <Header/>
      {/* 헤더빼고 카테고리컴포넌트 렌더링 & 카테고리 컴포넌트에서는 푸터 제외해야함. */}
        <div className="product-list">
            <div className="dropdown-container">
            <span className="dropdown-text-count">{`총 ${categoryProductCount}개`}</span>
            <span className="dropdown-text">의 상품</span>
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
        <Footer/>
        </>
    )
}

function ProductCard({product}) {
    return (
        <div className="product-card">
          <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
            <img src={product.img} alt={product.name} className="product-image" />
          </Link>
            <div className="product-details">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <span className="product-result">{product.finalPrice}</span>
            <span className="product-discount"> {product.discountRate}</span>
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