import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Hero = () => {
  const HeroContent = {
    title: [
      "Pelayanan Persetujuan Lingkungan",
      "Dinas Lingkungan Hidup dan Kehutanan",
      "Daerah Istimewa Yogyakarta"
    ],
    description:
      "Informasi Pelayanan persetujuan lingkungan untuk izin AMDAL, UKL-UPL, SPPL, DELH dan DPLH sesuai regulasi untuk keberlanjutan lingkungan.",
    buttons: [
      {
        text: "Ajukan Konsultasi",
        href: "#",
        style: "bg-[#002a62] hover:bg-[#002A62] text-white border-0 rounded-xl px-6 py-3"
      },
      {
        text: "Lihat Layanan",
        href: "#",
        style:
          "border-2 border-[#002a62] text-[#002a62] px-6 py-3 bg-transparent hover:bg-white hover:text-[#002a62] rounded-xl"
      }
    ]
  };

  const [currentSlide, setCurrentSlide] = useState(0);

  // Data untuk teks yang akan digeser
  const slideTextData = [
    "Informasi Pelayanan Persetujuan Lingkungan AMDAL, UKL UPL, SPPL, DELH dan DPLH",
    "Bidang Penaatan Pengkajian dan Pengembangan Lingkungan Hidup DLHK DIY",
    "Jam Buka: Senin - Jumat, 07:30 - 15:00."
  ];

  // Fungsi untuk menggeser ke kiri atau kanan
  const handleScroll = (direction) => {
    setCurrentSlide((prev) =>
      direction === "left"
        ? prev === 0
          ? slideTextData.length - 1
          : prev - 1
        : prev === slideTextData.length - 1
        ? 0
        : prev + 1
    );
  };

  // Fungsi auto-scroll setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === slideTextData.length - 1 ? 0 : prev + 1
      );
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  // Render buttons dynamically
  const renderButtons = HeroContent.buttons.map((button, index) => (
    <a
      key={index}
      href={button.href}
      className={`inline-flex justify-center items-center py-3 px-5 text-base font-semibold text-center transition duration-300 shadow-xl ${button.style}`}
    >
      {button.text}
    </a>
  ));

  return (
    <div>
      {/* Hero Section */}
      <div className="hero min-h-screen font-poppins">
        <div className="hero-content flex flex-col lg:flex-row font-poppins items-start px-6 py-20">
          <img
            src="/gakkum.png"
            className="max-w-lg lg:max-w-xl lg:w-1/3"
            alt="Hero Image"
          />
          <div className="lg:order-first">
            <h1 className="text-3xl font-bold">
              {HeroContent.title.map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </h1>
            <p className="py-6">{HeroContent.description}</p>
            <div className="flex space-x-4">{renderButtons}</div>
          </div>
        </div>
      </div>

      {/* Yellow Box with Scrollable Content */}
      <div className="relative bg-yellow-400 py-10 overflow-hidden">
        {/* Ornamental shapes */}
        <div className="absolute top-0 left-0 right-0 bottom-0 z-0 pointer-events-none">
          {/* Left Circle Ornament */}
          <div className="absolute left-10 top-1/4 transform -translate-x-1/2 opacity-30">
            <div className="bg-white rounded-full w-48 h-48"></div>
          </div>
          {/* Right Circle Ornament moved to inside the top right corner of yellow box */}
          <div className="absolute right-0 top-0 transform translate-x-1/2 opacity-30 z-10">
            <div className="bg-white rounded-full w-48 h-48"></div>
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Flex container to align elements horizontally */}
          <div className="flex items-center">
            {/* Arrow Buttons */}
            <div className="flex items-center space-x-4 z-10">
              {[["left", FaArrowLeft], ["right", FaArrowRight]].map(
                ([direction, Icon], index) => (
                  <button
                    key={index}
                    onClick={() => handleScroll(direction)}
                    className="text-2xl text-[#03346E] bg-white shadow-lg rounded-full p-2"
                  >
                    <Icon />
                  </button>
                )
              )}
            </div>

            {/* Displaying the current slide */}
            <div className="flex justify-center items-center text-center text-xl font-semibold text-[#03346E] flex-grow">
              {slideTextData[currentSlide]}
            </div>

            {/* Button to View All, placed at the right */}
            <div className="flex items-center">
              <a
                href="#"
                className="inline-block bg-[#002a62] hover:bg-[#002A62] text-white py-3 px-6 rounded-3xl shadow-xl"
              >
                Lihat Semua
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
