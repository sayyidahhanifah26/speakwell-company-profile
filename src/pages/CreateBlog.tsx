import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useBlogStore } from "../store/useBlogStore";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const { email, isLoggedIn } = useAuthStore();
  const { addBlog } = useBlogStore();

  // kalau belum login -> redirect
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email) return;

    const newBlog = {
      id: Date.now(),
      title,
      content,
      author: email,
      createdAt: new Date().toLocaleDateString(),
    };

    addBlog(newBlog);
    navigate("/blog");
    document.dispatchEvent(new Event("app:navigate"));
  }

  if (!isLoggedIn) return null;

  return (
    <section className="reveal min-h-screen bg-gray-50 pt-28 flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-2xl"
      >
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Buat Blog Baru
        </h2>

        <label className="block text-gray-700 mb-2">Judul Blog:</label>
        <input
          type="text"
          className="w-full border border-gray-300 p-3 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Masukkan judul"
          required
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="block text-gray-700 mb-2">Isi Blog:</label>
        <textarea
          className="w-full border border-gray-300 p-3 rounded-lg mb-6 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tulis isi blog..."
          required
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 active:scale-95 transition duration-300 transform hover:scale-105 text-white py-3 rounded-lg font-semibold"
        >
          Publish Artikel
        </button>
      </form>
    </section>
  );
}
