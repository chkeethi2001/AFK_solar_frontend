import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://afk-solar-backend-5.onrender.com/api/login", data);

      // Store user data, role, and token in localStorage
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role); // note: role is inside user object

      toast.success(res.data.message || "Login Successful!");

      setTimeout(() => {
        navigate("/"); // redirect to home
      }, 1500);
    } catch (err) {
      console.error(err);
      // Show backend message if available
      toast.error(err.response?.data?.message || "Invalid email or password!");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4 pt-24">
      <div
        className="w-full max-w-md bg-white shadow-2xl rounded-xl p-8 border-t-8"
        style={{ borderColor: "#004225" }}
      >
        <h2 className="text-3xl font-bold text-center mb-6" style={{ color: "#004225" }}>
          Login to Your Account
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block font-semibold mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none"
              style={{ borderColor: "#004225" }}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none"
              style={{ borderColor: "#004225" }}
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 text-white rounded-lg font-bold shadow-md hover:opacity-90 transition"
            style={{ backgroundColor: "#004225" }}
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="font-semibold" style={{ color: "#004225" }}>
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
