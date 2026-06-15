import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

const features = [
  { icon: "🌿", title: "100% Fresh", desc: "Farm-fresh ingredients sourced daily from trusted local suppliers." },
  { icon: "👨‍🍳", title: "Expert Chefs", desc: "Authentic recipes crafted by experienced culinary professionals." },
  { icon: "⚡", title: "Fast Delivery", desc: "Hot food at your doorstep in under 30 minutes, guaranteed." },
  { icon: "💰", title: "Best Value", desc: "Premium quality meals at pocket-friendly prices every day." },
];

const stats = [
  { val: "1000+", label: "Orders Delivered" },
  { val: "50+",   label: "Menu Items" },
  { val: "2500+", label: "Happy Customers" },
  { val: "4.9★",  label: "Average Rating" },
];

const testimonials = [
  { name: "Riya S.",  rating: 5, review: "Best biryani I've ever had! The flavors are authentic and delivery was super fast. Highly recommend!" },
  { name: "Arjun M.", rating: 5, review: "Paneer Butter Masala is absolutely divine. Feels like home-cooked food every single time!" },
  { name: "Priya K.", rating: 5, review: "Great value for money. Love the variety of dishes. My go-to place for dinner every week." },
];

const steps = [
  { num: "01", icon: "🍳", title: "Choose Your Meal", desc: "Browse our curated menu of chef-crafted veg and non-veg delicacies." },
  { num: "02", icon: "🔥", title: "We Cook Fresh", desc: "Our chefs prepare every order fresh with premium local ingredients." },
  { num: "03", icon: "🚀", title: "Fast Delivery", desc: "Packed hot and delivered to your doorstep in under 30 minutes." },
];

const C = {
  page: { background: "#080808", color: "#f0f0f0", overflowX: "hidden" },
  wrap: { maxWidth: 1280, margin: "0 auto", padding: "0 24px" },
  sec: (bg) => ({ background: bg || "transparent", padding: "96px 0" }),
};

