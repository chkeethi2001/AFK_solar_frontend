import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("https://afk-solar-backend-5.onrender.com/api/register", form);

      toast.success(res.data.message || "Registration Successful!");

      setTimeout(() => {
        navigate("/login"); // redirect to login
      }, 1500);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="px-1 min-h-screen flex justify-center items-center bg-gray-100 pt-24">
      <div
        className="w-full max-w-lg bg-white shadow-2xl rounded-xl p-8 border-t-8"
        style={{ borderColor: "#004225" }}
      >
        <h2 className="text-3xl font-bold text-center mb-6" style={{ color: "#004225" }}>
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {["firstName", "lastName", "mobile", "email", "password", "confirmPassword"].map((field) => (
            <div key={field}>
              <label className="block font-semibold mb-1">{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
              <input
                type={field.includes("password") ? "password" : field === "mobile" ? "number" : "text"}
                name={field}
                className="w-full p-3 border rounded-lg focus:outline-none"
                style={{ borderColor: "#004225" }}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full p-3 text-white rounded-lg font-bold shadow-md hover:opacity-90 transition"
            style={{ backgroundColor: "#004225" }}
          >
            Submit
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="font-semibold" style={{ color: "#004225" }}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
