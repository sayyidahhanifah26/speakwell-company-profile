import { create } from "zustand";

interface AuthState {
  email: string | null;
  isLoggedIn: boolean;
  login: (email: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  email: localStorage.getItem("userEmail"),
  isLoggedIn: !!localStorage.getItem("userEmail"),

  login: (email) => {
    localStorage.setItem("userEmail", email);
    set({ email, isLoggedIn: true });
  },

  logout: () => {
    localStorage.removeItem("userEmail");
    set({ email: null, isLoggedIn: false });
  },
}));
