// PopupRegister.jsx - Complete code with Register component included
import { useEffect, useState } from "react";

const Register = ({ onClose }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("https://afk-solar-backend-5.onrender.com/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || "Registration Successful!");
        setTimeout(() => {
          if (onClose) onClose();
          // Redirect to login page
          window.location.href = "/login";
        }, 1500);
      } else {
        alert(data.message || "Registration failed!");
      }
    } catch (err) {
      console.error(err);
      alert("Registration failed!");
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-center mb-4" style={{ color: "#004225" }}>
        Create Your Account
      </h2>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-semibold mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              className="w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: "#004225" }}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              className="w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: "#004225" }}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Mobile</label>
          <input
            type="tel"
            name="mobile"
            value={form.mobile}
            className="w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2"
            style={{ borderColor: "#004225" }}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            className="w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2"
            style={{ borderColor: "#004225" }}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            className="w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2"
            style={{ borderColor: "#004225" }}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            className="w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2"
            style={{ borderColor: "#004225" }}
            onChange={handleChange}
            required
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full p-2.5 text-white rounded-lg font-bold shadow-md hover:opacity-90 transition"
          style={{ backgroundColor: "#004225" }}
        >
          Submit
        </button>
      </div>

      <p className="text-center mt-3 text-sm">
        Already have an account?{" "}
        <a href="/login" className="font-semibold hover:underline" style={{ color: "#004225" }}>
          Login
        </a>
      </p>
    </div>
  );
};

const PopupRegister = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Show register popup after 5 seconds
    const timer = setTimeout(() => setOpen(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-[9999]">
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-md relative p-6 max-h-[85vh] overflow-y-auto border-t-4" 
        style={{ borderColor: "#004225" }}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-2 right-3 text-3xl leading-none text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>

        <Register onClose={() => setOpen(false)} />
      </div>
    </div>
  );
};

export default PopupRegister;
