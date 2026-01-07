import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AFKlogo from "../assets/AFKlogo.png";

const Navbar = () => {
  const [role, setRole] = useState(null);
  const [userName, setUserName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Load user & role from localStorage
  const loadUser = () => {
    const storedRole = localStorage.getItem("role");
    const storedUser = localStorage.getItem("user");

    setRole(storedRole);

    if (storedUser) {
      const parsed = JSON.parse(storedUser);

      setUserName(parsed.firstName || "");

      // Build avatar URL if available
      if (parsed.avatar) {
        setAvatarUrl(`https://afk-solar-backend-5.onrender.com/uploads/${parsed.avatar}`);
      } else {
        setAvatarUrl(null);
      }
    } else {
      setUserName("");
      setAvatarUrl(null);
    }
  };

  useEffect(() => {
    loadUser();

    // Re-run if localStorage changes (profile update, login, logout)
    window.addEventListener("storage", loadUser);
    return () => window.removeEventListener("storage", loadUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    setRole(null);
    setUserName("");
    setAvatarUrl(null);
    setMenuOpen(false);

    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Residential Solar", path: "/residential-solar" },
    { name: "Commercial Solar", path: "/commercial-solar" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className="w-full text-white shadow-md fixed top-0 left-0 z-50"
      style={{ backgroundColor: "#004225" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-6">
        {/* Logo */}
        <img
          src={AFKlogo}
          alt="AFK EcoGrid"
          className="h-12 w-auto mr-3 rounded"
        />

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 text-lg font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="hover:text-gray-300 transition"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Auth / User */}
        <div className="hidden md:flex items-center space-x-4">
          {!role && (
            <>
              <Link
                to="/register"
                className="bg-white text-[#138808] font-semibold px-4 py-2 rounded hover:bg-gray-200 transition"
              >
                Register
              </Link>

              <Link
                to="/login"
                className="border border-white px-4 py-2 rounded hover:bg-white hover:text-[#138808] transition"
              >
                Login
              </Link>
            </>
          )}

          {role && (
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div
                onClick={() => navigate("/profile")}
                className="cursor-pointer flex items-center"
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover border-2 border-white hover:scale-110 transition"
                  />
                ) : (
                  <div className="w-10 h-10 bg-white text-black font-bold flex items-center justify-center rounded-full text-xl hover:scale-110 transition">
                    {userName ? userName.charAt(0).toUpperCase() : "U"}
                  </div>
                )}
              </div>

              {role === "admin" && (
                <div className="bg-yellow-400 text-black px-4 py-2 rounded opacity-70 cursor-not-allowed">
                  Admin Panel
                </div>
              )}

              <button
                onClick={handleLogout}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Btn */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden flex flex-col space-y-4 px-6 pb-4 text-lg font-medium"
          style={{ backgroundColor: "#138808" }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="hover:underline"
            >
              {link.name}
            </Link>
          ))}

          {!role && (
            <>
              <Link
                to="/register"
                className="bg-white text-[#138808] px-4 py-2 rounded font-semibold"
              >
                Register
              </Link>

              <Link
                to="/login"
                className="border border-white px-4 py-2 rounded"
              >
                Login
              </Link>
            </>
          )}

          {role && (
            <>
              <div className="flex items-center gap-3 mt-2">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover border-2 border-white"
                  />
                ) : (
                  <div className="w-10 h-10 bg-yellow-400 text-black font-bold flex items-center justify-center rounded-full text-xl">
                    {userName ? userName.charAt(0).toUpperCase() : "U"}
                  </div>
                )}

                <span className="text-white font-semibold">{userName}</span>
              </div>

              {role === "admin" && (
                <div className="bg-yellow-400 text-black px-4 py-2 rounded opacity-70 cursor-not-allowed">
                  Admin Panel
                </div>
              )}

              <button
                onClick={handleLogout}
                className="bg-white text-[#004225] font-semibold px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
