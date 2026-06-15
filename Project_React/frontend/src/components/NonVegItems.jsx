import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

export default function NonVegItems() {
  const dispatch = useDispatch();
  const nonVegItems = useSelector((s) => s.food.nonVegItems);
  const cartItems = useSelector((s) => s.cart);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const getQty = (id) => cartItems.find((i) => i.id === id)?.quantity ?? 0;

  const items = nonVegItems
    .filter((i) => i.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "price-low-high") return a.price - b.price;
      if (sort === "price-high-low") return b.price - a.price;
      return 0;
    });

  return (
    <main style={{ background: "#080808", color: "#f0f0f0", minHeight: "100vh", padding: "72px 0 96px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        {/* Page Header */}
        <header style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}>
          <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#ef4444", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", padding: "6px 18px", borderRadius: 100, marginBottom: 20 }}>
            🍗 Non-Vegetarian
          </span>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 900, letterSpacing: -1, lineHeight: 1.1 }}>
            Non-Veg <span style={{ background: "linear-gradient(135deg,#ef4444,#f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Special</span> Menu
          </h1>
          <p style={{ color: "#777", marginTop: 16, fontSize: 15, lineHeight: 1.7 }}>
            Premium meat, chicken, and fresh seafood specialties prepared with rich spices and slow dum-cooked styles.
          </p>
        </header>

        {/* Search + Sort Bar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16,
          background: "#111", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16,
          padding: "16px 20px", marginBottom: 40,
        }}>
          <div style={{ position: "relative", flex: "1 1 260px", maxWidth: 360 }}>
            <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "#555" }}>🔍</span>
            <input
              type="text"
              placeholder="Search non-veg dishes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%", background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.08)",
                color: "#f0f0f0", padding: "11px 16px 11px 42px", borderRadius: 12,
                fontSize: 14, transition: "border-color 0.2s", outline: "none",
              }}
              onFocus={(e) => e.target.style.borderColor = "#ef4444"}
              onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 12, color: "#666", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Sort:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.08)", color: "#f0f0f0", padding: "10px 14px", borderRadius: 12, fontSize: 14, cursor: "pointer", outline: "none" }}
            >
              <option value="default">Featured</option>
              <option value="price-low-high">Price: Low → High</option>
              <option value="price-high-low">Price: High → Low</option>
            </select>
          </div>
          {items.length > 0 && !loading && (
            <span style={{ fontSize: 13, color: "#666", marginLeft: "auto" }}>{items.length} items found</span>
          )}
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} style={{ background: "#111", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, overflow: "hidden" }}>
                <div className="skeleton" style={{ height: 220 }} />
                <div style={{ padding: 20 }}>
                  <div className="skeleton" style={{ height: 20, width: "70%", marginBottom: 12 }} />
                  <div className="skeleton" style={{ height: 14, width: "50%", marginBottom: 8 }} />
                  <div className="skeleton" style={{ height: 14, width: "90%", marginBottom: 24 }} />
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div className="skeleton" style={{ height: 28, width: "30%" }} />
                    <div className="skeleton" style={{ height: 36, width: "40%", borderRadius: 100 }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 24px", background: "#111", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 24 }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🍗</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "#888" }}>No items found</h3>
            <p style={{ color: "#555", marginTop: 8, fontSize: 14 }}>Try a different search term!</p>
          </div>
        ) : (
          <div className="grid-3">
            {items.map((item) => {
              const qty = getQty(item.id);
              return (
                <article key={item.id} className="food-card">
                  <div style={{ position: "relative", overflow: "hidden", height: 220 }}>
                    <img src={item.image} alt={item.name} className="food-card-img" />
                    <span className="badge-nonveg">🍗 Non-Veg</span>
                    {qty > 0 && (
                      <span style={{ position: "absolute", top: 14, right: 14, background: "#f59e0b", color: "#000", fontSize: 11, fontWeight: 800, padding: "3px 10px", borderRadius: 100 }}>
                        {qty} in cart
                      </span>
                    )}
                  </div>
                  <div className="food-card-body">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                      <h2 style={{ fontSize: 16, fontWeight: 700, flex: 1, lineHeight: 1.3 }}>{item.name}</h2>
                      <span style={{ display: "flex", alignItems: "center", gap: 3, background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.08)", padding: "4px 10px", borderRadius: 100, fontSize: 12, fontWeight: 700, color: "#f59e0b", whiteSpace: "nowrap" }}>
                        ★ 4.9
                      </span>
                    </div>
                    <p style={{ fontSize: 13, color: "#666", marginTop: 10, lineHeight: 1.7, flex: 1 }}>
                      Chef-crafted recipe cooked slowly with fresh marinated meats, original spice blends, and aromatic basmati rice.
                    </p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <div>
                        <p style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: 1 }}>Price</p>
                        <p style={{ fontSize: 24, fontWeight: 900, color: "#f59e0b" }}>₹{item.price}</p>
                      </div>
                      <button
                        onClick={() => dispatch(addToCart(item))}
                        style={{
                          background: "linear-gradient(135deg,#f59e0b,#f97316)",
                          color: "#000", fontWeight: 700, padding: "10px 20px",
                          borderRadius: 100, fontSize: 13, border: "none", cursor: "pointer",
                          transition: "all 0.25s", boxShadow: "0 4px 16px rgba(245,158,11,0.2)",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(245,158,11,0.3)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(245,158,11,0.2)"; }}
                      >
                        {qty > 0 ? "Add More +" : "Add to Cart +"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>
    </main>
  );
}
