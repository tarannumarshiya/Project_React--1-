import { useState } from "react";

const info = [
  { icon: "📍", label: "Address",  value: "Food Paradise, Hyderabad, Telangana, India" },
  { icon: "📞", label: "Phone",    value: "+91 98765 43210" },
  { icon: "📧", label: "Email",    value: "support@foodparadise.com" },
  { icon: "🕒", label: "Hours",    value: "Mon – Sun · 10:00 AM – 11:00 PM" },
];

const faqs = [
  { q: "What is your delivery radius?", a: "We currently deliver within a 15 km radius of Hyderabad city center to ensure your food stays fresh and hot." },
  { q: "How do I request a refund?", a: "If you have issues with order quality, contact our 24/7 support line with your order ID. We process qualifying refunds instantly." },
  { q: "Can I schedule orders in advance?", a: "Yes! You can schedule food orders up to 48 hours in advance via our customer support or checkout notes." },
  { q: "Do you cater for bulk events?", a: "Absolutely! We cater for corporate events, parties, and weddings. Drop us a message here to get a customised quote." },
];

const W = { maxWidth: 1100, margin: "0 auto", padding: "0 24px" };
const input = {
  width: "100%", background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.09)",
  color: "#f0f0f0", padding: "13px 16px", borderRadius: 12,
  fontSize: 14, outline: "none", transition: "border-color 0.2s",
};

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 4500);
  };

  const focus = (e) => { e.target.style.borderColor = "#f59e0b"; };
  const blur  = (e) => { e.target.style.borderColor = "rgba(255,255,255,0.09)"; };

  return (
    <main style={{ background: "#080808", color: "#f0f0f0", minHeight: "100vh", padding: "72px 0 96px" }}>
      <div style={W}>

        {/* Header */}
        <header style={{ textAlign: "center", maxWidth: 580, margin: "0 auto 64px" }}>
          <span className="section-label">✉️ Contact Us</span>
          <h1 style={{ fontSize: "clamp(36px,6vw,60px)", fontWeight: 900, letterSpacing: -1, lineHeight: 1.1 }}>
            Get In <span className="grad-text">Touch</span>
          </h1>
          <p style={{ color: "#777", marginTop: 16, fontSize: 15, lineHeight: 1.8 }}>
            Have a query, bulk catering request, or kitchen feedback? Write to us and we'll reply shortly.
          </p>
        </header>

        {/* Main content grid */}
        <div className="contact-layout">

          {/* Left: info cards + map */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {info.map(({ icon, label, value }) => (
              <div key={label} style={{
                background: "#111", border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 16, padding: "16px 20px", display: "flex", gap: 16, alignItems: "flex-start",
                transition: "border-color 0.2s",
              }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(245,158,11,0.2)"}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"}
              >
                <span style={{ fontSize: 24, flexShrink: 0, marginTop: 2 }}>{icon}</span>
                <div>
                  <p style={{ fontSize: 10, fontWeight: 700, color: "#f59e0b", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 4 }}>{label}</p>
                  <p style={{ fontSize: 14, color: "#aaa", lineHeight: 1.6 }}>{value}</p>
                </div>
              </div>
            ))}

            {/* Map */}
            <div style={{ background: "#111", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, overflow: "hidden", height: 200, marginTop: 4 }}
              onMouseEnter={(e) => e.querySelector("iframe") && (e.querySelector("iframe").style.filter = "grayscale(0) opacity(0.85)")}
              onMouseLeave={(e) => e.querySelector("iframe") && (e.querySelector("iframe").style.filter = "grayscale(1) opacity(0.4)")}
            >
              <iframe
                title="location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.3168395371!2d78.24323134648438!3d17.412281000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                style={{ width: "100%", height: "100%", border: 0, filter: "grayscale(1) opacity(0.45)", transition: "filter 0.5s" }}
                allowFullScreen loading="lazy"
              />
            </div>
          </div>

          {/* Right: form */}
          <form onSubmit={submit} style={{
            background: "#111", border: "1px solid rgba(255,255,255,0.06)",
            borderTop: "3px solid #f59e0b", borderRadius: 20, padding: "36px",
            display: "flex", flexDirection: "column", gap: 20,
          }}>
            <h2 style={{ fontSize: 20, fontWeight: 800 }}>Send Us a Message</h2>

            {sent && (
              <div style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.25)", color: "#22c55e", fontSize: 14, padding: "14px 18px", borderRadius: 12 }}>
                ✅ Your message was sent successfully! We'll get back to you within 24 hours.
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="form-grid">
              <style>{`.form-grid{grid-template-columns:1fr;}@media(min-width:560px){.form-grid{grid-template-columns:1fr 1fr;}}`}</style>
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Full Name</label>
                <input type="text" name="name" value={form.name} onChange={change} placeholder="Your name" required style={input} onFocus={focus} onBlur={blur} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Email Address</label>
                <input type="email" name="email" value={form.email} onChange={change} placeholder="your@email.com" required style={input} onFocus={focus} onBlur={blur} />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Subject</label>
              <input type="text" name="subject" value={form.subject} onChange={change} placeholder="What is this regarding?" style={input} onFocus={focus} onBlur={blur} />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Message</label>
              <textarea name="message" value={form.message} onChange={change} rows={5} placeholder="How can we help you today?" required
                style={{ ...input, resize: "none", lineHeight: 1.7 }} onFocus={focus} onBlur={blur} />
            </div>

            <button type="submit" style={{
              background: "linear-gradient(135deg,#f59e0b,#f97316)", color: "#000",
              fontWeight: 800, padding: "15px", borderRadius: 100, fontSize: 15,
              border: "none", cursor: "pointer", transition: "all 0.25s",
              boxShadow: "0 4px 20px rgba(245,158,11,0.25)",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 32px rgba(245,158,11,0.35)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(245,158,11,0.25)"; }}
            >
              Send Message →
            </button>
          </form>
        </div>

        {/* FAQ Section */}
        <section style={{ marginTop: 96, maxWidth: 760, margin: "96px auto 0" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="section-label">General FAQ</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {faqs.map(({ q, a }, i) => {
              const open = openFaq === i;
              return (
                <div key={i} style={{ background: "#111", border: `1px solid ${open ? "rgba(245,158,11,0.2)" : "rgba(255,255,255,0.06)"}`, borderRadius: 16, overflow: "hidden", transition: "border-color 0.3s" }}>
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    style={{ width: "100%", padding: "20px 22px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", color: "#f0f0f0", cursor: "pointer", textAlign: "left", gap: 16 }}
                  >
                    <span style={{ fontWeight: 600, fontSize: 15, flex: 1 }}>{q}</span>
                    <span style={{ color: "#f59e0b", fontSize: 20, fontWeight: 700, transition: "transform 0.3s", transform: open ? "rotate(45deg)" : "rotate(0deg)", flexShrink: 0 }}>＋</span>
                  </button>
                  {open && (
                    <div style={{ padding: "0 22px 20px", color: "#777", fontSize: 14, lineHeight: 1.8, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16 }}>
                      {a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </main>
  );
}
