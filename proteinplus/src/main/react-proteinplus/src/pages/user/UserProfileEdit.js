import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import "../../styles/user/css/login.scoped.css"
import "../../styles/user/css/join.scoped.css"
import "../../styles/user/css/user-profile.scoped.css"
import "../../styles/common/css/MypageFrame.css"
import MypageFrame from "../../components/MypageFrame";
import axios from "axios";
function UserProfileEdit(){

    const token = window.localStorage.getItem("token");

    const [id, setId] = useState("");
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("");
    const [loginPwd, setLoginPwd] = useState("");
    const [loginPwdCheck, setLoginPwdCheck] = useState("");
    const [nickName, setNickName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [detailAddress, setDetailAddress] = useState("");
    // const [birth, setBirth] = useState("");

    const [pwdMessage, setPwdMessage] = useState("");
    const [pwdValidateMessage, setPwdValidateMessage] = useState("* 비밀번호는 최소 8자리에 영어, 숫자, 특수문자를 포함해야 합니다.");
    const [pwdDuplicateStyle, setPwdDuplicateStyle] = useState('');
    const [pwdValidateStyle, setPwdValidateStyle] = useState("pwdValidateStyle");

    const navigate = useNavigate();


    const handleNickNameChange = (e) => {
        const nickName = e.target.value;
        setNickName(nickName);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@S!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleLoginPwdChange = (e) => {
        const LoginPwd = e.target.value;
        setLoginPwd(LoginPwd);

        // 비밀번호 정책 검사
        if (loginPwd) {
            if (validatePassword(loginPwd)) {
                setPwdValidateMessage("");
            } else {
                setPwdValidateMessage("비밀번호는 최소 8자리에 영어, 숫자, 특수문자를 포함해야 합니다.");
                setPwdValidateStyle(`idUnavailable`);
            }
        } else {
            setPwdMessage("");
            setPwdDuplicateStyle("");
        }
    };

    useEffect(() => {
        setPwdMessage("");
        if(loginPwd){
            if(loginPwdCheck === loginPwd){
                setPwdMessage("비밀번호가 일치합니다");
                setPwdDuplicateStyle(`idAvailable`);
            }else{
                if(loginPwdCheck){
                    setPwdMessage("비밀번호가 일치하지 않습니다")
                    setPwdDuplicateStyle(`idUnavailable`);
                }
            }
        }
    }, [loginPwd, loginPwdCheck])

    const handlePhoneChange = (e) => {
        const numbersOnly = e.target.value.replace(/\D/g, "");
        if (numbersOnly.length <= 11) {
            setPhone(numbersOnly);
        }
    };

    const displayFormattedPhoneNumber = (numbers) => {

        numbers = numbers.toString();

        if (numbers != null && numbers.length <= 3) {
            return numbers;
        } else if (numbers.length <= 7) {
            return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
        } else {
            return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
        }
    };

    const handleLoginPwdCheckChange = (e) => {
        const LoginPwdCheck = e.target.value;
        setLoginPwdCheck(LoginPwdCheck);
    };

    const handleAddressChange = (e) => {
        const address = e.target.value;
        setAddress(address);
    };

    const handleDetailAddressChange = (e) => {
        const detailAddress = e.target.value;
        setDetailAddress(detailAddress);
    };

    // const handleBirthChange = (e) => {
    //     const birth = e.target.value;
    //     setBirth(birth);
    // };

    const getUserInfo = async () => {
        const response = await axios.get(`/api/member/info`, {headers: {Authorization: `${token}`}});
        console.log(response.data);

        setUsername(response.data.name);
        setId(response.data.loginId);
        setNickName(response.data.nickname);
        setPhone(response.data.phone);
        setEmail(response.data.email);
        setAddress(response.data.address);
        setDetailAddress(response.data.detailAddress);
        // setBirth(response.data.birth);
    }

    useEffect(() => {
        getUserInfo();
    }, [])



    const update = async (e) => {
        e.preventDefault();

        if (loginPwd) {
            if (!loginPwdCheck) {
                alert("비밀번호 확인을 해주세요.");
                return;
            }
        }

        //비밀번호 확인
        if(loginPwd){
            if(loginPwd !== loginPwdCheck){
                setLoginPwdCheck("");
                alert("비밀번호가 일치하지 않습니다");
                return;
            }
        }

        //전화번호 중복 확인
        try {
            const data = {
                nickname: nickName,
                loginPwd: loginPwd,
                address: address,
                detailAddress: detailAddress,
                // birth: birth
            };
            console.log(data);
            const response = await axios.put(`/api/member/edit`, data, {headers: {Authorization: `${token}`}});
            console.log(response.data);
            alert("회원정보가 성공적으로 변경되었습니다")
            navigate('/mypage/orderList');
        } catch (error) {
            alert("회원 정보 변경에 실패했습니다.");
        }
    };

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
                            onSubmit={update}
                        >
                            {/* input submit */}
                            <fieldset>
                                <div className="profile_input-group w-full">
                                    <label htmlFor="id">이름</label>
                                    <input
                                        id="id"
                                        name="id"
                                        className="profile_input-text type-lg"
                                        type="text"
                                        value={username}
                                        readOnly
                                    />
                                </div>
                                <div className="profile_input-group w-full">
                                    <label htmlFor="id">닉네임</label>
                                    <input
                                        id="id"
                                        name="id"
                                        className="profile_input-text type-lg"
                                        type="text"
                                        maxLength="100"
                                        onChange={handleNickNameChange}
                                        value={nickName}
                                    />
                                </div>
                                <div class="profile_input-group w-full">
                                    <label for="id">아이디</label>
                                    <input
                                        id="id"
                                        name="id"
                                        className="profile_input-text type-lg"
                                        type="text"
                                        value={id}
                                        readOnly
                                    />
                                </div>
                                <div className="profile_input-group w-full">
                                    <label for="pw">비밀번호</label>
                                    <input
                                        id="pw2"
                                        name="pw2"
                                        className="profile_input-text type-lg"
                                        type="password"
                                        placeholder="새 비밀번호"
                                        maxlength="20"
                                        onChange={handleLoginPwdChange}
                                        value={loginPwd}
                                    />
                                    <div className={`${pwdValidateStyle}`}>{pwdValidateMessage}</div>
                                    <input
                                        id="pw2"
                                        name="pw2"
                                        className="profile_input-text type-lg"
                                        type="password"
                                        placeholder="새 비밀번호 확인"
                                        maxlength="20"
                                        onChange={handleLoginPwdCheckChange}
                                        value={loginPwdCheck}
                                    />
                                    <div className={`${pwdDuplicateStyle}`}>{pwdMessage}</div>
                                </div>
                                <div className="profile_input-group w-full">
                                    <label for="id">휴대전화</label>
                                    <input
                                        id="id"
                                        name="id"
                                        className="profile_input-text type-lg"
                                        type="text"
                                        maxlength="100"
                                        onChange={handlePhoneChange}
                                        value={displayFormattedPhoneNumber(phone)}
                                        readOnly
                                    />
                                </div>
                                <div className="profile_input-group w-full">
                                    <label for="email">이메일</label>
                                    <input
                                        id="email"
                                        name="email"
                                        class="profile_input-text type-lg"
                                        type="email"
                                        value={email}
                                        readOnly
                                    />
                                </div>
                                <div className="profile_input-group w-full">
                                    <label htmlFor="address">주소</label>
                                    <input
                                        id="address"
                                        name="address"
                                        className="profile_input-text type-lg"
                                        type="text"
                                        placeholder="주소"
                                        maxlength="100"
                                        onChange={handleAddressChange}
                                        value={address}
                                    />
                                </div>
                                <div className="profile_input-group w-full">
                                    <label htmlFor="address">상세주소</label>
                                    <input
                                        id="detailAddress"
                                        name="detailAddress"
                                        className="profile_input-text type-lg"
                                        type="text"
                                        placeholder="상세주소"
                                        maxlength="100"
                                        onChange={handleDetailAddressChange}
                                        value={detailAddress}
                                    />
                                </div>
                                {/*<div className="profile_input-group w-full">*/}
                                {/*    <label for="birth">생년월일</label>*/}
                                {/*    <div className="select-group">*/}
                                {/*        <select*/}
                                {/*            name="year"*/}
                                {/*            id=""*/}
                                {/*            className="profile_input-text type-lg birth_select"*/}
                                {/*        >*/}
                                {/*            <option value="">년도</option>*/}
                                {/*            <option value="">2000</option>*/}
                                {/*            <option value="">2001</option>*/}
                                {/*            <option value="">2002</option>*/}
                                {/*            <option value="">2003</option>*/}
                                {/*            <option value="">2004</option>*/}
                                {/*            <option value="">2005</option>*/}
                                {/*            <option value="">2006</option>*/}
                                {/*            <option value="">2007</option>*/}
                                {/*            <option value="">2008</option>*/}
                                {/*            <option value="">2009</option>*/}
                                {/*            <option value="">2010</option>*/}
                                {/*        </select>*/}
                                {/*        <select*/}
                                {/*            name="month"*/}
                                {/*            id=""*/}
                                {/*            className="profile_input-text type-lg birth_select"*/}
                                {/*        >*/}
                                {/*            <option value="">월</option>*/}
                                {/*            <option value="">01</option>*/}
                                {/*            <option value="">02</option>*/}
                                {/*            <option value="">03</option>*/}
                                {/*            <option value="">04</option>*/}
                                {/*            <option value="">05</option>*/}
                                {/*            <option value="">06</option>*/}
                                {/*            <option value="">07</option>*/}
                                {/*            <option value="">08</option>*/}
                                {/*            <option value="">09</option>*/}
                                {/*            <option value="">10</option>*/}
                                {/*            <option value="">11</option>*/}
                                {/*            <option value="">12</option>*/}
                                {/*        </select>*/}
                                {/*        <select*/}
                                {/*            name="date"*/}
                                {/*            id=""*/}
                                {/*            className="profile_input-text type-lg birth_select"*/}
                                {/*        >*/}
                                {/*            <option value="">일</option>*/}
                                {/*            <option value="">01</option>*/}
                                {/*            <option value="">02</option>*/}
                                {/*            <option value="">03</option>*/}
                                {/*            <option value="">04</option>*/}
                                {/*            <option value="">05</option>*/}
                                {/*            <option value="">06</option>*/}
                                {/*            <option value="">07</option>*/}
                                {/*            <option value="">08</option>*/}
                                {/*            <option value="">09</option>*/}
                                {/*            <option value="">10</option>*/}
                                {/*            <option value="">11</option>*/}
                                {/*            <option value="">12</option>*/}
                                {/*            <option value="">13</option>*/}
                                {/*            <option value="">14</option>*/}
                                {/*            <option value="">15</option>*/}
                                {/*            <option value="">16</option>*/}
                                {/*            <option value="">17</option>*/}
                                {/*            <option value="">18</option>*/}
                                {/*            <option value="">19</option>*/}
                                {/*            <option value="">20</option>*/}
                                {/*            <option value="">21</option>*/}
                                {/*            <option value="">22</option>*/}
                                {/*            <option value="">23</option>*/}
                                {/*            <option value="">24</option>*/}
                                {/*            <option value="">25</option>*/}
                                {/*            <option value="">26</option>*/}
                                {/*            <option value="">27</option>*/}
                                {/*            <option value="">28</option>*/}
                                {/*            <option value="">29</option>*/}
                                {/*            <option value="">30</option>*/}
                                {/*            <option value="">31</option>*/}
                                {/*        </select>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
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
                                            className="user_btn-secondary w-full"
                                        >
                                            <span>취소하기</span>
                                        </button>
                                        <button
                                            className="user_btn-primary w-full"
                                        >
                                            <span>수정하기</span>
                                        </button>
                                    </ul>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                    <Link to={"/mypage/member/delete"} className={`delete`}>회원 탈퇴</Link>
                </div>
            </div>
        );
    }

    return <MypageFrame>{userProfileEdit()}</MypageFrame>
}

export default UserProfileEdit;