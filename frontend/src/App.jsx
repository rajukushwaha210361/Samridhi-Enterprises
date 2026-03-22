import { BrowserRouter, Routes, Route, Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/user/Navbar";
import Home from "./components/user/Home";
import Product from "./components/user/Product";
import Location from "./components/user/Location";
import About from "./components/user/About";
import Contact from "./components/user/Contact";
import AdminLogin from "./components/admin/AdminLogin";
import AdminNavbar from "./components/admin/AdminNavbar";
import AdminProduct from "./components/admin/AdminProduct";
import AdminLocation from "./components/admin/AdminLocation";
import AdminContact from "./components/admin/AdminContact";
import AdminAbout from "./components/admin/AdminAbout";
import AdminHome from "./components/admin/AdminHome";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import { Toaster } from "react-hot-toast";
// import AdminNavbar from "./components/admin/AdminNavbar";

// ✅ Layout - kaunsa navbar dikhana hai decide karta hai
const Layout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
    <Toaster position="top-right" />
      {/* Admin route pe AdminNavbar, baaki pe user Navbar */}
      {isAdminRoute && location.pathname !== "/admin/login"
        ? <AdminNavbar />
        : !isAdminRoute && <Navbar />
      }
      <div className="pt-16">
        <Outlet />
      </div>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>

          {/* ===== USER ROUTES ===== */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/location" element={<Location />} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          {/* ===== ADMIN ROUTES ===== */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/navbar" element={<ProtectedRoute><AdminNavbar /></ProtectedRoute>} />
          <Route path="/admin/product" element={<ProtectedRoute><AdminProduct /></ProtectedRoute>} />
          <Route path="/admin/location" element={<ProtectedRoute><AdminLocation /></ProtectedRoute>} />
          <Route path="/admin/contact" element={<ProtectedRoute><AdminContact /></ProtectedRoute>} />
          <Route path="/admin/about" element={<ProtectedRoute><AdminAbout /></ProtectedRoute>} />
          <Route path="/admin/home" element={<ProtectedRoute><AdminHome /></ProtectedRoute>} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;