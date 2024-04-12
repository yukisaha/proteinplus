import React from 'react';
import {Link} from 'react-router-dom';
import "../../styles/user/css/login.scoped.css"
import "../../styles/user/css/user-profile.scoped.css"
import "../../styles/common/css/MypageFrame.css"
import MypageFrame from "../../components/MypageFrame";
function UserProfileEditPwdCheck(){

    const userProfileEditPwdCheck = () => {
        return (
            <div>
                {/* 우측 pwd체크 */}
                <div class="user-edit-area">
                    {/* 회원정보수정 subtitle */}
                    <div class="profile_menu-title-area">
                        <h3 class="profile_title-menu">회원정보수정</h3>
                    </div>
                    {/* 회원정보수정 pwd체크 */}
                    <div class="profile_board-form">
                        <div class="profile_input-guide-box">
                            <div class="profile_inner">
                                <h4 class="profile_box-tit">
                                    비밀번호를 입력해주세요.
                                </h4>
                                <p class="profile_txt">
                                    회원님의 개인정보 보호를 위해 비밀번호를 다시 한번
                                    확인 합니다.<br />비밀번호가 노출되지 않도록
                                    주의해주세요.
                                </p>
                            </div>
                            {/* pw확인 form */}
                            <div class="profile_inner">
                                <form
                                    id="user-pw-check-form"
                                    name="user-pw-check-form"
                                    action=""
                                    method=""
                                    onsubmit=""
                                >
                                    <div class="profile_button-group">
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            class="profile_input-text type-lg profile_input-group-first"
                                            placeholder="비밀번호 입력"
                                        />
                                        <button
                                            type="submit"
                                            class="user_btn-primary profile_input-group-second"
                                        >
                                            <span>확인</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return <MypageFrame>{userProfileEditPwdCheck()}</MypageFrame>
}

export default UserProfileEditPwdCheck;