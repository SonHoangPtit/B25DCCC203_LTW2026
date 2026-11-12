import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = ({ loading, error }) => {
  return (
    <div>
      <NavBar />
      <main className="container">
        {loading && <p>Đang tải câu hỏi...</p>}
        {!loading && error && <p className="error-text">{error}</p>}
        {!loading && !error && <Outlet />}
      </main>
    </div>
  );
};

export default Layout;