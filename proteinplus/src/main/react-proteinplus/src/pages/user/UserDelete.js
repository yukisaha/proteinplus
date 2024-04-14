import React from 'react';
import {Link} from 'react-router-dom';
import "../../styles/user/css/login.scoped.css"
import MypageFrame from "../../components/MypageFrame";

function UserDelete(){

    const userDelete = () => {
        return(
            <div>
                <div className="user-delete-area">
                    {/* 회원탈퇴 유의사항 */}
                    <div className="user-delete-txt">
                        <div className="profile_menu-title-area">
                            <h3 className="profile_title-menu">회원탈퇴</h3>
                        </div>
                        <div className="profile_board-form">
                            <div className="profile_input-guide-box">
                                <div className="profile_inner">
                                    <h4 className="profile_box-tit">탈퇴 유의사항</h4>
                                    <p className="profile_txt">
                                        * 탈퇴하실 경우 구매내역 확인은 물론 로그인 후
                                        가능한 모든 기능은 사용하실 수 없습니다.<br />
                                        * 탈퇴하신 후에 회원 정보의 복구는 불가능하며,
                                        보유하신 쿠폰이나 적립금도 모두 무효화됩니다.<br />
                                        * 탈퇴하신 후 동일한 이메일, 휴대폰 번호로 재 가입은
                                        탈퇴일로부터 90일 이후 가능합니다.
                                    </p>
                                </div>
                            </div>
                            {/* input-guide-box */}
                        </div>
                    </div>
                    {/* 회원탈퇴 form */}
                    <div className="profile_frame-inner">
                        {/*<span>탈퇴사유</span>*/}
                        {/*<form*/}
                        {/*    id="user-delete_form"*/}
                        {/*    name="user-delete_form"*/}
                        {/*    action=""*/}
                        {/*    method=""*/}
                        {/*    onsubmit=""*/}
                        {/*>*/}
                        {/*    <textarea></textarea>*/}
                        <div className="profile_page-guide-center">
                            <ul className="profile_txt-link-list">
                                <button
                                    type="submit"
                                    className="user_btn-secondary w-full"
                                >
                                    <span>취소</span>
                                </button>
                                <button type="submit" className="user_btn-primary w-full">
                                    <span>확인</span>
                                </button>
                            </ul>
                        </div>
                        {/*</form>*/}
                    </div>
                </div>
            </div>
        );
    }

    return<MypageFrame>{userDelete()}</MypageFrame>
}

export default UserDelete;