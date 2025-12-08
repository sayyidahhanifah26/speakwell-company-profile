import { useParams } from "react-router-dom";
import { useBlogStore } from "../store/useBlogStore";

export default function BlogDetail() {
  const { id } = useParams();
  const blogs = useBlogStore((state) => state.blogs);
  const blog = blogs.find((b) => b.id === Number(id));

  if (!blog) {
    return (
      <section className="min-h-screen pt-28 flex items-center justify-center">
        <p className="text-gray-600 text-lg">Artikel tidak ditemukan.</p>
      </section>
    );
  }

  return (
    <section className="reveal min-h-screen bg-gray-50 pt-28 px-6">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          {blog.title}
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          {blog.author} — {blog.createdAt}
        </p>

        <article className="text-gray-800 leading-relaxed whitespace-pre-line">
          {blog.content}
        </article>
      </div>
    </section>
  );
}
