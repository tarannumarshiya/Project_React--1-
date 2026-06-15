import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import VegItems from "./components/VegItems";
import NonVegItems from "./components/NonVegItems";
import Home from "./components/Home";
import About from "./components/AboutUs";
import Contact from "./components/ContactUs";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import { getProducts } from "./services/productServices";
import { setFoodItems } from "./features/food/foodSlice";

function Layout() {
  const location = useLocation();
  const dispatch = useDispatch();
  const hideNavbar = location.pathname.startsWith("/admin");

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await getProducts();
        dispatch(setFoodItems(res.data));
      } catch (err) {
        console.error("Failed to fetch products from backend database:", err);
      }
    };
    fetchAllProducts();
  }, [dispatch]);

  return (
    <div style={{ width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/veg" element={<VegItems />} />
        <Route path="/nonveg" element={<NonVegItems />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={
          <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <div className="text-8xl mb-6">🍽️</div>
            <h1 className="text-4xl font-black text-white">404 — Page Not Found</h1>
            <a href="/" className="mt-6 text-amber-400 hover:underline">Back to Home</a>
          </div>
        } />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;