export default function Home() {
  const dispatch = useDispatch();
  const vegItems = useSelector((s) => s.food.vegItems);
  const nonVegItems = useSelector((s) => s.food.nonVegItems);
  const cartItems = useSelector((s) => s.cart);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const getQty = (id) => cartItems.find((i) => i.id === id)?.quantity ?? 0;
  const featured = [...vegItems.slice(0, 3), ...nonVegItems.slice(0, 3)];

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <main style={C.page}>

      {/* ── HERO ────────────────────────────────────────── */}
      <section style={{
        position: "relative",
        minHeight: "92vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "80px 24px 60px",
        overflow: "hidden",
      }}>
        {/* glow blobs */}
        <div style={{ position: "absolute", top: "20%", left: "30%", width: 500, height: 500, background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "15%", right: "20%", width: 400, height: 400, background: "radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 820, animation: "fadeUp 0.7s ease" }}>
          <span className="section-label">✨ Premium Dining Experience</span>

          <h1 style={{ fontSize: "clamp(44px, 7vw, 88px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-2px", marginBottom: 24 }}>
            Taste the<br />
            <span className="grad-text">Extraordinary</span>
          </h1>

          <p style={{ fontSize: 18, color: "#888", maxWidth: 500, margin: "0 auto 40px", lineHeight: 1.7 }}>
            Handcrafted flavors, premium local ingredients, and superfast delivery straight to your table.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
            <Link to="/veg" className="btn-primary">Explore Veg Menu 🌿</Link>
            <Link to="/nonveg" className="btn-outline">Non-Veg Specials 🍗</Link>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, color: "#555", fontSize: 12, animation: "bounce 2s infinite" }}>
          <span>scroll down</span>
          <span style={{ color: "#f59e0b" }}>↓</span>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────── */}
      <section style={{ background: "linear-gradient(135deg,#92400e,#d97706,#78350f)", padding: "40px 24px" }}>
        <div style={{ ...C.wrap, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }} className="grid-4">
          {stats.map(({ val, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <p style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, color: "#000", lineHeight: 1 }}>{val}</p>
              <p style={{ fontSize: 12, fontWeight: 700, color: "rgba(0,0,0,0.7)", marginTop: 6, textTransform: "uppercase", letterSpacing: 1 }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED DISHES ───────────────────────────── */}
      {featured.length > 0 && (
        <section style={C.sec()}>
          <div style={C.wrap}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span className="section-label">Highly Recommended</span>
              <h2 className="section-title" style={{ marginBottom: 12 }}>Featured Culinary Delights</h2>
              <p className="section-sub" style={{ margin: "0 auto" }}>
                Explore our guest-favourite dishes freshly prepared and ready for delivery.
              </p>
            </div>

            <div className="grid-3">
              {featured.map((item) => {
                const qty = getQty(item.id);
                return (
                  <article key={item.id} className="food-card">
                    <div style={{ position: "relative", overflow: "hidden", height: 220 }}>
                      <img src={item.image} alt={item.name} className="food-card-img" />
                      <span className={item.category === "veg" ? "badge-veg" : "badge-nonveg"}>
                        {item.category === "veg" ? "🌱 Veg" : "🍗 Non-Veg"}
                      </span>
                      {qty > 0 && (
                        <span style={{ position: "absolute", top: 14, right: 14, background: "#f59e0b", color: "#000", fontSize: 11, fontWeight: 800, padding: "3px 10px", borderRadius: 100 }}>
                          {qty} in cart
                        </span>
                      )}
                    </div>
                    <div className="food-card-body">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 700, flex: 1 }}>{item.name}</h3>
                        <span style={{ display: "flex", alignItems: "center", gap: 3, background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.08)", padding: "4px 10px", borderRadius: 100, fontSize: 12, fontWeight: 700, color: "#f59e0b", whiteSpace: "nowrap" }}>
                          ★ 4.9
                        </span>
                      </div>
                      <p style={{ fontSize: 13, color: "#777", marginTop: 10, lineHeight: 1.6, flex: 1 }}>
                        Rich with premium ingredients, traditional spice blends, and cooked slow to perfection.
                      </p>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                        <div>
                          <p style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: 1 }}>Price</p>
                          <p style={{ fontSize: 24, fontWeight: 900, color: "#f59e0b", lineHeight: 1 }}>₹{item.price}</p>
                        </div>
                        <button
                          onClick={() => dispatch(addToCart(item))}
                          className="btn-primary"
                          style={{ padding: "10px 20px", fontSize: 13 }}
                        >
                          {qty > 0 ? "Add More +" : "Add to Cart +"}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── CATEGORIES ────────────────────────────────── */}
      <section style={C.sec("#0f0f0f")}>
        <div style={C.wrap}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="section-label">Our Menu</span>
            <h2 className="section-title">Choose Your Craving</h2>
          </div>
          <div className="grid-2">
            {[
              { to: "/veg", emoji: "🥗", color: "#22c55e", label: "Veg Specials", desc: "Fresh garden greens, rich paneer curries, and aromatic vegetarian biryanis crafted daily.", cta: "Explore Veg Menu →" },
              { to: "/nonveg", emoji: "🍗", color: "#ef4444", label: "Non-Veg Specials", desc: "Premium meats, seafood and slow-cooked biryanis made with bold spices and secret blends.", cta: "Explore Non-Veg →" },
            ].map(({ to, emoji, color, label, desc, cta }) => (
              <Link key={to} to={to} style={{ textDecoration: "none" }}>
                <div style={{
                  background: "#131313",
                  border: `1px solid rgba(255,255,255,0.06)`,
                  borderRadius: 24,
                  padding: "56px 40px",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.borderColor = color + "40";
                    e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,0.5)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ fontSize: 60, marginBottom: 20 }}>{emoji}</div>
                  <h3 style={{ fontSize: 22, fontWeight: 800, color }}>{label}</h3>
                  <p style={{ color: "#777", marginTop: 12, fontSize: 14, lineHeight: 1.7, maxWidth: 340, margin: "12px auto 0" }}>{desc}</p>
                  <span style={{ display: "inline-block", marginTop: 24, fontSize: 13, fontWeight: 700, color, border: `1px solid ${color}30`, padding: "8px 22px", borderRadius: 100 }}>{cta}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHEF'S SPECIAL ────────────────────────────── */}
      <section style={C.sec()}>
        <div style={C.wrap}>
          <div style={{
            background: "#111",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 28,
            padding: "clamp(32px,5vw,72px)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 56,
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
          }} className="chef-grid">
            <style>{`.chef-grid { grid-template-columns: 1fr; } @media(min-width:900px){.chef-grid{grid-template-columns:1fr 1fr;}}`}</style>
            <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)", borderRadius: "50%" }} />
            <div style={{ position: "relative" }}>
              <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#f59e0b", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", padding: "6px 16px", borderRadius: 100, marginBottom: 20 }}>
                👑 Chef's Special
              </span>
              <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: -1 }}>
                Royal Mutton<br /><span className="grad-text">Biryani Feast</span>
              </h2>
              <p style={{ color: "#888", marginTop: 20, lineHeight: 1.8, fontSize: 15 }}>
                Experience authentic royal dining with our signature Mutton Biryani — premium basmati rice, tender goat meat marinated in secret spices, and slow-cooked under dum for an unmatched aroma.
              </p>
              <div style={{ display: "flex", gap: 16, marginTop: 28, flexWrap: "wrap" }}>
                {[{ val: "₹400", sub: "Special Offer" }, { val: "4.9★", sub: "Top Rated" }].map(({ val, sub }) => (
                  <div key={sub} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "12px 20px", textAlign: "center" }}>
                    <p style={{ fontSize: 20, fontWeight: 800, color: "#f59e0b" }}>{val}</p>
                    <p style={{ fontSize: 10, color: "#666", textTransform: "uppercase", letterSpacing: 1, marginTop: 4 }}>{sub}</p>
                  </div>
                ))}
              </div>
              <Link to="/nonveg" className="btn-primary" style={{ display: "inline-flex", marginTop: 32 }}>
                Order Chef's Special
              </Link>
            </div>
            <div style={{ borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", aspectRatio: "4/3" }}>
              <img
                src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=80"
                alt="Chef's Special Biryani"
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────── */}
      <section style={C.sec("#0f0f0f")}>
        <div style={C.wrap}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="section-label">Seamless Process</span>
            <h2 className="section-title">How Food Paradise Works</h2>
          </div>
          <div className="grid-3">
            {steps.map(({ num, icon, title, desc }) => (
              <div key={num} style={{ background: "#131313", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: "36px 28px", position: "relative", transition: "all 0.3s ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(245,158,11,0.2)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <span style={{ position: "absolute", top: 20, right: 24, fontSize: 48, fontWeight: 900, color: "rgba(255,255,255,0.04)", letterSpacing: -2 }}>{num}</span>
                <div style={{ fontSize: 40, marginBottom: 20 }}>{icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: 14, color: "#777", lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ────────────────────────────────────── */}
      <section style={C.sec()}>
        <div style={C.wrap}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="section-label">Why Choose Us</span>
            <h2 className="section-title">Why Food Paradise?</h2>
          </div>
          <div className="grid-4">
            {features.map(({ icon, title, desc }) => (
              <div key={title} style={{ background: "#131313", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: "32px 24px", textAlign: "center", transition: "all 0.3s ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(245,158,11,0.2)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ fontSize: 40, marginBottom: 16 }}>{icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#f59e0b", marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: 13, color: "#777", lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────── */}
      <section style={C.sec("#0f0f0f")}>
        <div style={C.wrap}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="section-label">Testimonials</span>
            <h2 className="section-title">What Our Customers Say</h2>
          </div>
          <div className="grid-3">
            {testimonials.map(({ name, rating, review }) => (
              <article key={name} style={{ background: "#131313", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: "32px", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                  {Array.from({ length: rating }).map((_, i) => (
                    <span key={i} style={{ color: "#f59e0b", fontSize: 15 }}>★</span>
                  ))}
                </div>
                <p style={{ color: "#999", fontSize: 14, lineHeight: 1.75, fontStyle: "italic", flex: 1 }}>"{review}"</p>
                <p style={{ color: "#f0f0f0", fontWeight: 600, fontSize: 14, marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)" }}>— {name}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ────────────────────────────────── */}
      <section style={C.sec()}>
        <div style={C.wrap}>
          <div style={{ background: "#131313", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 28, padding: "clamp(40px,6vw,72px)", textAlign: "center", maxWidth: 680, margin: "0 auto", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 400, height: 400, background: "radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%)", borderRadius: "50%" }} />
            <div style={{ position: "relative" }}>
              <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.5 }}>Unlock Special Offers! ✉️</h2>
              <p style={{ color: "#888", marginTop: 12, fontSize: 15, lineHeight: 1.7 }}>
                Subscribe and get a flat <span style={{ color: "#f59e0b", fontWeight: 700 }}>10% off</span> coupon delivered straight to your inbox!
              </p>
              {subscribed ? (
                <div style={{ marginTop: 28, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", color: "#22c55e", fontSize: 14, padding: "14px 24px", borderRadius: 100 }}>
                  🎉 Welcome to the club! Check your inbox for your discount code.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} style={{ marginTop: 28, display: "flex", gap: 12, maxWidth: 440, margin: "28px auto 0" }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="input-field"
                    style={{ flex: 1 }}
                  />
                  <button type="submit" className="btn-primary" style={{ padding: "12px 24px", whiteSpace: "nowrap" }}>
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "36px 24px" }}>
        <div style={{ ...C.wrap, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
          <p style={{ fontSize: 18, fontWeight: 800 }}>🍽️ Food<span className="grad-text">Paradise</span></p>
          <p style={{ fontSize: 13, color: "#555" }}>© 2025 FoodParadise. All rights reserved.</p>
          <nav style={{ display: "flex", gap: 24 }}>
            {["/about", "/contact", "/admin"].map((to) => (
              <Link key={to} to={to} style={{ fontSize: 13, color: "#666", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#f59e0b"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#666"}
              >
                {to.replace("/", "").replace(/^\w/, c => c.toUpperCase())}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </main>
  );
}
