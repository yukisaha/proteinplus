import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Header from '../../components/Header'; // frame.js에서 Header 함수 import
import Footer from '../../components/Footer'; // frame.js에서 Footer 함수 import
import '../../styles/category/css/Category.css';
import axios from "axios";

function Category() {

    const baseUrl = "http://localhost:8080";

    const location = useLocation();

    const { categoryId } = useParams(); // URL에서 카테고리 이름 파라미터 추출

    const [ categoryData, setCategoryData ] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]); // 선택된 카테고리 상태

    const [title, setTitle] = useState('');

    useEffect(() => {
        // 카테고리 데이터 가져오기
        getCategory();
    }, []);

    useEffect(() => {
        // URL 파라미터값에 따라 선택된 카테고리 설정
        const selected = categoryData.find(category => category.id === parseInt(categoryId));

        if (selected) {
            // 선택된 categoryId가 parentCategory인 경우
            if (!selected.parent) {
                const filteredCategories = categoryData.filter(category => category.parent && category.parent.id === selected.id);
                setSelectedCategory(filteredCategories);

                setTitle(selected.name);
            } else {
                // 선택된 categoryId가 ChildCategory인 경우
                const parentCategory = categoryData.find(category => category.id === selected.parent.id);

                //부모 categoryId에 해당하는 자식 카테고리들
                const filteredCategories = categoryData.filter(category => category.parent && category.parent.id === parentCategory.id);
                setSelectedCategory(filteredCategories);
                setTitle(parentCategory.name);
            }
        }

    }, [categoryData, categoryId]);

    async function getCategory() { // Axios 방식 사용
        const response = await axios.get(`${baseUrl}/admin/category/test`);

        setCategoryData(response.data);
    }

    return (
        <div className="wrap main">
            <Header /> {/* Header 컴포넌트 추가 */}
            <section id="contents" className="container">
                <div className="content-wrap frame-sm">
                    <div className="page-title-area">
                        <h2 className="title-page-type2">{title}</h2>
                    </div>
                    <div className="prd-top-bnr"></div>
                    <div className="detail-category-tb-wrap">
                            <div className="detail-category-table">
                                {selectedCategory.map((category, idx) => (
                                    <div key={idx} className={`category-list ${location.pathname === `/product/list/${category.id}` ? 'active' : ''}`}>
                                        <ul>
                                            <li>
                                                <Link to={`/product/list/${category.id}`}>
                                                    {category.name}
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                ))}
                            </div>
                    </div>
                </div>
            </section>
            <Footer /> {/* Footer 컴포넌트 추가 */}
        </div>
    );
}

export default Category;