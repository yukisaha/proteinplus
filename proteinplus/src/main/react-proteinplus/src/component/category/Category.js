import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../res/css/category/category.css';

function Category() {

    //카테고리 키값
    const categories = [
        { id: 0, text: '전체', name: 'c0100' },    //name : url에 들어갈 값
        { id: 1, text: '프로', name: 'c0101' },
        { id: 2, text: '스팀/소프트', name: 'c0102' },
        { id: 3, text: '소스닭가슴살', name: 'c0103' },
        { id: 4, text: '스테이크', name: 'c0104' },
        { id: 5, text: '소시지/햄', name: 'c0105' },
        { id: 6, text: '저염/염분무첨가', name: 'c0106' },
        { id: 7, text: '생 닭가슴살', name: 'c0107' },
        { id: 8, text: '훈제', name: 'c0108' },
        { id: 9, text: '볼/큐브', name: 'c0109' },
        { id: 10, text: '슬라이스', name: 'c0110' },
        { id: 11, text: '냉장/실온보관', name: 'c0111' },
        { id: 12, text: '핫바/어묵바', name: 'c0112' },
        { id: 13, text: '스낵/칩', name: 'c0113' },
        { id: 14, text: '크리스피', name: 'c0114' },
        { id: 15, text: '육포', name: 'c0115' }
    ]


    const category = "닭가슴살";

    const location = useLocation();

    return (
        <div className="content-wrap frame-sm">
            <div className="page-title-area">
                <h2 className="title-page-type2">{category}</h2>
            </div>
            <div className="prd-top-bnr"></div>
            <div className="detail-category-tb-wrap">
                <div className="detail-category-table">
                    {/* categories 배열을 매핑하여 동적으로 카테고리 목록 생성 */}
                    {categories.map(cat => (
                        <div className={`category-list ${location.pathname === `/product/list/${cat.name}` ? 'active' : ''}`} key={cat.id}>
                            {/* Link를 사용하여 동적으로 링크 생성 */}
                            <Link to={`/product/list/${cat.name}`}>{cat.text}</Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Category;