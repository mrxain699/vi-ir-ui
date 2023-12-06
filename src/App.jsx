import { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, Dashboard, Directory } from "./pages/index.jsx";
import { AuthContext } from "./api/Auth.jsx";
export default function App() {
  const { loginToken, getUser } = useContext(AuthContext);
  useEffect(() => {
    const getLoggedInUser = async () => {
      if (loginToken) {
        await getUser();
      }
    };
    getLoggedInUser();
  }, [loginToken]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={loginToken ? <Dashboard /> : <Login />} />
        <Route
          path="/dashboard"
          element={loginToken ? <Dashboard /> : <Login />}
        />
        <Route
          path="/directory/:name"
          element={loginToken ? <Directory /> : <Login />}
        />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
