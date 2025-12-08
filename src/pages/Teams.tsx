import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios-instance";

interface Mentor {
  name: string;
  picture: string;
  role: string;
  bio: string;
}

export default function Teams() {
  const [mentors, setMentors] = useState<Mentor[]>([]);

  useEffect(() => {
    const roles = [
      "Speaking Coach",
      "Grammar Specialist",
      "Business English Trainer",
      "Kids English Mentor",
      "IELTS Preparation Expert",
      "Academic English Lecturer",
    ];

    const bios = [
      "Mengajar speaking dengan pendekatan praktis & real conversation.",
      "Fokus meningkatkan grammar writing dengan metode step-by-step.",
      "Berpengalaman melatih karyawan perusahaan multinasional dalam komunikasi bisnis.",
      "Spesialis kelas anak dengan metode fun learning & storytelling.",
      "Berhasil membantu >200 siswa mencapai target IELTS 6.5 – 8.0.",
      "Mengintegrasikan teknik akademik untuk research presentation dan public speaking.",
    ];

    axiosInstance
      .get("/api/?results=6")
      .then((res) => {
        const formatted = res.data.results.map((m: any, index: number) => ({
          name: `${m.name.first} ${m.name.last}`,
          picture: m.picture.large,
          role: roles[index % roles.length],
          bio: bios[index % bios.length],
        }));
        setMentors(formatted);
      })
      .catch(() => console.error("Gagal memuat mentor"));
  }, []);

  return (
    <section className="reveal min-h-screen bg-gray-50 pt-28 px-6 md:px-16">
      <h2 className="text-center text-4xl font-extrabold text-blue-700 mb-14">
        Mentor SpeakWell
      </h2>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {mentors.map((mentor, index) => (
          <div
            key={index}
            className="bg-white border border-blue-100 shadow-lg rounded-2xl p-6 flex flex-col justify-start items-center text-center transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={mentor.picture}
              alt={mentor.name}
              className="w-32 h-32 rounded-full mb-5 shadow-md object-cover"
            />

            <h3 className="text-xl font-bold text-blue-700">{mentor.name}</h3>

            <p className="text-gray-600 font-medium mb-3">{mentor.role}</p>

            <p className="text-gray-500 text-sm leading-relaxed max-w-[230px]">
              {mentor.bio}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
