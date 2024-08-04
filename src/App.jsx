// src/App.jsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/Homepage";
import CreateCirclePage from "./pages/CreateCirclePage";
import CirclePage from "./pages/CirclePage";
import MakePostPage from "./pages/MakePostPage";
import InfPage from "./pages/InfPage";
import ActivePage from "./pages/ActivePage";
const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const rememberMe = localStorage.getItem("rememberMe");
    const expiry = localStorage.getItem("expiry");

    // 检查 token 是否存在并且是否过期
    if (savedToken && (rememberMe || true)) {
      if (expiry && new Date().getTime() > expiry) {
        localStorage.removeItem("token");
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("expiry");
      } else {
        setToken(savedToken);
      }
    }
  }, []);

  const handleLoginSuccess = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expiry", new Date().getTime() + 60 * 60 * 1000); // 设置1小时过期
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route
          path="/createCircle"
          element={token ? <CreateCirclePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/circle/:circleId"
          element={token ? <CirclePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/circle/:circleId/createPost"
          element={token ? <MakePostPage /> : <Navigate to="/login" />}
        />
        <Route path="/inf" element={<InfPage />} />
        <Route path="/activity" element={<ActivePage />} />

        <Route
          path="/"
          element={token ? <Navigate to="/home" /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
