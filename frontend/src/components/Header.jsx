import PropTypes from "prop-types";
import { useMemo } from "react";

const Header = ({ title, description }) => {
  // Menghitung ornamen geometris menggunakan useMemo untuk menghindari perhitungan ulang
  const geometricShapes = useMemo(() => {
    return [
      { className: "absolute top-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full" },
      { className: "absolute top-10 right-10 w-20 h-20 bg-white opacity-10 rounded-full" },
      { className: "absolute bottom-10 left-10 w-40 h-20 bg-white opacity-10 rotate-45" },
      { className: "absolute bottom-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full" },
    ];
  }, []);

  return (
    <header className="relative bg-gradient-to-r from-[#03346E] via-[#0456A5] to-[#0679D9] font-poppins text-white py-10 mt-24 overflow-hidden">
      {/* Ornamen Geometris */}
      {geometricShapes.map((shape, index) => (
        <div key={index} className={shape.className}></div>
      ))}

      {/* Konten Header */}
      <div className="container mx-auto text-center relative">
        <h1 className="text-3xl font-bold">{title}</h1>
        <button
          className="mt-4 px-6 py-2 bg-white text-[#03346E] text-xs rounded-full shadow hover:bg-gray-100"
          onClick={() => console.log(`${description} clicked`)} // Logika tambahan untuk aksi tombol
        >
          {description}
        </button>
      </div>
    </header>
  );
};

// Validasi props menggunakan PropTypes
Header.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Header;
