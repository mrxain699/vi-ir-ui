import { useState, useContext } from "react";
import { AuthContext } from "../api/Auth.jsx";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Layout/Loader.jsx";
const Initialize_Field = {
  username: "",
  password: "",
};
const Login = () => {
  const { authenticate, errorMessage, loader, alert } = useContext(AuthContext);
  const [formData, setFormData] = useState(Initialize_Field);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.username && formData.password) {
      await authenticate(formData);
      const token = localStorage.getItem("token");
      console.log(token);
      if (token) {
        navigate("/dashboard", { replace: true });
        setFormData(Initialize_Field);
      }
    }
  };
  return (
    <div className="login-wrapper max-sm:px-6">
      <div className="login-header px-8 max-sm:px-4">
        <h1 className="font-bold text-violet-600 text-2xl">VR-IV</h1>
      </div>

      <div className="login-box px-6 py-8">
        <h1 className="font-[600] text-violet-700 text-2xl w-full text-center">
          Login your account.
        </h1>
        {errorMessage && (
          <div className="bg-red-100 rounded-lg w-full px-3 py-3 mt-3">
            <p className="text-base text-red-500 font-[500]">{errorMessage}</p>
          </div>
        )}
        {alert && (
          <div
            className={`alert w-full h-14 flex items-center px-4 ${
              alert.status === "success" ? "bg-green-100" : "bg-red-100"
            } rounded-xl ${
              alert.status === "success" ? "text-green-700" : "text-red-700"
            } font-[600] mt-3`}
          >
            {alert.message}
          </div>
        )}

        <form
          method="post"
          className="w-full mt-4 text-center"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            className="input placeholder:text-sm focus:bg-white"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="input placeholder:text-sm"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="inline-block px-10 py-2 mt-3 bg-violet-600 text-white text-lg rounded-lg hover:bg-violet-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-violet-400 focus:bg-violet-500"
            disabled={loader}
          >
            {!loader ? "Login" : <Loader />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
