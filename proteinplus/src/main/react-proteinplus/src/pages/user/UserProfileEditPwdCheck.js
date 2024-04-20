import React, {useState} from 'react';
import "../../styles/user/css/login.scoped.css"
import "../../styles/user/css/user-profile.scoped.css"
import "../../styles/common/css/MypageFrame.css"
import MypageFrame from "../../components/MypageFrame";
import axios from "axios";
import {useNavigate} from "react-router-dom";
function UserProfileEditPwdCheck(){

    const Spring_Server_Ip = process.env.REACT_APP_Spring_Server_Ip
    const token = window.localStorage.getItem("token");

    const navigate = useNavigate();

    const [loginPwd, setLoginPwd] = useState("");

    const handleLoginPwdChange = (e) => {
        const LoginPwd = e.target.value;
        setLoginPwd(LoginPwd);
    };

    const pwdCheck = async (e) => {
        e.preventDefault(); // 폼의 기본 제출 동작을 막음

        try {
            const data = {
                loginPwd: loginPwd
            };
            const response = await axios.get(`${Spring_Server_Ip}/member/pwdCheck`, {params: data, headers: {Authorization: `${token}`}});
            //성공했을경우 수정 페이지로
            console.log(response.data);
            if(response.data === true){
                navigate('/mypage/info/edit');
            }else{
                alert("비밀번호가 일치하지 않습니다");
            }
        } catch (error) {
            alert("비밀번호가 일치하지 않습니다");
        }
    };

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
                                <form id="pwd_check_form" className="pwd_check_form" onSubmit={pwdCheck}>
                                    <div class="profile_button-group">
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            class="profile_input-text type-lg profile_input-group-first"
                                            onChange={handleLoginPwdChange}
                                            value={loginPwd}
                                            placeholder="비밀번호"
                                            maxLength="20"
                                            required
                                        />
                                        <button
                                            type={`submit`}
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