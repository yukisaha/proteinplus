import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import '../../styles/admin/css/adminLogin.module.css';

export default function Admin() {
  const [warningStyle, setWarningStyle] = useState({ color: 'white' });
  const [adminId, setAdminId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!event.target.checkValidity()) {
      setWarningStyle({ color: 'red' });
    } else {
      //setWarningStyle({ color: 'white' });
      const loginData = {
        adminId: adminId,
        adminPwd: adminPassword
      };
      try {
        const response = await axios.post('/api/v1/admin', loginData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        sessionStorage.setItem('authToken', response.data.jwtToken);
        navigate("/admin/product/add");
      } catch (error) {
        if (error.response) {
          // 서버 응답 메시지 출력
          console.error('Login failed:', error.response.data);
          alert('Login failed: ' + error.response.data.message);
        } else if (error.request) {
          console.error('No response received');
          alert('Login failed: 서버 응답 없음');
        } else {
          console.error('Error setting up request:', error.message);
          alert('Login failed: 설정 오류');
        }
      }
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
                <input
                  type="text"
                  id="adminId"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  name="adminId"
                required/>
              </div>
              <div class="form-row">
                <label for="adminPassword" class="required">비밀번호</label>
                <input
                  type="password"
                  id="adminPassword"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
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