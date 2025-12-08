import { create } from "zustand";

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

interface BlogState {
  blogs: BlogPost[];
  addBlog: (blog: BlogPost) => void;
  deleteBlog: (id: number) => void;
}

export const useBlogStore = create<BlogState>((set) => ({
  blogs: JSON.parse(localStorage.getItem("blogs") || "[]"),

  addBlog: (blog) =>
    set((state) => {
      const updated = [...state.blogs, blog];
      localStorage.setItem("blogs", JSON.stringify(updated));
      return { blogs: updated };
    }),

  deleteBlog: (id) =>
    set((state) => {
      const updated = state.blogs.filter((b) => b.id !== id);
      localStorage.setItem("blogs", JSON.stringify(updated));
      return { blogs: updated };
    }),
}));
