import React, { useState } from "react";

// Data pengumuman dan publikasi
const pengumumanData = [
  { title: "Pengumuman 1", description: "Deskripsi Pengumuman 1" },
  { title: "Pengumuman 2", description: "Deskripsi Pengumuman 2" },
  { title: "Pengumuman 3", description: "Deskripsi Pengumuman 3" },
];

const publikasiData = [
  { title: "Publikasi 1", description: "Deskripsi Publikasi 1" },
  { title: "Publikasi 2", description: "Deskripsi Publikasi 2" },
  { title: "Publikasi 3", description: "Deskripsi Publikasi 3" },
];

const PengumumanPublikasi = () => {
  const [isPengumuman, setIsPengumuman] = useState(true); // true = Pengumuman, false = Publikasi

  const handleToggleChange = () => {
    setIsPengumuman(!isPengumuman); // Toggle antara Pengumuman dan Publikasi
  };

  return (
    <section className="py-16 font-poppins">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center mb-10">Pengumuman & Publikasi</h2>
        
        {/* Toggle dengan teks */}
        <div className="flex justify-center mb-8 space-x-10">
          <button
            onClick={handleToggleChange}
            className={`text-lg font-semibold ${isPengumuman ? "text-[#03346E]" : "text-gray-500"}`}
          >
            Pengumuman
          </button>
          <span>|</span>
          <button
            onClick={handleToggleChange}
            className={`text-lg font-semibold ${!isPengumuman ? "text-[#03346E]" : "text-gray-500"}`}
          >
            Publikasi
          </button>
        </div>

        {/* Menampilkan Pengumuman atau Publikasi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {(isPengumuman ? pengumumanData : publikasiData).map((item, index) => (
            <div
              key={index}
              className="group cursor-pointer border border-gray-300 rounded-2xl p-6 transition-all duration-300 hover:border-[#03346E] flex flex-col items-center"
            >
              <h3 className="text-xl font-semibold text-[#03346E] mb-4">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PengumumanPublikasi;
