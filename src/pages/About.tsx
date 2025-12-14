const About = () => {
  return (
    <div className="pt-24">

      {/* COMPANY HISTORY */}
      <section className="px-6 py-24 max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-blue-700 mb-6">Sejarah SpeakWell</h2>
        <p className="text-gray-600 text-lg leading-relaxed mb-6">
          SpeakWell berdiri pada tahun 2018 dengan misi untuk membantu masyarakat Indonesia
          menguasai bahasa Inggris melalui metode pembelajaran yang efektif, menyenangkan,
          dan berbasis praktik. Program awal hanya diikuti oleh 35 siswa — namun berkat
          kualitas pengajaran dan pendekatan modern, SpeakWell berkembang pesat hingga
          memiliki lebih dari 50,000 alumni dalam 6 tahun terakhir.
        </p>
        <p className="text-gray-600 text-lg leading-relaxed">
          Saat ini, SpeakWell dikenal sebagai platform pembelajaran bahasa Inggris yang
          terpercaya, digunakan oleh pelajar, mahasiswa, pekerja profesional, dan perusahaan
          besar yang membutuhkan pelatihan komunikasi global.
        </p>
      </section>

      {/* TEAM INTRO */}
      <section className="px-6 py-24 bg-gray-50">
        <h2 className="text-4xl font-extrabold text-blue-700 mb-12 text-center">
          Tim Pengembang di Balik SpeakWell
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              name: "Alicia Santoso",
              role: "Founder & Academic Director",
              bio: "Spesialis pendidikan bahasa Inggris 10+ tahun, pencipta kurikulum SpeakWell."
            },
            {
              name: "Rio Pratama",
              role: "Head of Learning Experience",
              bio: "Berfokus pada teknologi pembelajaran interaktif dan peningkatan kualitas mentor."
            },
            {
              name: "Nadia Kusuma",
              role: "Community & Student Success Lead",
              bio: "Pengembang layanan dukungan belajar dan pendampingan siswa SpeakWell."
            },
          ].map((member, i) => (
            <div
              key={i}
              className="bg-white border border-blue-100 shadow-lg rounded-2xl p-8 text-center transition duration-300 hover:shadow-2xl hover:scale-105"
            >
              <h3 className="text-xl font-bold text-blue-700 mb-1">{member.name}</h3>
              <p className="font-medium text-gray-600 mb-4">{member.role}</p>
              <p className="text-gray-500 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CULTURE VALUES */}
      <section className="px-6 py-24 max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-blue-700 mb-10">Budaya & Nilai Perusahaan</h2>

        <ul className="space-y-6 text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
          <li>🔥 <span className="font-semibold text-blue-700">Learning by Doing —</span> fokus pada praktik, bukan teori.</li>
          <li>🤝 <span className="font-semibold text-blue-700">Supportive Community —</span> siswa dibimbing sampai berani berbicara.</li>
          <li>🌍 <span className="font-semibold text-blue-700">Global Mindset —</span> pembelajaran mengikuti standar komunikasi internasional.</li>
          <li>🚀 <span className="font-semibold text-blue-700">Continuous Improvement —</span> kurikulum terus diperbarui sesuai kebutuhan era digital.</li>
        </ul>
      </section>

    </div>
  );
}

export default About;