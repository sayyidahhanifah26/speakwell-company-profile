import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Teams from "./pages/Teams";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import CreateBlog from "./pages/CreateBlog";
import Login from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      {/* Navbar selalu di atas */}
      <Navbar />

      {/* Setiap kali ganti route, scroll balik ke atas */}
      <ScrollToTop />

      {/* Konten utama */}
      <main className="bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      {/* Footer di semua halaman */}
      <Footer />
    </BrowserRouter>
  );
}
