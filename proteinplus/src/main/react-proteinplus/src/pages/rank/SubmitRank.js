import React, {useEffect, useState} from 'react';
import "../../styles/common/css/Header.css"
import "../../styles/rank/css/SubmitRank.scoped.css"
import axios from "axios";

export default function SubmitRank() {

    const Spring_Server_Ip = process.env.REACT_APP_Spring_Server_Ip;

    //랭크 카테고리 조회
    const [rankCategory, setRankCategory] = useState([]);

    //선택된 랭크 id
    const [selectedRankId, setSelectedRankId] = useState("default");

    //랭크 카테고리에 포함되지 않은 카테고리 조회
    const [selectedExceptRankId, setSelectedExceptRankId] = useState("default");
    const [exceptRankCategory, setExceptRankCategory] = useState([]);

    const [rankCategoryName, setRankCategoryName] = useState("랭크 카테고리");


    async function findRank() { // Axios 방식 사용
        const response = await axios.get(`${Spring_Server_Ip}/rank`);
        setRankCategory(response.data);
    }

    async function findExceptRank() { // Axios 방식 사용
        const response = await axios.get(`${Spring_Server_Ip}/rank/except`);
        setExceptRankCategory(response.data);
    }

    useEffect(() => {
        findRank();
        findExceptRank();
    },[])


    useEffect(() =>{

        if(selectedRankId !== "default"){
            const selectedRank = rankCategory.find(rankCategory => rankCategory.id === parseInt(selectedRankId));

            if(selectedRank){
                setRankCategoryName(selectedRank.name);
            }else{
                setRankCategoryName("랭크 카테고리");
            }
        }

        findExceptRank();
    }, [selectedRankId])

    const [exceptRankCategoryName, setExceptRankCategoryName] = useState("랭크에 포함되지 않은 카테고리");

    useEffect(() => {

        if(selectedExceptRankId !== "default"){
            const selectedExceptRank = exceptRankCategory.find(exceptRankCategory => exceptRankCategory.id === parseInt(selectedExceptRankId));

            if(selectedExceptRank){
                setExceptRankCategoryName(selectedExceptRank.name);
            }else{
                setExceptRankCategoryName("랭크에 포함되지 않은 카테고리");
            }
        }

    }, [selectedExceptRankId])

    const handleRankSelect = (e) => {
        const selectedId = e.target.value;
        setSelectedRankId(selectedId);
        setSelectedExceptRankId("default");
    }

    const handleExceptRankSelect = (e) => {
        const exceptRankId = e.target.value;
        setSelectedExceptRankId(exceptRankId);
    }

    const createRankCategory = async (e, selectedExceptRankId) => {
        e.preventDefault();
        let data = { category_id: parseInt(selectedExceptRankId) };
        try {
            await axios.post(`${Spring_Server_Ip}/rank/add`, null, {params: data});
            alert("카테고리가 성공적으로 추가되었습니다.");
            findRank();
            findExceptRank();
            setExceptRankCategoryName("랭크에 포함되지 않은 카테고리");
        } catch (error) {
            alert("카테고리 추가에 실패했습니다.");
        }
    }

    const deleteCategory = async (e, selectedRankId) => {
        e.preventDefault();

        let data = { category_id: selectedRankId };
        try {
            await axios.delete(`${Spring_Server_Ip}/rank/delete`, {params: data});
            alert("성공적으로 삭제되었습니다.");
            findRank();
            findExceptRank();
            setRankCategoryName("랭크 카테고리");
        } catch (error) {
            alert("오류가 발생했습니다");
        }
    }

    return (
        <div className={`submitRankContainer`}>
            <h1>랭크 카테고리 관리</h1>
            <div className={`selectRankContainer`}>
                {/*왼쪽 50퍼 사용*/}
                <div className={`selectRank`}>
                    <form id="findRankForm">
                        <div className={`title`}>
                            <h2>랭크 카테고리 조회</h2>
                            {/* 부모 카테고리 */}
                            <select id="rank"
                                    required
                                    onChange={handleRankSelect}
                                    value={selectedRankId}
                            >
                                <option value={"default"}>랭크 카테고리 선택</option>
                                {rankCategory.map((rank) => (
                                    <option value={rank.id}>{rank.name}</option>
                                ))}
                            </select>
                        </div>

                        {/*랭크에 추가되지 않은 카테고리 목록 보여주자*/}
                        <div className={`title2`}>
                            <h2>랭크에 포함되지 않은 카테고리 조회</h2>
                            <select id="exceptRank"
                                    required
                                    onChange={handleExceptRankSelect}
                                    value={selectedExceptRankId}
                            >
                                <option value={"default"}>추가하고자 하는 카테고리 선택</option>
                                {exceptRankCategory.map((rank) => (
                                    <option value={rank.id}>{rank.name}</option>
                                ))}
                            </select>
                        </div>
                    </form>
                </div>

                {/*오른쪽 50퍼 사용*/}
                <div className={`submitRank`}>
                    <div className={`changeRank_first_add`}>
                        <form id="createRankCategoryForm" onSubmit={(e) => createRankCategory(e, selectedExceptRankId)} >
                            <h2>랭크 카테고리 추가</h2>
                            <div className="form-row">
                                <div  className={`selectedCategory`}>[{exceptRankCategoryName}] 카테고리가 랭크에 추가됩니다</div>
                                <button type="submit">카테고리 추가하기</button>
                            </div>
                        </form>
                    </div>

                    <div className={`changeRank`}>
                        {/*  삭제는 목록중 선택 하면 되는걸로 */}
                        <form id="deleteRankForm" onSubmit={(e) => deleteCategory(e, selectedRankId)} >
                            <h2>제품 카테고리 삭제</h2>
                            <div className="form-row">
                                <div className={`selectedCategory`}>[{rankCategoryName}] 카테고리가 랭크에서 삭제됩니다</div>
                                <button type="submit">카테고리 삭제하기</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
