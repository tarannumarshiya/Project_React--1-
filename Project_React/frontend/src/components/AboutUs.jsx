const features = [
  { icon: "🌿", title: "Fresh Ingredients", desc: "Only the freshest produce sourced from trusted local suppliers every single day." },
  { icon: "👨‍🍳", title: "Expert Chefs", desc: "Seasoned culinary professionals who blend tradition with modern culinary science." },
  { icon: "🚀", title: "Fast Delivery", desc: "Hot, fresh meals at your doorstep within 30 minutes — every single time." },
  { icon: "🏆", title: "Award Winning", desc: "Recognized as the city's top-rated food delivery platform for 3 years running." },
  { icon: "🔒", title: "Hygienic & Safe", desc: "Strict FSSAI-compliant kitchen standards with daily sanitization routines." },
  { icon: "💬", title: "24/7 Support", desc: "Round-the-clock customer care ready to assist you at any time." },
];

const timeline = [
  { year: "2020", title: "Humble Inception", desc: "Started as a tiny family-owned cloud kitchen with 3 chefs and 10 recipes." },
  { year: "2022", title: "Expansion & Growth", desc: "Moved into a state-of-the-art facility and launched online delivery, serving 10,000+ orders." },
  { year: "2024", title: "Physical Outlets", desc: "Opened our first flagship gourmet dining restaurant in the city center." },
  { year: "2026", title: "Digital Overhaul", desc: "Launched live tracking apps and database integrations for seamless 30-minute delivery." },
];

