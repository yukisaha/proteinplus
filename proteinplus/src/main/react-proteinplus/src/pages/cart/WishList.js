import React, { useState } from 'react';
import MypageFrame from '../../components/MypageFrame';
import '../../styles/cart/css/WishList.css';

export default function WishList() {

  const [selectedProducts, setSelectedProducts] = useState([]);

  // 임시 데이터를 사용하여 상품 목록 생성
  const tempProductData = [
    {
      id: 1,
      name: '[맛있닭] 닭가슴살 스테이크',
      imageUrl: 'https://file.rankingdak.com/image/RANK/PRODUCT/PRD001/20240109/IMG1704AEO777787343_330_330.jpg',
      salePercent: 29,
      price: '17,900',
      originalPrice: '24,900',
      rating: '★4.9',
      totalRating: '(82,648)',
    },
    {
      id: 2,
      name: '[한끼통살] 닭가슴살',
      imageUrl: 'https://file.rankingdak.com/image/RANK/PRODUCT/PRD001/20231214/IMG1702pnr545701505_330_330.jpg',
      salePercent: 22,
      price: '21,600',
      originalPrice: '26,600',
      rating: '★4.7',
      totalRating: '(13,445)',
    },
    {
      id: 1,
      name: '[맛있닭] 닭가슴살 스테이크',
      imageUrl: 'https://file.rankingdak.com/image/RANK/PRODUCT/PRD001/20240109/IMG1704AEO777787343_330_330.jpg',
      salePercent: 29,
      price: '17,900',
      originalPrice: '24,900',
      rating: '★4.9',
      totalRating: '(82,648)',
    },
        {
          id: 1,
          name: '[맛있닭] 닭가슴살 스테이크',
          imageUrl: 'https://file.rankingdak.com/image/RANK/PRODUCT/PRD001/20240109/IMG1704AEO777787343_330_330.jpg',
          salePercent: 29,
          price: '17,900',
          originalPrice: '24,900',
          rating: '★4.9',
          totalRating: '(82,648)',
        },    {
                id: 1,
                name: '[맛있닭] 닭가슴살 스테이크',
                imageUrl: 'https://file.rankingdak.com/image/RANK/PRODUCT/PRD001/20240109/IMG1704AEO777787343_330_330.jpg',
                salePercent: 29,
                price: '17,900',
                originalPrice: '24,900',
                rating: '★4.9',
                totalRating: '(82,648)',
              },

    // 추가적인 상품 데이터를 이곳에 추가할 수 있습니다.
  ];

  // 상품 선택 체크박스 핸들러
  const handleCheckboxChange = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  // 상품 삭제 버튼 핸들러
  const handleDeleteSelected = () => {
    // 선택된 상품들을 삭제하는 로직을 구현(아직안함)

    // 이 예제에서는 선택된 상품들의 ID를 콘솔에 출력
    console.log('Delete selected products:', selectedProducts);
    // 삭제 후 선택된 상품 목록 초기화
    setSelectedProducts([]);
  };

  // 찜한 상품이 있으면 상품 목록을, 없으면 메시지를 반환하는 함수
  const renderWishlistItems = () => {
    if (tempProductData.length === 0) {
      return (
        <div>
          <div className="menu-title-area">
            <h3 className="title-menu">찜한 상품</h3>
            <div className="right" style={{ display: 'block' }}>
            </div>
          </div>
          <div className="grid-list-wrap ui-compare-select">
            <ul id="wishList" className="prd-item-list grid-area-span4 gap33">
              <div class="no-data">
                <p class="message">
                  찜 상품이 없습니다.
                </p>
              </div>
            </ul>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="menu-title-area">
          <h3 className="title-menu">찜한 상품</h3>
          <div className="right" style={{ display: 'block' }}>
            <button type="button" className="btn-link-txt5" id="btnDeltAll">
              <i className="ico-btn-delete"></i><span>전체삭제</span>
            </button>
          </div>
        </div>
        <div className="grid-list-wrap ui-compare-select">
          <ul id="wishList" className="prd-item-list grid-area-span4 gap33">
            {tempProductData.map((product) => (
              <li key={product.id} className="list-renewal ext-li colum" data-list="1">
                <div className="prd-item type-sm2">
                  <figure className="img w180">
                    <a href={`/product/view?productCd=${product.id}`}>
                      <img
                        className="lozad"
                        data-src={product.imageUrl}
                        alt={product.name}
                        src={product.imageUrl}
                        data-loaded="true"
                      />
                    </a>
                    <button type="button" className="btn-icon-cart2 btn-ext-cart" title="">
                      <span className="blind">장바구니</span>
                    </button>
                  </figure>
                  <div className="desc-bottom">
                    <p className="tit">
                      <a href={`/product/view?productCd=${product.id}`} className="text-elps2">
                        {product.name}
                      </a>
                    </p>
                    <div className="price-flex">
                      <span className="sale">
                        <strong>{product.salePercent}</strong>%
                      </span>
                      <span className="price">
                        <em className="num">{product.price}</em>원
                      </span>
                      <p className="origin">
                        <span>{product.originalPrice}</span>원
                      </p>
                    </div>
                    <div className="rating-simply">
                      <span className="score">{product.rating}</span>
                      <span className="total-num">{product.totalRating}</span>
                    </div>
                  </div>
                  <div className="desc-form">
                    <ul className="btns-list">
                      <li>
                        <div className="custom-checkbox">
                          <input
                            type="checkbox"
                            id={`check-${product.id}`}
                            className="checkbox-wish btn-ext-wish"
                            name="check-wish-item"
                            checked={selectedProducts.includes(product.id)}
                            onChange={() => handleCheckboxChange(product.id)}
                          />
                          <label htmlFor={`check-${product.id}`} title="">
                            <span className="blind">찜하기</span>
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            ))}
            {renderPagination()}
          </ul>
        </div>
      </div>
    );
  };

  // 페이지 이동 버튼 렌더링 함수
  const renderPagination = () => {
    return (
      <div className="pagination mt20" style={{ marginTop: '60px' }}>
        <a href="javascript:CmPageMove('0')" data-page="0" className="btn-page prev">
          <span className="page-move-blind">이전</span>
        </a>
        <a href="#" className="current">
          <span>1</span>
        </a>
        <a href="javascript:CmPageMove('2')" data-page="2" className="btn-page next">
          <span className="page-move-blind">다음</span>
        </a>
      </div>
    );
  };

  return <MypageFrame>{renderWishlistItems()}</MypageFrame>;
}
