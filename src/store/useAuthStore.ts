import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";
import axiosInstance from "../utils/axios-instance";

interface AuthState {
  email: string | null;
  isAuthenticated: boolean;
  userToken: string | null;

  login: (login: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      email: null,
      isAuthenticated: false,
      userToken: null,

      login: async (login, password) => {
        try {
          const response = await axiosInstance.post("/users/login", { login, password });

          const userToken = response.data["user-token"];
          const email = response.data.email;

          if (userToken && email) {
            set({ email, isAuthenticated: true, userToken });
            return true;
          }
          return false;
        } catch (error) {
          console.error("Login API failed:", axios.isAxiosError(error) ? error.response?.data : error);
          return false;
        }
      },

      logout: async () => {
        try {
          await axiosInstance.get("/users/logout");
        } catch (error) {
          console.warn("Logout API failed, but clearing local state:", error);
        } finally {
          set({ email: null, isAuthenticated: false, userToken: null });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        email: state.email,
        isAuthenticated: state.isAuthenticated,
        userToken: state.userToken
      }),
    }
  )
);