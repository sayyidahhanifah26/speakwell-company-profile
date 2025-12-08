# SpeakWell — Website Pembelajaran Bahasa Inggris

SpeakWell adalah website company profile yang menyediakan informasi program pembelajaran bahasa Inggris berbasis praktik. Website ini dibangun menggunakan React + TypeScript + Vite dengan sistem autentikasi sederhana dan fitur publikasi blog.

---

## Tech Stack
- React + TypeScript + Vite
- Tailwind CSS
- React Router Dom
- Zustand (global state management)
- Axios (fetch API RandomUser)
- LocalStorage (simulasi database blog & login)

---

## Fitur Utama
- Landing Page (Home)
- About Page
- Services Page
- Teams Page (fetch mentor dari API)
- Blog Page
- Blog Detail Page
- Create Blog
- Login & Logout
- Blog hanya bisa dibuat jika login
- Animasi scroll (reveal)
- Responsif Mobile & Tablet

---

## Sistem Login & Blog
- Login menggunakan input email (tanpa password — simulasi)
- Email user disimpan di LocalStorage
- Jika belum login → tidak dapat mengakses halaman **Create Blog**
- Setelah publish blog → artikel langsung tampil di halaman **Blog**
- Blog & user dikelola melalui **Zustand store**

---

## API yang Digunakan
Halaman Teams menggunakan RandomUser API untuk generate data mentor:

https://randomuser.me/api/?results=6

---

## Struktur Folder
src
  components     -> Navbar, Footer, ConfirmDelete, dll
  pages          -> Home, About, Services, Teams, Blog, Login, dll
  store          -> Zustand (state user & blog)
  utils          -> API helper RandomUser
  App.tsx        -> routing utama
  main.tsx       -> entry + reveal animation script
  index.css      -> global style + animasi reveal

---

## Author
**Sayyidah Hanifah**
