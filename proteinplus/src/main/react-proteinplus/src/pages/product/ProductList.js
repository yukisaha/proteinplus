import React, { useState } from 'react';
import '../../styles/product/css/ProductList.css';
import {Link} from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function ProductList({ products }){
    const [selectedOption1, setSelectedOption1] = useState('');
    const [selectedOption2, setSelectedOption2] = useState('');

    const handleSelectChange1 = (event) => {
      setSelectedOption1(event.target.value);
    };
    const handleSelectChange2 = (event) => {
      setSelectedOption2(event.target.value);
    };

    return(
    <>
        <Header/>
        <div className="product-list">
            <div className="dropdown-container">
            <span className="dropdown-text-count">총 10개</span>
            <span className="dropdown-text">의 상품</span>
                <Dropdown1 value={selectedOption1} onChange={handleSelectChange1} />
                <Dropdown2 value={selectedOption2} onChange={handleSelectChange2} />
            </div>

            <div className="product-card-list">
              {products.map((product) => (
                <ProductCard key={product.id} product={product}/>
              ))}
            </div>
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
            <span className="product-result">{product.result}</span>
            <span className="product-discount"> {product.discount}</span>
            <span className="product-price"> {product.price}</span>
            </div>
        </div>
    );
  }

  function Dropdown1({ value, onChange }) {
    return (
      <div className="dropdown">
        <select value={value} onChange={onChange}>
          <option value="">인기순</option>
          <option value="option1">낮은가격순</option>
          <option value="option2">높은가격순</option>
          <option value="option3">신상품순</option>
        </select>
      </div>
    );
  }

  function Dropdown2({ value, onChange }) {
    return (
      <div className="dropdown">
        <select value={value} onChange={onChange}>
          <option value="">30개 보기</option>
          <option value="optionA">10개 보기</option>
          <option value="optionB">60개 보기</option>
          <option value="optionC">100개 보기</option>
        </select>
      </div>
    );
  }

  export default ProductList;