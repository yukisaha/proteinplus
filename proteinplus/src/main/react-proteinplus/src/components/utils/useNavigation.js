
// 로그인 토큰이 존재하면 true 아니면 false
import React from 'react';
import { useNavigate } from 'react-router-dom';

export function RedirectToLogin() {
  const navigate = useNavigate();

  const RedirectToLoginPage = () => {
    navigate("/auth/login");
  }

  return RedirectToLoginPage();
}
