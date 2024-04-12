import React from 'react';
import {Link} from 'react-router-dom';
import "../../styles/user/css/login.scoped.css"
import "../../styles/user/css/user-profile.scoped.css"
import "../../styles/common/css/MypageFrame.css"
import MypageFrame from "../../components/MypageFrame";
function UserProfileEdit(){

    const userProfileEdit = () => {
        return (
            <div>
                {/* 우측 회원정보 수정 */}
                <div className="user-edit-area">
                    {/* 회원정보수정 subtitle */}
                    <div className="profile_menu-title-area">
                        <h3 className="profile_title-menu">회원정보수정</h3>
                    </div>
                    {/* 회원정보수정 form */}
                    <div className="profile_board-form">
                        <form
                            id="user-profile-edit-form"
                            name="user-profile-edit-form"
                            action=""
                            method=""
                        >
                            {/* input submit */}
                            <fieldset>
                                <div class="profile_input-group w-full">
                                    <label for="id"
                                    >아이디 <span id="required-text">[필수]</span>
                                    </label>
                                    <input
                                        id="id"
                                        name="id"
                                        className="profile_input-text type-lg"
                                        type="text"
                                        placeholder="아이디"
                                        maxlength="100"
                                        required
                                    />
                                </div>
                                <div className="profile_input-group w-full">
                                    <label for="pw"
                                    >비밀번호
                                        <span id="required-text">[필수]</span></label
                                    >
                                    <input
                                        id="pw"
                                        name="pw"
                                        className="profile_input-text type-lg"
                                        type="password"
                                        placeholder="이전 비밀번호"
                                        maxlength="100"
                                        required
                                    />
                                    <input
                                        id="pw2"
                                        name="pw2"
                                        className="profile_input-text type-lg"
                                        type="password"
                                        placeholder="새 비밀번호"
                                        maxlength="100"
                                        required
                                    />
                                    <input
                                        id="pw2"
                                        name="pw2"
                                        className="profile_input-text type-lg"
                                        type="password"
                                        placeholder="새 비밀번호 확인"
                                        maxlength="100"
                                        required
                                    />
                                </div>
                                <div className="profile_input-group w-full">
                                    <label for="id">이름</label>
                                    <input
                                        id="id"
                                        name="id"
                                        className="profile_input-text type-lg"
                                        type="text"
                                        placeholder="이름"
                                        maxlength="100"
                                    />
                                </div>
                                <div className="profile_input-group w-full">
                                    <label for="id">닉네임</label>
                                    <input
                                        id="id"
                                        name="id"
                                        className="profile_input-text type-lg"
                                        type="text"
                                        placeholder="닉네임"
                                        maxlength="100"
                                    />
                                </div>
                                <div className="profile_input-group w-full">
                                    <label for="id">휴대전화</label>
                                    <input
                                        id="id"
                                        name="id"
                                        className="profile_input-text type-lg"
                                        type="text"
                                        placeholder="휴대전화"
                                        maxlength="100"
                                    />
                                </div>
                                <div className="profile_input-group w-full">
                                    <label for="email"
                                    >이메일
                                        <span id="required-text">[필수]</span></label
                                    >
                                    <input
                                        id="email"
                                        name="email"
                                        class="profile_input-text type-lg"
                                        type="email"
                                        placeholder="이메일"
                                        maxlength="100"
                                        required
                                    />
                                </div>
                                <div className="profile_input-group w-full">
                                    <label for="email">생년월일</label>
                                    <div className="select-group">
                                        <select
                                            name="year"
                                            id=""
                                            className="profile_input-text type-lg birth_select"
                                        >
                                            <option value="">년도</option>
                                            <option value="">2000</option>
                                            <option value="">2001</option>
                                            <option value="">2002</option>
                                            <option value="">2003</option>
                                            <option value="">2004</option>
                                            <option value="">2005</option>
                                            <option value="">2006</option>
                                            <option value="">2007</option>
                                            <option value="">2008</option>
                                            <option value="">2009</option>
                                            <option value="">2010</option>
                                        </select>
                                        <select
                                            name="month"
                                            id=""
                                            className="profile_input-text type-lg birth_select"
                                        >
                                            <option value="">월</option>
                                            <option value="">01</option>
                                            <option value="">02</option>
                                            <option value="">03</option>
                                            <option value="">04</option>
                                            <option value="">05</option>
                                            <option value="">06</option>
                                            <option value="">07</option>
                                            <option value="">08</option>
                                            <option value="">09</option>
                                            <option value="">10</option>
                                            <option value="">11</option>
                                            <option value="">12</option>
                                        </select>
                                        <select
                                            name="date"
                                            id=""
                                            className="profile_input-text type-lg birth_select"
                                        >
                                            <option value="">일</option>
                                            <option value="">01</option>
                                            <option value="">02</option>
                                            <option value="">03</option>
                                            <option value="">04</option>
                                            <option value="">05</option>
                                            <option value="">06</option>
                                            <option value="">07</option>
                                            <option value="">08</option>
                                            <option value="">09</option>
                                            <option value="">10</option>
                                            <option value="">11</option>
                                            <option value="">12</option>
                                            <option value="">13</option>
                                            <option value="">14</option>
                                            <option value="">15</option>
                                            <option value="">16</option>
                                            <option value="">17</option>
                                            <option value="">18</option>
                                            <option value="">19</option>
                                            <option value="">20</option>
                                            <option value="">21</option>
                                            <option value="">22</option>
                                            <option value="">23</option>
                                            <option value="">24</option>
                                            <option value="">25</option>
                                            <option value="">26</option>
                                            <option value="">27</option>
                                            <option value="">28</option>
                                            <option value="">29</option>
                                            <option value="">30</option>
                                            <option value="">31</option>
                                        </select>
                                    </div>
                                </div>
                                {/*<div className="profile_input-group w-full">*/}
                                {/*    <label for="email">성별</label>*/}
                                {/*    <input*/}
                                {/*        type="radio"*/}
                                {/*        id="male"*/}
                                {/*        name="male"*/}
                                {/*        value="남자"*/}
                                {/*        checked*/}
                                {/*    />*/}
                                {/*    <input*/}
                                {/*        type="radio"*/}
                                {/*        id="female"*/}
                                {/*        name="female"*/}
                                {/*        value="여자"*/}
                                {/*        checked*/}
                                {/*    />*/}
                                {/*</div>*/}
                                <div className="profile_page-guide-center">
                                    <ul className="profile_txt-link-list">
                                        <button
                                            type="submit"
                                            className="user_btn-secondary w-full"
                                        >
                                            <span>취소하기</span>
                                        </button>
                                        <button
                                            type="submit"
                                            className="user_btn-primary w-full"
                                        >
                                            <span>수정하기</span>
                                        </button>
                                    </ul>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return <MypageFrame>{userProfileEdit()}</MypageFrame>
}

export default UserProfileEdit;