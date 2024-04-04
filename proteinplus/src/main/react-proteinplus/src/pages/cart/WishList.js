import React from 'react';
import MypageFrame from '../../components/MypageFrame'; // MypageFrame 컴포넌트 import 추가
import '../../styles/cart/css/WishList.css';

export default function App() {
  return (
    <MypageFrame> {/* MypageFrame으로 감싸기 */}
      {/* 여기서부터 코드 추가 */}
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
          <li className="list-renewal ext-li colum" data-list="1">
            <div className="prd-item type-sm2">
              <figure className="img w180">
                <a href="/product/view?productCd=923">
                  <img className="lozad"
                    data-src="https://file.rankingdak.com/image/RANK/PRODUCT/PRD001/20240109/IMG1704AEO777787343_330_330.jpg"
                    alt="[맛있닭] 닭가슴살 스테이크"
                    src="https://file.rankingdak.com/image/RANK/PRODUCT/PRD001/20240109/IMG1704AEO777787343_330_330.jpg"
                    data-loaded="true"
                  />
                </a>
                <button type="button" className="btn-icon-cart2 btn-ext-cart" title="">
                  <span className="blind">장바구니</span>
                </button>
              </figure>
              <div className="desc-bottom">
                <p className="tit">
                  <a href="/product/view?productCd=923" className="text-elps2">[맛있닭] 닭가슴살 스테이크</a>
                </p>
                <div className="price-flex">
                  <span className="sale"><strong>29</strong>%</span>
                  <span className="price"><em className="num">17,900</em>원</span>
                  <p className="origin"><span>24,900</span>원</p>
                </div>
                <div className="rating-simply">
                  <span className="score">★4.9</span>
                  <span className="total-num">(82,648)</span>
                </div>
              </div>{/*// desc-bottom */}
              <div className="desc-form">
                <ul className="btns-list">
                  <li>
                    <div className="custom-checkbox">
                      <input type="checkbox" id="check-0"
                        className="checkbox-wish btn-ext-wish"
                        name="check-wish-item" checked=""
                      />
                      <label htmlFor="check-0" title="">
                        <span className="blind">♥</span>
                      </label>
                    </div>
                  </li>
                </ul>
              </div>{/*// desc-form */}
            </div>
          </li>
          <div className="pagination mt20" style={{ marginTop: '60px' }}>
            <a href="javascript:CmPageMove('0')" data-page="0" className="btn-page prev">
              <span className="page-move-blind">이전</span>
            </a>
            <a href="#" className="current"><span>1</span></a>
            <a href="javascript:CmPageMove('2')" data-page="2" className="btn-page next">
              <span className="page-move-blind">다음</span>
            </a>
          </div>
        </ul>{/*// prd-item-list */}
      </div>
    </MypageFrame>
  );
}
