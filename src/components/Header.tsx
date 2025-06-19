import React from "react";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1>🌟 나의 멋진 리액트 앱</h1>
      <nav>
        <a href="/">홈</a>
        <a href="/todo_list">TodoList</a>
      </nav>
    </header>
  );
};

export default Header;
