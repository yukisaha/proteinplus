import React, {useState} from 'react';
import '../../styles/admin/adminLogin.module.css';

export default function Admin() {
  const [warningStyle, setWarningStyle] = useState({ color: 'white' });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!event.target.checkValidity()) {
      setWarningStyle({ color: 'red' });
    } else {
      setWarningStyle({ color: 'white' });
    }
  };

  return (
    <div>
        <div id="container">
          <h1>관리자 로그인</h1>
          <form id="adminLoginForm" onSubmit={handleSubmit} noValidate >
            <div>
              <div class="form-row">
                <label for="adminId" class="required">아이디</label>
                <input type="text" id="adminId" name="adminId" required/>
              </div>
              <div class="form-row">
                <label for="adminPassword" class="required">비밀번호</label>
                <input
                  type="password"
                  id="adminPassword"
                  name="adminPassword"
                  required
                />
              </div>
            </div>
            <input type="submit" value="로그인"/>
          </form>
          <div id="warningMessage" style={warningStyle}>
            아이디와 패스워드를 모두 입력해주세요.
          </div>
        </div>

    </div>
  );
}