import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

function revealElements() {
  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach((el) => {
    const rect = (el as HTMLElement).getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight - 10) {
      el.classList.add("show");
    }
  });
}

// jalan saat halaman pertama kali load
window.addEventListener("load", revealElements);
window.addEventListener("DOMContentLoaded", revealElements);

// jalan saat scroll
document.addEventListener("scroll", revealElements);

// jalan saat klik <a> (link di navbar & footer)
document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (target.tagName === "A" || target.closest("a")) {
    setTimeout(revealElements, 50);
  }
});

// 🔴 TAMBAHAN: jalan setiap kali kita dispatch event manual dari tombol React
document.addEventListener("app:navigate", () => {
  setTimeout(() => {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach((el: any) => el.classList.add("show"));
  }, 50);
});




ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Pastikan reveal muncul tanpa scroll di halaman pertama
setTimeout(revealElements, 80);
