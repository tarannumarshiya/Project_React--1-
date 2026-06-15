import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, decrementQuantity, removeFromCart, clearCart } from "../features/cart/cartSlice";

const PROMO = "PARADISE50";

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((s) => s.cart);
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoMsg, setPromoMsg] = useState(null); // { type, text }
  const [checkoutDone, setCheckoutDone] = useState(false);

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const totalQty = cartItems.reduce((s, i) => s + i.quantity, 0);
  const THRESHOLD = 500;
  const isFree = subtotal >= THRESHOLD;
  const delivery = cartItems.length > 0 ? (isFree ? 0 : 40) : 0;
  const progress = Math.min((subtotal / THRESHOLD) * 100, 100);
  const grandTotal = Math.max(subtotal + delivery - discount, 0);

  const applyPromo = (e) => {
    e.preventDefault();
    if (promo.trim().toUpperCase() === PROMO) {
      setDiscount(50);
      setPromoMsg({ type: "ok", text: "🎉 Code applied! ₹50 discount unlocked." });
    } else {
      setPromoMsg({ type: "err", text: "❌ Invalid code. Try PARADISE50!" });
    }
  };

  const closeModal = () => {
    setCheckoutDone(false);
    dispatch(clearCart());
    setDiscount(0);
    setPromo("");
    setPromoMsg(null);
  };

  const inputStyle = {
    background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.1)",
    color: "#f0f0f0", padding: "11px 14px", borderRadius: 12,
    fontSize: 14, outline: "none", transition: "border-color 0.2s",
  };

  return (
    <main style={{ background: "#080808", color: "#f0f0f0", minHeight: "100vh", padding: "56px 0 96px", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <header style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 900, letterSpacing: -1 }}>
            Your <span style={{ background: "linear-gradient(135deg,#f59e0b,#f97316)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Cart</span>
          </h1>
          {cartItems.length > 0 && (
            <p style={{ color: "#777", fontSize: 14, marginTop: 6 }}>{totalQty} item{totalQty !== 1 ? "s" : ""} · Ready to order</p>
          )}
        </header>

        {/* Empty state */}
        {cartItems.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 24px", background: "#111", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 24 }}>
            <div style={{ fontSize: 72, marginBottom: 20 }}>🛒</div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: "#888" }}>Your cart is empty</h2>
            <p style={{ color: "#555", marginTop: 8, fontSize: 14 }}>Browse our menu and add something delicious!</p>
            <Link to="/" style={{
              display: "inline-flex", marginTop: 28, background: "linear-gradient(135deg,#f59e0b,#f97316)",
              color: "#000", fontWeight: 700, padding: "13px 32px", borderRadius: 100, fontSize: 15, textDecoration: "none",
            }}>
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="cart-layout">

            {/* Left: items + progress */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Free delivery bar */}
              <div style={{ background: "#111", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "18px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 12, fontWeight: 700 }}>
                  <span style={{ color: "#888", textTransform: "uppercase", letterSpacing: 1 }}>Free Delivery Progress</span>
                  <span style={{ color: "#f59e0b" }}>
                    {isFree ? "🚀 Free Delivery Unlocked!" : `₹${subtotal} / ₹${THRESHOLD}`}
                  </span>
                </div>
                <div style={{ background: "#1a1a1a", borderRadius: 100, height: 8, overflow: "hidden" }}>
                  <div style={{
                    height: "100%", borderRadius: 100,
                    background: isFree ? "#22c55e" : "linear-gradient(90deg,#f59e0b,#f97316)",
                    width: `${progress}%`, transition: "width 0.5s ease",
                  }} />
                </div>
                {!isFree && (
                  <p style={{ color: "#666", fontSize: 12, marginTop: 8 }}>
                    Add <strong style={{ color: "#f0f0f0" }}>₹{THRESHOLD - subtotal}</strong> more for{" "}
                    <span style={{ color: "#22c55e", fontWeight: 700 }}>FREE delivery</span>!
                  </p>
                )}
              </div>

              {/* Cart Items */}
              {cartItems.map((item) => (
                <article key={item.id} style={{
                  background: "#111", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16,
                  padding: "16px", display: "flex", gap: 16, alignItems: "center",
                  transition: "border-color 0.2s",
                }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(245,158,11,0.15)"}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"}
                >
                  <img
                    src={item.image} alt={item.name}
                    style={{ width: 88, height: 88, objectFit: "cover", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</h3>
                    <p style={{ color: "#777", fontSize: 13, marginTop: 3 }}>₹{item.price} each</p>
                    {/* Qty controls */}
                    <div style={{ display: "flex", alignItems: "center", marginTop: 12, background: "#181818", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 100, width: "fit-content", overflow: "hidden" }}>
                      <button onClick={() => dispatch(decrementQuantity(item.id))} style={{ width: 36, height: 36, fontSize: 18, fontWeight: 700, background: "none", color: "#f0f0f0", border: "none", cursor: "pointer", transition: "background 0.2s" }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "none"}
                      >−</button>
                      <span style={{ minWidth: 36, textAlign: "center", fontWeight: 700, fontSize: 14 }}>{item.quantity}</span>
                      <button onClick={() => dispatch(addToCart(item))} style={{ width: 36, height: 36, fontSize: 18, fontWeight: 700, background: "#f59e0b", color: "#000", border: "none", cursor: "pointer", transition: "background 0.2s" }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "#fbbf24"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "#f59e0b"}
                      >+</button>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "space-between", gap: 12, flexShrink: 0 }}>
                    <button onClick={() => dispatch(removeFromCart(item.id))} style={{ background: "none", border: "none", color: "#555", fontSize: 18, cursor: "pointer", lineHeight: 1, padding: 4, transition: "color 0.2s" }}
                      onMouseEnter={(e) => e.currentTarget.style.color = "#ef4444"}
                      onMouseLeave={(e) => e.currentTarget.style.color = "#555"}
                      title="Remove"
                    >✕</button>
                    <p style={{ fontSize: 18, fontWeight: 800, color: "#f59e0b" }}>₹{item.price * item.quantity}</p>
                  </div>
                </article>
              ))}
            </div>

            {/* Right: summary */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Promo */}
              <div style={{ background: "#111", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "20px" }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 14, color: "#aaa" }}>Apply Voucher</h3>
                <form onSubmit={applyPromo} style={{ display: "flex", gap: 10 }}>
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                    style={{ ...inputStyle, flex: 1, textTransform: "uppercase" }}
                    onFocus={(e) => e.target.style.borderColor = "#f59e0b"}
                    onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                  />
                  <button type="submit" style={{
                    background: "linear-gradient(135deg,#f59e0b,#f97316)", color: "#000",
                    fontWeight: 700, padding: "10px 18px", borderRadius: 12, fontSize: 13, border: "none", cursor: "pointer", flexShrink: 0,
                  }}>Apply</button>
                </form>
                {promoMsg && (
                  <p style={{ marginTop: 10, fontSize: 12, color: promoMsg.type === "ok" ? "#22c55e" : "#ef4444" }}>{promoMsg.text}</p>
                )}
              </div>

              {/* Order Summary */}
              <div style={{ background: "#111", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "24px", position: "sticky", top: 100 }}>
                <h2 style={{ fontSize: 17, fontWeight: 800, paddingBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: 20 }}>Order Summary</h2>

                <div style={{ display: "flex", flexDirection: "column", gap: 14, fontSize: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#888" }}>Subtotal ({totalQty} items)</span>
                    <span style={{ fontWeight: 600 }}>₹{subtotal}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#888" }}>Delivery Fee</span>
                    {isFree
                      ? <span style={{ color: "#22c55e", fontWeight: 700 }}>FREE</span>
                      : <span style={{ fontWeight: 600 }}>₹{delivery}</span>
                    }
                  </div>
                  {discount > 0 && (
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "#888" }}>Promo Discount</span>
                      <span style={{ color: "#22c55e", fontWeight: 700 }}>−₹{discount}</span>
                    </div>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#888" }}>Taxes & Charges</span>
                    <span style={{ color: "#22c55e", fontWeight: 700 }}>FREE</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: 4 }}>
                    <span style={{ fontWeight: 800, fontSize: 16 }}>Grand Total</span>
                    <span style={{ fontSize: 26, fontWeight: 900, color: "#f59e0b" }}>₹{grandTotal}</span>
                  </div>
                </div>

                <button
                  onClick={() => setCheckoutDone(true)}
                  style={{
                    width: "100%", marginTop: 24, background: "linear-gradient(135deg,#f59e0b,#f97316)",
                    color: "#000", fontWeight: 800, padding: "16px", borderRadius: 100, fontSize: 15,
                    border: "none", cursor: "pointer", transition: "all 0.25s",
                    boxShadow: "0 6px 24px rgba(245,158,11,0.3)",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 32px rgba(245,158,11,0.4)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(245,158,11,0.3)"; }}
                >
                  Proceed to Checkout →
                </button>

                <button
                  onClick={() => { dispatch(clearCart()); setDiscount(0); setPromoMsg(null); }}
                  style={{ width: "100%", marginTop: 10, background: "none", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", padding: "12px", borderRadius: 100, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(239,68,68,0.05)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "none"}
                >
                  Clear Cart
                </button>

                <Link to="/" style={{ display: "block", textAlign: "center", marginTop: 16, color: "#666", fontSize: 13, textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "#f59e0b"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "#666"}
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Success Modal */}
      {checkoutDone && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.88)", backdropFilter: "blur(12px)" }} onClick={closeModal} />
          <div style={{
            position: "relative", background: "#131313", border: "1px solid rgba(255,255,255,0.1)",
            borderTop: "4px solid #f59e0b", borderRadius: 24, padding: "40px 32px", maxWidth: 440,
            width: "100%", textAlign: "center", zIndex: 1, animation: "modalPop 0.3s ease",
          }}>
            <div style={{ fontSize: 60, marginBottom: 16, animation: "bounce 1s 3" }}>🎉</div>
            <h2 style={{ fontSize: 24, fontWeight: 900 }}>Order Placed!</h2>
            <p style={{ color: "#888", fontSize: 14, lineHeight: 1.7, marginTop: 10 }}>
              Thank you for ordering! Your feast is being cooked fresh and will arrive in{" "}
              <span style={{ color: "#f59e0b", fontWeight: 700 }}>30 minutes</span>.
            </p>
            <div style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "18px 20px", margin: "24px 0", textAlign: "left" }}>
              {[
                { k: "Total Items", v: totalQty },
                { k: "Grand Total Paid", v: `₹${grandTotal}` },
                { k: "Delivery", v: "~30 minutes" },
              ].map(({ k, v }) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: 13 }}>
                  <span style={{ color: "#777" }}>{k}</span>
                  <span style={{ fontWeight: 700, color: k === "Grand Total Paid" ? "#f59e0b" : "#f0f0f0" }}>{v}</span>
                </div>
              ))}
            </div>
            <button onClick={closeModal} style={{
              width: "100%", background: "linear-gradient(135deg,#f59e0b,#f97316)", color: "#000",
              fontWeight: 800, padding: "14px", borderRadius: 100, fontSize: 15, border: "none", cursor: "pointer",
            }}>
              Back to Menu
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
