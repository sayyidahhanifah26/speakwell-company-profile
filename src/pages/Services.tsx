import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function Services() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();

  const services = [
    {
      title: "English For Kids",
      description:
        "Program untuk anak usia 6–12 tahun dengan metode belajar interaktif, permainan bahasa, dan aktivitas kreatif untuk meningkatkan speaking dan listening sejak dini.",
      price: "Rp 800.000 / 8 pertemuan",
      testimonial:
        "“Anak saya jadi percaya diri bicara bahasa Inggris di sekolah!”",
    },
    {
      title: "General English",
      description:
        "Kelas bahasa Inggris untuk remaja dan dewasa dengan fokus pada speaking, grammar, pronunciation, dan vocabulary, cocok untuk sekolah, kuliah, maupun kebutuhan sehari-hari.",
      price: "Rp 1.250.000 / 8 pertemuan",
      testimonial:
        "“Dalam 2 bulan speaking-ku meningkat drastis dan jauh lebih lancar.”",
    },
    {
      title: "Business English",
      description:
        "Program untuk profesional yang ingin meningkatkan kemampuan komunikasi formal di lingkungan kerja — email bisnis, meeting internasional, presentasi, dan negosiasi.",
      price: "Rp 1.750.000 / 8 pertemuan",
      testimonial:
        "“Meeting internasional jadi jauh lebih lancar dan profesional.”",
    },
  ];

  function handleEnroll() {
    if (isLoggedIn) {
      navigate("/create-blog");
    } else {
      navigate("/login");
    }
    document.dispatchEvent(new Event("app:navigate"));
  }

  return (
    <section className="reveal min-h-screen bg-gray-50 pt-28 px-6 md:px-16">
      <h2 className="text-center text-4xl font-extrabold text-blue-700 mb-14">
        Program Pembelajaran SpeakWell
      </h2>

      <div className="grid gap-12 max-w-7xl mx-auto lg:grid-cols-3">
        {services.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-blue-100 shadow-lg rounded-2xl p-8 flex flex-col justify-between text-center transition duration-300 hover:shadow-2xl hover:scale-105"
          >
            <h3 className="text-2xl font-bold text-blue-700 mb-4">
              {item.title}
            </h3>

            <p className="text-gray-600 leading-relaxed mb-6">
              {item.description}
            </p>

            <div className="bg-blue-50 text-blue-700 font-semibold rounded-xl py-2 px-4 mb-6 border border-blue-200 shadow-sm">
              {item.price}
            </div>

            <p className="italic text-gray-700 border-t pt-4 text-sm mb-6">
              {item.testimonial}
            </p>

            <button
              onClick={handleEnroll}
              className="mt-auto w-full bg-blue-600 hover:bg-blue-500 active:scale-95 transition duration-300 transform hover:scale-105 text-white py-3 rounded-lg font-semibold"
            >
              Daftar Sekarang
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
