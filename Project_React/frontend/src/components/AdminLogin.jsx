import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      formData.email === "admin4052@food.com" &&
      formData.password === "Javeed@40"
    ) {
      navigate("/admin/dashboard");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  const inputClass =
    "w-full bg-[#0a0a0a] border border-white/10 text-white placeholder-gray-700 px-4 py-3.5 rounded-xl focus:outline-none focus:border-amber-400 transition-colors text-sm";

  return (
    <main className="w-full min-h-screen bg-[#0a0a0a] flex items-center justify-center px-5">

      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🔐</div>
          <h1 className="text-3xl font-black text-white">
            Admin <span className="text-amber-400">Portal</span>
          </h1>
          <p className="text-gray-500 text-sm mt-2">Food Paradise Management System</p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-[#111] border border-white/10 rounded-2xl p-8 space-y-5 border-t-2 border-t-amber-400"
        >
          {error && (
            <div className="bg-red-500/15 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
              Admin Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="admin@example.com"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className={`${inputClass} pr-16`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-amber-400 font-semibold hover:text-amber-300 transition-colors"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-400 hover:bg-amber-300 text-black py-4 rounded-full font-extrabold transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-400/25 mt-2"
          >
            Sign In →
          </button>
        </form>

        <p className="text-center text-gray-700 text-xs mt-6">
          Authorized personnel only · Food Paradise © 2025
        </p>
      </div>
    </main>
  );
}

export default AdminLogin;
