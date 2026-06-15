import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cartItems = useSelector((s) => s.cart);
  const totalItems = cartItems.reduce((s, i) => s + i.quantity, 0);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navStyle = {
    position: "sticky",
    top: 0,
    zIndex: 100,
    width: "100%",
    transition: "all 0.35s ease",
    padding: scrolled ? "12px 0" : "18px 0",
    background: scrolled ? "rgba(8,8,8,0.94)" : "transparent",
    backdropFilter: scrolled ? "blur(24px)" : "none",
    borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
    boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.7)" : "none",
  };

  const links = [
    { to: "/", label: "Home" },
    { to: "/veg", label: "Veg Menu" },
    { to: "/nonveg", label: "Non-Veg" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav style={navStyle}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        
        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <span style={{ fontSize: 26 }}>🍽️</span>
          <span style={{ fontSize: 19, fontWeight: 800, color: "#f0f0f0", letterSpacing: "-0.5px" }}>
            Food<span className="grad-text">Paradise</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hide-mobile" style={{ alignItems: "center", gap: 4 }}>
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              style={({ isActive }) => ({
                padding: "8px 16px",
                borderRadius: 100,
                fontSize: 14,
                fontWeight: 500,
                color: isActive ? "#f59e0b" : "#999",
                textDecoration: "none",
                background: isActive ? "rgba(245,158,11,0.1)" : "transparent",
                transition: "all 0.2s",
              })}
            >
              {label}
            </NavLink>
          ))}

          <NavLink
            to="/cart"
            style={({ isActive }) => ({
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "10px 22px",
              borderRadius: 100,
              fontSize: 14,
              fontWeight: 700,
              textDecoration: "none",
              marginLeft: 8,
              transition: "all 0.25s",
              background: isActive
                ? "linear-gradient(135deg,#f59e0b,#f97316)"
                : "rgba(245,158,11,0.08)",
              color: isActive ? "#000" : "#f59e0b",
              border: "1px solid",
              borderColor: isActive ? "transparent" : "rgba(245,158,11,0.25)",
            })}
          >
            <span>🛒</span>
            <span>Cart</span>
            {totalItems > 0 && (
              <span style={{
                position: "absolute", top: -7, right: -7,
                background: "#ef4444", color: "#fff", fontSize: 10,
                fontWeight: 900, width: 18, height: 18,
                borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                animation: "pulse-dot 1.5s infinite",
              }}>
                {totalItems}
              </span>
            )}
          </NavLink>
        </div>

        {/* Mobile icons */}
        <div className="show-mobile" style={{ alignItems: "center", gap: 16 }}>
          <NavLink to="/cart" style={{ position: "relative", color: "#f59e0b", fontSize: 22, textDecoration: "none" }}>
            🛒
            {totalItems > 0 && (
              <span style={{
                position: "absolute", top: -8, right: -8,
                background: "#ef4444", color: "#fff", fontSize: 9,
                fontWeight: 900, width: 17, height: 17,
                borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {totalItems}
              </span>
            )}
          </NavLink>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", color: "#f0f0f0", fontSize: 22, padding: 4, lineHeight: 1 }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{
          background: "rgba(8,8,8,0.98)", backdropFilter: "blur(24px)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "12px 24px 20px",
          display: "flex", flexDirection: "column", gap: 4,
        }}>
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => setMenuOpen(false)}
              style={({ isActive }) => ({
                display: "block",
                padding: "12px 16px",
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 500,
                color: isActive ? "#f59e0b" : "#ccc",
                textDecoration: "none",
                background: isActive ? "rgba(245,158,11,0.08)" : "transparent",
              })}
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
