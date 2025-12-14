import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios-instance";
import type { BlogPost } from "../../store/useBlogStore";

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>(); 
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogDetail() {
      if (!id) {
        setError("ID artikel tidak ditemukan.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get(`/data/Blog/${id}`);
        setBlog(response.data);
      } catch (err) {
        console.error("Gagal memuat detail blog:", err);
        setError("Artikel tidak ditemukan atau server bermasalah.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchBlogDetail();
  }, [id]);

  if (isLoading) {
    return (
      <section className="min-h-screen pt-28 flex items-center justify-center">
        <p className="text-xl text-blue-600">Memuat detail artikel...</p>
      </section>
    );
  }

  if (error || !blog) {
    return (
      <section className="min-h-screen pt-28 flex items-center justify-center">
        <p className="text-gray-600 text-lg">{error || "Artikel tidak ditemukan."}</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 pt-28 px-6">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          {blog.title}
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          {blog.author} — {new Date(blog.created).toLocaleDateString()}
        </p>

        <article className="text-gray-800 leading-relaxed whitespace-pre-line">
          {blog.content}
        </article>
      </div>
    </section>
  );
}