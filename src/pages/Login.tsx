import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { login } = useAuthStore();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    login(email);
    navigate("/create-blog");
    document.dispatchEvent(new Event("app:navigate"));
  }

  return (
    <section className="reveal min-h-screen bg-gray-50 pt-28 flex items-center justify-center px-6">
      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Login
        </h2>

        <label className="block text-gray-700 mb-2">Email:</label>
        <input
          type="email"
          className="w-full border border-gray-300 p-3 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Masukkan email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 active:scale-95 transform duration-300 text-white py-3 rounded-lg font-semibold transition"
        >
          Login
        </button>
      </form>
    </section>
  );
}
