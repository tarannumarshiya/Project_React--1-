import { Routes, Route } from "react-router-dom";

import Home from "../components/Home";
import AboutUs from "../components/AboutUs";
import ContactUs from "../components/ContactUs";
import VegItems from "../components/VegItems";
import NonVegItems from "../components/NonVegItems";
import Cart from "../components/Cart";

import AdminLogin from "../components/AdminLogin";
import AdminDashboard from "../components/AdminDashboard";

function AppRoutes() {
  return (
    <Routes>
      {/* User Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/veg" element={<VegItems />} />
      <Route path="/nonveg" element={<NonVegItems />} />
      <Route path="/cart" element={<Cart />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={<AdminDashboard />}
      />

      {/* Not Found Route */}
      <Route
        path="*"
        element={
          <h1 className="text-center text-4xl mt-20">
            404 - Page Not Found
          </h1>
        }
      />
    </Routes>
  );
}

export default AppRoutes;