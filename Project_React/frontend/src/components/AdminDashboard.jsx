import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, addProduct, deleteProduct } from "../services/productServices";

function AdminDashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", image: "", category: "veg" });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addProduct(form);
      setForm({ name: "", price: "", image: "", category: "veg" });
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const filtered = activeTab === "all" ? products : products.filter((p) => p.category === activeTab);

  const inputClass =
    "w-full bg-[#0a0a0a] border border-white/10 text-white placeholder-gray-700 px-4 py-3 rounded-xl focus:outline-none focus:border-amber-400 transition-colors text-sm";

  return (
    <main className="w-full min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Top bar */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black">
              Admin <span className="text-amber-400">Dashboard</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">Food Paradise Management System</p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="border border-white/10 hover:border-amber-400/40 text-gray-400 hover:text-white px-4 py-2 rounded-full text-sm transition-all duration-200"
          >
            ← Back to Site
          </button>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Products", val: products.length, icon: "📦" },
            { label: "Veg Items", val: products.filter((p) => p.category === "veg").length, icon: "🌱" },
            { label: "Non-Veg Items", val: products.filter((p) => p.category === "nonveg").length, icon: "🍗" },
            { label: "Avg. Price", val: products.length ? `₹${Math.round(products.reduce((s, p) => s + Number(p.price), 0) / products.length)}` : "—", icon: "💰" },
          ].map(({ label, val, icon }) => (
            <div key={label} className="bg-[#111] border border-white/10 rounded-2xl p-5">
              <div className="text-2xl mb-2">{icon}</div>
              <p className="text-2xl font-black text-amber-400">{val}</p>
              <p className="text-gray-500 text-xs mt-1">{label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">

          {/* Add Product Form */}
          <aside className="bg-[#111] border border-white/10 rounded-2xl p-6 border-t-2 border-t-amber-400">
            <h2 className="text-lg font-extrabold mb-5">Add New Product</h2>

            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Food Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Butter Chicken" className={inputClass} required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Price (₹)</label>
                <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="e.g. 250" className={inputClass} required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Image URL</label>
                <input type="text" name="image" value={form.image} onChange={handleChange} placeholder="https://..." className={inputClass} required />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Category</label>
                <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
                  <option value="veg">🌱 Vegetarian</option>
                  <option value="nonveg">🍗 Non-Vegetarian</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-400 hover:bg-amber-300 text-black py-3.5 rounded-full font-extrabold transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 mt-2"
              >
                {loading ? "Adding..." : "+ Add Product"}
              </button>
            </form>
          </aside>

          {/* Products List */}
          <div className="lg:col-span-2">
            {/* Filter tabs */}
            <div className="flex gap-2 mb-5">
              {["all", "veg", "nonveg"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-amber-400 text-black"
                      : "bg-[#111] border border-white/10 text-gray-400 hover:border-amber-400/30"
                  }`}
                >
                  {tab === "all" ? "All" : tab === "veg" ? "🌱 Veg" : "🍗 Non-Veg"}
                  <span className="ml-1.5 text-xs">
                    ({tab === "all" ? products.length : products.filter((p) => p.category === tab).length})
                  </span>
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <div className="bg-[#111] border border-white/10 rounded-2xl p-12 text-center text-gray-600">
                <div className="text-5xl mb-3">📭</div>
                <p>No products yet. Add your first product!</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {filtered.map((item) => (
                  <article
                    key={item._id}
                    className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-amber-400/20 transition-colors"
                  >
                    <div className="relative h-44">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <span className={`absolute top-2 left-2 text-xs font-bold px-2.5 py-1 rounded-full ${
                        item.category === "veg"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}>
                        {item.category === "veg" ? "🌱 Veg" : "🍗 Non-Veg"}
                      </span>
                    </div>

                    <div className="p-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-sm">{item.name}</h3>
                        <p className="text-amber-400 font-extrabold mt-0.5">₹{item.price}</p>
                      </div>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-500/15 hover:bg-red-500 border border-red-500/30 text-red-400 hover:text-white w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 text-sm"
                        title="Delete"
                      >
                        🗑
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}

export default AdminDashboard;
