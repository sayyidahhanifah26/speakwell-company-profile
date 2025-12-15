import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./utils/ScrollToTop";
import { Routes, Route } from "react-router-dom"; 

import ProtectedRoute from "./components/ProtectedRoute";

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
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/teams" element={<Teams />} />
                    <Route path="/blog-list" element={<BlogList />} />
                    <Route path="/blog/:id" element={<BlogDetail />} />
                    <Route path="/login" element={<Login />} />
                    
                    <Route element={<ProtectedRoute />}>
                        <Route path="/create-blog" element={<CreateBlog />} />
                    </Route>
                    
                </Routes>
            </main>
            
            <Footer />
        </div>
    );
}