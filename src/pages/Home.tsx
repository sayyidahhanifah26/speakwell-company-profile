import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  interface Testimonial {
    msg: string;
    name: string;
    role: string;
  }

  const testimonials: Testimonial[] = [
    { msg: "Belajarnya seru, setiap kelas ada praktik speaking!", name: "Nadia", role: "SMA" },
    { msg: "Sekarang aku berani presentasi dan meeting pakai English.", name: "Bagas", role: "Karyawan" },
    { msg: "Mentornya ramah dan kelasnya nggak ngebosenin sama sekali!", name: "Evelyn", role: "Mahasiswa" },
  ];

  return (
    <div className="pt-24">

      {/* HERO SECTION */}
      <section className="bg-linear-to-b from-blue-900 to-blue-600 text-white text-center px-6 py-28">
        <h1 className="text-5xl font-extrabold mb-6 leading-tight">
          Speak well, <span className="text-blue-300">connect with the world.</span>
        </h1>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
          Tingkatkan kemampuan bahasa Inggris Anda dengan pembelajaran efektif dan berbasis praktik.
        </p>

        {/* FIXED BUTTON */}
        <button
          onClick={() => {
            navigate("/services");
            document.dispatchEvent(new Event("app:navigate"));
          }}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 transform hover:scale-105 active:scale-95 transition duration-300 text-white px-8 py-3 rounded-full font-semibold"
        >
          Mulai Belajar
        </button>
      </section>

      {/* ABOUT SECTION */}
      <section className="px-6 py-20 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-blue-700 mb-6">Tentang SpeakWell</h2>
        <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
          SpeakWell membantu pelajar membangun kepercayaan diri dalam komunikasi bahasa Inggris melalui metode praktik langsung bersama mentor profesional.
        </p>
      </section>

      {/* SERVICES SECTION */}
      <section className="px-6 py-20 bg-gray-50">
        <h2 className="text-4xl font-bold text-blue-700 mb-12 text-center">Program Pembelajaran</h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {["English For Kids", "General English", "Business English"].map((program) => (
            <div
              key={program}
              className="bg-white shadow-lg rounded-2xl p-8 text-center border border-gray-200 transition hover:-translate-y-1 duration-300"
            >
              <h3 className="text-2xl font-bold text-blue-700 mb-4">{program}</h3>
              <p className="text-gray-600">
                Kelas interaktif dengan metode modern untuk meningkatkan kemampuan berbicara, mendengar, membaca, dan menulis.
              </p>
            </div>
          ))}
        </div>

        {/* FIXED BUTTON */}
        <div className="text-center mt-12">
          <button
            onClick={() => {
              navigate("/services");
              setTimeout(() => {
                const event = new Event("scroll");
                window.dispatchEvent(event);
              }, 80);
            }}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 transform hover:scale-105 active:scale-95 transition duration-300 text-white px-6 py-3 rounded-full font-semibold"
          >
            Lihat Semua Program →
          </button>
        </div>
      </section>

      {/* TESTIMONIAL SECTION */}
      <section className="px-6 py-20 max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-blue-700 mb-12">Apa Kata Mereka?</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white p-8 shadow-md rounded-xl border border-gray-200 flex flex-col justify-between h-56"
            >
              <p className="text-gray-700 grow flex justify-center items-center text-center leading-relaxed mb-6">
                "{t.msg}"
              </p>
              {/* Nama & Status */}
              <div>
                <p className="text-blue-700 font-semibold -mb-1">{t.name}</p>
                <p className="text-gray-600">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
