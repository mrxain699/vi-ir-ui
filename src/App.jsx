import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login, Dashboard, Directory } from "./pages/index.jsx";
import { AuthContext } from "./api/Auth.jsx";
export default function App() {
  const { loginToken, isTokenExpired } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            loginToken && !isTokenExpired ? (
              <Navigate to="/dashboard" replace={true} />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            loginToken && !isTokenExpired ? (
              <Dashboard />
            ) : (
              <Navigate to="/" replace={true} />
            )
          }
        />
        <Route
          path="/directory/:name"
          element={
            loginToken && !isTokenExpired ? (
              <Directory />
            ) : (
              <Navigate to="/" replace={true} />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </BrowserRouter>
  );
}
