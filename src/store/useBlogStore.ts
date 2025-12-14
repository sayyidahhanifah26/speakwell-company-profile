import { create } from "zustand";
import axios from "axios";
import axiosInstance from "../utils/axios-instance";
import { useAuthStore } from "./useAuthStore";

export interface BlogPost {
  objectId: string;
  title: string;
  content: string;
  author: string;
  created: number;
}

interface BlogState {
  blogs: BlogPost[];
  isLoading: boolean;
  error: string | null;

  fetchBlogs: () => Promise<void>;
  createBlog: (title: string, content: string) => Promise<boolean>;
  deleteBlog: (objectId: string) => Promise<boolean>;
}

export const useBlogStore = create<BlogState>((set, get) => ({
  blogs: [],
  isLoading: false,
  error: null,

  fetchBlogs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/data/Blog?sortBy=created%20desc");

      set({
        blogs: response.data as BlogPost[],
        isLoading: false
      });

    } catch (error) {
      const msg = axios.isAxiosError(error)
        ? error.message
        : "Gagal memuat artikel blog.";

      set({ error: msg, isLoading: false });
    }
  },

  createBlog: async (title, content) => {
    const email = useAuthStore.getState().email;
    if (!email) return false;

    try {
        const newBlogPost = { title, content, author: email };
        await axiosInstance.post("/data/Blog", newBlogPost);

        get().fetchBlogs();
        return true;
    } catch (error) {
        const msg = axios.isAxiosError(error)
            ? (error.response?.data as any)?.message || error.message
            : "Gagal membuat artikel blog.";

        set({ error: msg });
        return false;
    }
  },

  deleteBlog: async (objectId) => {
    try {
        await axiosInstance.delete(`/data/Blog/${objectId}`);

        get().fetchBlogs();
        return true;
    } catch (error) {
        const msg = axios.isAxiosError(error)
            ? (error.response?.data as any)?.message || error.message
            : "Gagal menghapus artikel blog.";

        set({ error: msg });
        return false;
    }
  },
}));