import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmDelete from "../components/ConfirmDelete";
import { useBlogStore } from "../store/useBlogStore";

export default function Blog() {
  const { blogs, deleteBlog } = useBlogStore();
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // animasi reveal setiap kali blogs berubah
  useEffect(() => {
    setTimeout(() => {
      document
        .querySelectorAll(".reveal")
        .forEach((el) => el.classList.add("show"));
    }, 10);
  }, [blogs]);

  function handleDelete() {
    if (deleteId === null) return;
    deleteBlog(deleteId);
    setDeleteId(null);
  }

  return (
    <section className="reveal min-h-screen bg-gray-50 pt-28 px-6 pb-20">
      {deleteId !== null && (
        <ConfirmDelete
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}

      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-blue-700 mb-10 text-center">
          Blog SpeakWell
        </h2>

        {blogs.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            Belum ada artikel yang dibuat.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold text-blue-700 mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">
                    {blog.author} — {blog.createdAt}
                  </p>
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {blog.content}
                  </p>
                </div>

                <div className="flex items-center mt-4">
                  <Link
                    to={`/blog/${blog.id}`}
                    className="text-blue-600 hover:underline w-full"
                  >
                    Read More →
                  </Link>
                  <button
                    onClick={() => setDeleteId(blog.id)}
                    className="text-red-600 hover:text-red-700 font-medium transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
