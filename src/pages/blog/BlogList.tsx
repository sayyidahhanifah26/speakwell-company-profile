import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'sonner';
import ConfirmDelete from "../../components/ConfirmDelete";
import { useBlogStore } from "../../store/useBlogStore";
import type { BlogPost } from "../../store/useBlogStore";
import { useAuthStore } from "../../store/useAuthStore";

const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const BlogList = () => {
    const { blogs, isLoading, error, fetchBlogs, deleteBlog } = useBlogStore();
    const { isAuthenticated, email } = useAuthStore();
    const [deleteId, setDeleteId] = useState<string | null>(null); 

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    const handleDelete = async () => {
        if (!deleteId) return;

        const blogToDelete = blogs.find(b => b.objectId === deleteId);
        
        if (!blogToDelete || blogToDelete.author !== email) {
            toast.error("Akses ditolak. Anda hanya dapat menghapus blog milik Anda sendiri.");
            setDeleteId(null);
            return;
        }

        const success = await deleteBlog(deleteId);
        if (success) {
            toast.success("Artikel berhasil dihapus!");
        } else {
            toast.error(error || "Gagal menghapus artikel.");
        }
        setDeleteId(null);
    };

    if (isLoading) {
        return <p className="text-center pt-32 text-xl font-medium">Memuat artikel...</p>;
    }

    if (error) {
        return <p className="text-center pt-32 text-xl font-medium text-red-600">Error: {error}</p>;
    }

    return (
        <section className="min-h-screen bg-gray-50 pt-28 px-6 pb-20">
            {deleteId !== null && (
                <ConfirmDelete
                    onConfirm={handleDelete}
                    onCancel={() => setDeleteId(null)}
                />
            )}

            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-blue-700 text-center mb-10">
                    Blog SpeakWell
                </h2>

                {blogs.length === 0 ? (
                    <div className="text-center text-gray-500 text-lg pt-10">
                        <p>
                            Belum ada artikel yang dipublikasikan.
                        </p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog: BlogPost) => (
                            <div
                                key={blog.objectId} 
                                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    <h3 className="text-xl font-bold text-blue-700 mb-2">
                                        {blog.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm mb-3">
                                        {blog.author} — {formatTimestamp(blog.created)} 
                                    </p>
                                    <p className="text-gray-700 mb-4 line-clamp-3">
                                        {blog.content}
                                    </p>
                                </div>

                                <div className="flex items-center mt-4">
                                    <Link
                                        to={`/blog/${blog.objectId}`} 
                                        className="text-blue-600 hover:underline w-full"
                                    >
                                        Read More →
                                    </Link>
                                    
                                    {isAuthenticated && email === blog.author && (
                                        <button
                                            onClick={() => setDeleteId(blog.objectId)}
                                            className="text-red-600 hover:text-red-700 font-medium transition ml-4"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default BlogList;