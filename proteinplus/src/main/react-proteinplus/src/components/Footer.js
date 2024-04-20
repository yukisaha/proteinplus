import React from 'react';
import '../styles/common/css/Footer.css';

export default function Footer() {
    return (
        <footer id="footer" className="footer">
            <div className="footer-menu">
                <div className="frame-sm">
                    <ul className="footer-menu-list">
                        <li><a>회사소개</a></li>
                        <li><a>공지사항</a></li>
                        <li><a>입점 · 제휴 · 광고문의</a></li>
                        <li><a>이용약관</a></li>
                        <li><a className="text-black2 text-md">개인정보처리방침</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-info">
                <strong className="footer-logo"><span>ProteinPlus</span></strong>
                <div className="colum-info">
                    <h5 className="blind">회사 정보</h5>
                    <ul className="footer-biz-info">
                        <li><span className="company-name">(주)프로틴플러스</span></li>
                        <li>대표 : 엘리스 </li>
                        <li> 주소 : 서울특별시 마포구 </li>
                        <li> 사업자등록번호 : 123-12-12345
                            사업자정보 확인
                        </li>
                        <li> 통신판매업신고번호 : 제1234-서울마포-1234호</li>
                        <li> 개인정보보호책임자 : 모자장수</li>
                    </ul>
                    <p className="copyright">Copyright©ProteinPlus All rights reserved.</p>
                </div>
                <div className="colum-info">
                    <ul className="customer-info">
                        <li className="cscenter">고객센터 <em className="footer-tel">02-6405-8088</em></li>
                        <li>FAX. 02-1234-1234</li>
                        <li>E-mail. admin@proteinplus.com</li>
                    </ul>
                    <div className="customer-btns">
                        <a href="#"><span>고객의 제안</span></a>
                        <a href="#"><span>1:1 문의</span></a>
                    </div>
                    <ul className="footer-sns-list">
                        <li><a target="_blank"><i className="ico-sns-facebook"></i><span className="blind">페이스북</span></a></li>
                        <li><a target="_blank"><i className="ico-sns-instagram"></i><span className="blind">인스타그램</span></a></li>
                        <li><a target="_blank"><i className="ico-sns-blog"></i><span className="blind">네이버블로그</span></a></li>
                        <li><a target="_blank"><i className="ico-sns-post"></i><span className="blind">네이버포스트</span></a></li>
                        <li><a target="_blank"><i className="ico-sns-kakaotalk"></i><span className="blind">카카오톡</span></a></li>
                        <li><a target="_blank"><i className="ico-sns-youtube"></i><span className="blind">유튜브</span></a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
