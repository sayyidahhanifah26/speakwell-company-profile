// src/App.tsx

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./utils/ScrollToTop";
import { Routes, Route } from "react-router-dom"; 

// Import Components
import ProtectedRoute from "./components/ProtectedRoute"; // 🚨 DITAMBAHKAN

// Import Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Teams from "./pages/Teams";
import Login from "./pages/Login";
import BlogList from "./pages/blog/BlogList"; 
import BlogDetail from "./pages/blog/BlogDetail"; 
import CreateBlog from "./pages/blog/CreateBlog"; 

export default function App() {
    return (
        <div className="flex flex-col min-h-screen"> 
            <ScrollToTop />
            <Navbar />
            
            <main className="grow"> 
                <Routes>
                    {/* Rute Publik */}
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/teams" element={<Teams />} />
                    <Route path="/blog-list" element={<BlogList />} />
                    <Route path="/blog/:id" element={<BlogDetail />} />
                    <Route path="/login" element={<Login />} />
                    
                    {/* 🚨 PENGAMANAN RUTE: Menggunakan ProtectedRoute sebagai rute Induk */}
                    <Route element={<ProtectedRoute />}>
                        {/* Rute Anak yang dilindungi: dirender di dalam <Outlet /> dari ProtectedRoute */}
                        <Route path="/create-blog" element={<CreateBlog />} />
                    </Route>
                    
                </Routes>
            </main>
            
            <Footer />
        </div>
    );
}