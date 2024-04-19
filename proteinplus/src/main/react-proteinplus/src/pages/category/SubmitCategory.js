import React, {useEffect, useState} from 'react';
import "../../styles/common/css/Header.css"
import "../../styles/category/css/SubmitCategory.scoped.css"
import axios from "axios";

export default function SubmitCategory() {

    const Spring_Server_Ip = process.env.REACT_APP_Spring_Server_Ip;

    //부모 카테고리 조회
    const [parentCategory, setParentCategory] = useState([]);
    async function findParentCategory() { // Axios 방식 사용
        const response = await axios.get(`${Spring_Server_Ip}/category`);
        console.log("parentCategory = ", response.data);
        setParentCategory(response.data);
    }

    useEffect(() => {
        findParentCategory();
    },[])

    //자식 카테고리 조회
    // 부모 카테고리 선택 상태
    const [selectedParentId, setSelectedParentId] = useState("default");
    // 자식 카테고리 선택 상태
    const [selectedChildId, setSelectedChildId] = useState("default");
    const [childCategory, setChildCategory] = useState([]);

    const [parentCategoryName, setParentCategoryName] = useState("1차 카테고리");
    async function findChildCategory(selectedParentId) { // Axios 방식 사용
        const response = await axios.get(`${Spring_Server_Ip}/category/${selectedParentId}`);
        console.log("childCategory = ", response.data);
        setChildCategory(response.data);
    }

    useEffect(() => {
        if (selectedParentId !== "default") {
            //해당 부모 카테고리의 이름 조회
            const selectedParentCategory = parentCategory.find(category => category.id === parseInt(selectedParentId));

            if (selectedParentCategory) {
                setParentCategoryName(selectedParentCategory.name);
            } else {
                setParentCategoryName("1차 카테고리");
                console.log("Selected Parent Category Not Found");
            }

            findChildCategory(selectedParentId);
        }else{
            setParentCategoryName("1차 카테고리");
        }
    }, [selectedParentId, parentCategory]);

    const handleParentSelect = (e) => {
        const parentId = e.target.value;
        setSelectedParentId(parentId);
        setSelectedChildId("default"); // 부모 카테고리가 변경되면 자식 카테고리 선택값 초기화
    }

    const handleChildSelect = (e) => {
        const childId = e.target.value;
        setSelectedChildId(childId);
    }

    //부모 카테고리 추가
    const [newParentCategoryName, setNewParentCategoryName] = useState("");

    const handleParentCategoryNameChange = (e) => {
        const newCategoryName = e.target.value;
        setNewParentCategoryName(newCategoryName);
    }

    const createParentCategory = async (e) => {
        e.preventDefault();
        try {
            const name = newParentCategoryName;
            await axios.post(`${Spring_Server_Ip}/category/add`, null, {params: {name}});
            alert("카테고리가 성공적으로 추가되었습니다.");
            setNewParentCategoryName(""); // 추가 후 입력 필드 초기화
            findParentCategory();
        } catch (error) {
            alert("카테고리 추가에 실패했습니다.");
        }
    }

    const [newChildCategoryName, setNewChildCategoryName] = useState("");

    const handleChildCategoryNameChange = (e) => {
        const newCategoryName = e.target.value;
        setNewChildCategoryName(newCategoryName);
    }

    const createChildCategory = async (e, selectedParentId) => {
        console.log("selectedParentId", selectedParentId);
        e.preventDefault();
        try {
            const data = {
                name: newChildCategoryName, parent_id: parseInt(selectedParentId)
            };
            console.log(data);
            await axios.post(`${Spring_Server_Ip}/category/add/${selectedParentId}`, null, {params: data});
            alert("카테고리가 성공적으로 추가되었습니다.");
            setNewChildCategoryName(""); // 추가 후 입력 필드 초기화
            findParentCategory();
        } catch (error) {
            alert("1차 카테고리를 선택해주세요.");
        }
    }

    const [childCategoryName, setChildCategoryName] = useState("2차 카테고리");

    const [updateCategoryName, setUpdateCategoryName] = useState("1차 카테고리 또는 2차 카테고리")

    useEffect(() => {
        if (selectedChildId !== 'default') {
            const selectedChildCategory = childCategory.find(category => category.id === parseInt(selectedChildId));
            if (selectedChildCategory) {
                setChildCategoryName(selectedChildCategory.name);
                setUpdateCategoryName(selectedChildCategory.name);
            } else {
                setChildCategoryName('2차 카테고리');
                setUpdateCategoryName('2차 카테고리');
                console.log('Selected Child Category Not Found');
            }
        } else {
            if (selectedParentId !== 'default') {
                setUpdateCategoryName(parentCategoryName);
            } else {
                setUpdateCategoryName('1차 카테고리 또는 2차 카테고리');
            }
            setChildCategoryName('2차 카테고리');
        }
    }, [selectedChildId, childCategory, selectedParentId, parentCategory, parentCategoryName]);


    const [categoryNameChange, setCategoryNameChange] = useState("");

    const handleUpdateCategoryNameChange = (e) => {
        const newCategoryName = e.target.value;
        setCategoryNameChange(newCategoryName);
    }

    //카테고리명 수정
    //자식 카테고리id 가 있으면 그걸 가져오고 없으면 부모 카테고리id가져오기
    const updateCategory = async (e, selectedParentId, selectedChildId) => {
        e.preventDefault();

        let data;
        if (selectedChildId === "default") {
            console.log("categoryNameChange = ", categoryNameChange);
            console.log("categoryId = ", parseInt(selectedParentId));
            data = {
                id: parseInt(selectedParentId),
                name: categoryNameChange
            };
            setUpdateCategoryName(parentCategoryName);
        } else {
            data = {
                id: parseInt(selectedChildId),
                name: categoryNameChange
            };
            setUpdateCategoryName(childCategoryName);
        }
        try {
            await axios.put(`${Spring_Server_Ip}/category/edit`, null, {params: data});
            alert("카테고리명이 성공적으로 변경되었습니다.");
            setCategoryNameChange(""); // 추가 후 입력 필드 초기화
            findParentCategory();
        } catch (error) {
            alert("카테고리를 선택해주세요.");
        }
    }

    const deleteCategory = async (e, selectedParentId, selectedChildId) => {
        e.preventDefault();

        let data;
        if (selectedChildId == "default") {
            data = {
                category_id:selectedParentId
            };
            setUpdateCategoryName(parentCategoryName);
        } else {
            data = {
                category_id: selectedChildId
            };
            setUpdateCategoryName(childCategoryName);
        }
        try {
            await axios.delete(`${Spring_Server_Ip}/category/delete`, {params: data});
            alert("카테고리가 성공적으로 삭제되었습니다.");
            setCategoryNameChange(""); // 추가 후 입력 필드 초기화
            findParentCategory();
        } catch (error) {
            alert("삭제할 수 없는 카테고리입니다");
        }
    }

    return (
        <div className={`submitCategoryContainer`}>
            <h1>카테고리 관리</h1>
            <div className={`selectCategoryContainer`}>
                {/*왼쪽 50퍼 사용*/}
                <div className={`selectCategory`}>
                    <form id="findCategoryForm">

                        <h2>제품 카테고리 조회</h2>
                        {/* 부모 카테고리 */}
                        <select id="mainCategory"
                                required
                                onChange={handleParentSelect}
                                value={selectedParentId}
                        >
                            <option value={"default"}>1차 카테고리 선택</option>
                            {parentCategory.map((category) => (
                                <option value={category.id}>{category.name}</option>
                            ))}
                        </select>

                        {/* 자식 카테고리 */}
                        <select id="subCategory"
                                required
                                onChange={handleChildSelect}
                                value={selectedChildId}
                        >
                            <option value={"default"}>2차 카테고리 선택</option>
                            {childCategory.map((category) => (
                                <option value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </form>
                </div>

                {/*오른쪽 50퍼 사용*/}
                <div className={`submitCategory`}>
                    <div className={`changeCategory_first_add`}>
                        <form id="createParentCategoryForm" onSubmit={createParentCategory} >
                            <h2>상위 카테고리 추가</h2>
                            <div className="form-row">
                                <div>
                                    <label htmlFor="newParentCategoryName" className="required">카테고리명</label>
                                    <input type="text"
                                           id="newParentCategoryName"
                                           value={newParentCategoryName}
                                           onChange={handleParentCategoryNameChange}
                                           placeholder="추가할 카테고리명 입력"
                                           required
                                    />
                                </div>
                                <button type="submit">카테고리 추가하기</button>
                            </div>
                        </form>
                    </div>

                    <div className={`changeCategory`}>
                        <form id="createParentCategoryForm" onSubmit={(e) => createChildCategory(e, selectedParentId)} >
                            {/* 선택된 부모 카테고리 보여줌*/}
                            <h2>하위 카테고리 추가</h2>
                            <div className={`selectedCategory`}>[{parentCategoryName}] 카테고리 아래에 카테고리가 추가됩니다</div>
                            <div className="form-row">
                                <div>
                                    <label htmlFor="newChildCategoryName" className="required">카테고리명</label>
                                    <input type="text"
                                           id="newChildCategoryName"
                                           value={newChildCategoryName}
                                           onChange={handleChildCategoryNameChange}
                                           placeholder="추가할 카테고리명 입력"
                                           required
                                    />
                                </div>
                                <button type="submit">카테고리 추가하기</button>
                            </div>
                        </form>
                    </div>

                    <div className={`changeCategory`}>
                        <form id="updateParentCategoryForm" onSubmit={(e) => updateCategory(e, selectedParentId, selectedChildId)} >
                            <h2>제품 카테고리명 변경</h2>
                            <div className={`selectedCategory`}>[{updateCategoryName}] 카테고리의 카테고리명이 변경됩니다</div>
                            <div className="form-row">
                                <div>
                                    <label htmlFor="categoryNameChange" className="required">카테고리명</label>
                                    <input type="text"
                                           id="categoryNameChange"
                                           value={categoryNameChange}
                                           onChange={handleUpdateCategoryNameChange}
                                           placeholder="변경할 카테고리명 입력"
                                           required
                                    />
                                </div>
                                <button type="submit">카테고리 수정하기</button>
                            </div>
                        </form>
                    </div>

                    <div className={`changeCategory`}>
                        {/*  삭제는 목록중 선택 하면 되는걸로 */}
                        <form id="deleteCategoryForm" onSubmit={(e) => deleteCategory(e, selectedParentId, selectedChildId)} >
                            <h2>제품 카테고리 삭제</h2>
                            <h4 className={`deleteWarning`}>*카테고리에 지정된 상품이 있는 경우 삭제가 불가능합니다*</h4>
                            <h4 className={`deleteWarning`}>*해당 카테고리를 참조하는 카테고리가 있는 경우 삭제가 불가능 합니다*</h4>
                            <div className="form-row">
                                <div className={`selectedCategory`}>[{updateCategoryName}] 카테고리가 삭제됩니다</div>
                                <button type="submit">카테고리 삭제하기</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
