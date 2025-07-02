import React, { useState } from "react";
import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      setError("");

      // 유효성 검사 - 입력 여부 확인
      if (!username || !password || !repassword) {
        setError("아이디, 비밀번호, 비밀번호 확인을 모두 입력해주세요.");
        return;
      }

      // 비밀번호와 확인 비밀번호가 일치하는지 확인
      if (password !== repassword) {
        setError("비밀번호가 일치하지 않습니다.");
        return;
      }

      // 서버에 회원가입 요청
      let response: any = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/register`,
        {
          username,
          password,
        }
      );
      response = response?.data;

      if (!response?.success) {
        console.error("회원가입 실패:", response?.message ?? "");
        setError(`회원가입 실패. ${response?.message ?? ""}`);
        return;
      }

      // 회원가입 성공 처리
      useAuthStore.getState().setAuthData({
        userData: response?.data?.userData,
        userToken: response?.data?.userToken ?? "",
      });

      alert("회원가입 성공!!");
      navigate("/");
    } catch (error: any) {
      console.error("회원가입 실패:", error.response?.data || error.message);
      setError(`회원가입 실패. ${error?.message ?? ""}`);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>
        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">사용자명</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="아이디 입력"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">비밀번호</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호 입력"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">비밀번호 확인</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={repassword}
            onChange={(e) => setRepassword(e.target.value)}
            placeholder="비밀번호 확인"
          />
        </div>
        <button
          onClick={handleRegister}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default Register;