const chefs = [
  { name: "Chef Sanjay Kapoor", role: "Executive Master Chef", img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&q=80", bio: "30+ years of rich culinary expertise specialising in authentic Mughlai dishes and biryanis." },
  { name: "Chef Maria Watson", role: "Pastry & Fusion Specialist", img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80", bio: "Paris-trained, bringing artistic pastry design and creative fusion twists to Indian classics." },
  { name: "Chef David Alvez", role: "Operations Director", img: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=600&q=80", bio: "Committed to organic farming partnerships and kitchen-standard safety audits." },
];

const W = { maxWidth: 1200, margin: "0 auto", padding: "0 24px" };
const SEC = (bg) => ({ background: bg || "transparent", padding: "88px 0" });

export default function AboutUs() {
  return (
    <main style={{ background: "#080808", color: "#f0f0f0", overflowX: "hidden" }}>

      {/* ── HERO ──────────────────────────────────── */}
      <section style={{ ...SEC(), position: "relative", textAlign: "center", padding: "120px 24px 80px" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500, background: "radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
          <span className="section-label">Our Story</span>
          <h1 style={{ fontSize: "clamp(40px, 7vw, 72px)", fontWeight: 900, letterSpacing: -2, lineHeight: 1.05, marginBottom: 20 }}>
            About <span className="grad-text">Food Paradise</span>
          </h1>
          <p style={{ color: "#777", fontSize: 17, lineHeight: 1.8, maxWidth: 540, margin: "0 auto" }}>
            Founded with a passion for extraordinary food, we've grown into the city's most-loved dining destination — serving happiness, one plate at a time.
          </p>
        </div>
      </section>

      {/* ── STORY ─────────────────────────────────── */}
      <section style={SEC("#0f0f0f")}>
        <div style={W}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="story-grid">
            <style>{`.story-grid{grid-template-columns:1fr;}@media(min-width:900px){.story-grid{grid-template-columns:1fr 1fr;}}`}</style>
            <div style={{ position: "relative" }}>
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
                alt="Our Restaurant"
                style={{ width: "100%", height: 440, objectFit: "cover", borderRadius: 24, border: "1px solid rgba(255,255,255,0.07)" }}
              />
              <div style={{ position: "absolute", bottom: -20, right: -20, background: "linear-gradient(135deg,#f59e0b,#f97316)", borderRadius: 20, padding: "18px 22px", textAlign: "center", boxShadow: "0 16px 48px rgba(245,158,11,0.35)" }}>
                <p style={{ fontSize: 36, fontWeight: 900, color: "#000", lineHeight: 1 }}>5★</p>
                <p style={{ fontSize: 10, fontWeight: 800, color: "rgba(0,0,0,0.75)", textTransform: "uppercase", letterSpacing: 1, marginTop: 4 }}>Customer Rating</p>
              </div>
            </div>

            <div>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#f59e0b", textTransform: "uppercase", letterSpacing: 2 }}>Established 2020</span>
              <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, letterSpacing: -1, lineHeight: 1.1, margin: "14px 0 20px" }}>
                Crafting Memories<br />Through Culinary Art
              </h2>
              <p style={{ color: "#888", lineHeight: 1.8, fontSize: 15, marginBottom: 14 }}>
                Food Paradise began as a small cloud kitchen with a big dream: delivering restaurant-quality meals to every doorstep. We started with just 10 dishes and a team of 3.
              </p>
              <p style={{ color: "#888", lineHeight: 1.8, fontSize: 15 }}>
                Today, we serve over 2,500 happy customers every month with a menu spanning rich vegetarian curries, flavorful biryanis, premium meats, and fresh seafood.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 32 }}>
                {[{ val: "6+ Years", sub: "Culinary Mastery" }, { val: "50+", sub: "Menu Items" }, { val: "2,500+", sub: "Monthly Deliveries" }, { val: "4.9★", sub: "Average Rating" }].map(({ val, sub }) => (
                  <div key={sub} style={{ background: "#181818", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "16px 18px" }}>
                    <p style={{ fontSize: 20, fontWeight: 800, color: "#f59e0b" }}>{val}</p>
                    <p style={{ fontSize: 12, color: "#666", marginTop: 4 }}>{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ──────────────────────────────── */}
      <section style={SEC()}>
        <div style={W}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span className="section-label">Our History</span>
            <h2 className="section-title">The Journey Timeline</h2>
          </div>
          <div style={{ position: "relative", maxWidth: 640, margin: "0 auto", paddingLeft: 32 }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: "rgba(255,255,255,0.08)" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
              {timeline.map(({ year, title, desc }) => (
                <div key={year} style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: -38, top: 4, width: 14, height: 14, borderRadius: "50%", background: "#080808", border: "2px solid #f59e0b" }} />
                  <span style={{ display: "inline-block", fontSize: 11, fontWeight: 800, color: "#f59e0b", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", padding: "4px 14px", borderRadius: 100, marginBottom: 10 }}>{year}</span>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{title}</h3>
                  <p style={{ color: "#777", fontSize: 14, lineHeight: 1.7 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CHEFS ─────────────────────────────────── */}
      <section style={SEC("#0f0f0f")}>
        <div style={W}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="section-label">Culinary Experts</span>
            <h2 className="section-title">Meet Our Master Chefs</h2>
          </div>
          <div className="grid-3">
            {chefs.map(({ name, role, img, bio }) => (
              <div key={name} style={{ background: "#131313", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, overflow: "hidden", transition: "all 0.3s" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.borderColor = "rgba(245,158,11,0.2)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
              >
                <div style={{ height: 260, overflow: "hidden", position: "relative" }}>
                  <img src={img} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.06)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #131313 0%, transparent 50%)" }} />
                </div>
                <div style={{ padding: "20px 22px" }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700 }}>{name}</h3>
                  <p style={{ color: "#f59e0b", fontSize: 12, fontWeight: 600, marginTop: 4 }}>{role}</p>
                  <p style={{ color: "#666", fontSize: 13, lineHeight: 1.7, marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.06)" }}>{bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ────────────────────────────────── */}
      <section style={SEC()}>
        <div style={W}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="section-label">Our Core Values</span>
            <h2 className="section-title">What Sets Us Apart</h2>
          </div>
          <div className="grid-3">
            {features.map(({ icon, title, desc }) => (
              <div key={title} style={{ background: "#131313", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: "32px 26px", transition: "all 0.3s" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = "rgba(245,158,11,0.2)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
              >
                <div style={{ fontSize: 40, marginBottom: 16 }}>{icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#f59e0b", marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: 14, color: "#777", lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION ───────────────────────────────── */}
      <section style={{ background: "linear-gradient(135deg,#92400e,#d97706,#78350f)", padding: "72px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 800, color: "rgba(0,0,0,0.6)", textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>Our Mission Statement</p>
          <h2 style={{ fontSize: "clamp(20px,3vw,32px)", fontWeight: 900, color: "#000", lineHeight: 1.5 }}>
            "To connect people and spark culinary joy through the universal language of slow-cooked premium dishes."
          </h2>
          <p style={{ color: "rgba(0,0,0,0.7)", marginTop: 20, fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>— Food Paradise Executive Board</p>
        </div>
      </section>
    </main>
  );
}
