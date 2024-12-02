import { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import PropTypes from "prop-types";
import Modal from "./Modal"; 

// Data pengumuman dan publikasi
const pengumumanData = Array.from({ length: 10 }, (_, i) => ({
  title: `Pengumuman ${i + 1}`,
  description: `Deskripsi Pengumuman ${i + 1}`,
}));

const publikasiData = Array.from({ length: 10 }, (_, i) => ({
  title: `Publikasi ${i + 1}`,
  description: `Deskripsi Publikasi ${i + 1}`,
}));

const PengumumanPublikasi = () => {
  const [isPengumuman, setIsPengumuman] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const data = isPengumuman ? pengumumanData : publikasiData;
  const maxIndex = data.length - 3;

  const handleNavigation = (direction) => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + direction;
      return Math.max(0, Math.min(newIndex, maxIndex));
    });
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true); // Buka modal saat card diklik
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <section className="py-16 font-poppins">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center mb-10">Pengumuman & Publikasi</h2>

        <ToggleButton
          isPengumuman={isPengumuman}
          onToggle={() => {
            setIsPengumuman(!isPengumuman);
            setCurrentIndex(0);
          }}
        />

        <div className="relative overflow-visible">
          <NavigationButton
            direction="left"
            onClick={() => handleNavigation(-1)}
            disabled={currentIndex === 0}
          />
          <CardList data={data.slice(currentIndex, currentIndex + 3)} onCardClick={handleCardClick} />
          <NavigationButton
            direction="right"
            onClick={() => handleNavigation(1)}
            disabled={currentIndex >= maxIndex}
          />
        </div>

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={selectedItem?.title || ""}
          description={selectedItem?.description || ""}
        />
      </div>
    </section>
  );
};

const ToggleButton = ({ isPengumuman, onToggle }) => (
  <div className="flex justify-center mb-8 bg-gray-100 rounded-full p-1 w-fit mx-auto">
    <button
      onClick={() => onToggle(true)}
      className={`py-2 px-4 text-sm font-semibold rounded-full ${
        isPengumuman ? "bg-[#03346E] text-white" : "bg-transparent text-[#03346E]"
      }`}
    >
      Pengumuman
    </button>
    <button
      onClick={() => onToggle(false)}
      className={`py-2 px-4 text-sm font-semibold rounded-full ${
        !isPengumuman ? "bg-[#03346E] text-white" : "bg-transparent text-[#03346E]"
      }`}
    >
      Berita
    </button>
  </div>
);

ToggleButton.propTypes = {
  isPengumuman: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

const CardList = ({ data, onCardClick }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {data.map((item, index) => (
      <div
        key={index}
        className="group cursor-pointer border border-gray-300 rounded-2xl p-6 transition-all duration-300 hover:border-[#03346E] flex flex-col items-center"
        onClick={() => onCardClick(item)} // Panggil handleCardClick untuk membuka modal
      >
        <h3 className="text-xl font-semibold text-[#03346E] mb-4">{item.title}</h3>
        <p className="text-gray-600">{item.description}</p>
      </div>
    ))}
  </div>
);

CardList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  onCardClick: PropTypes.func.isRequired,
};

const NavigationButton = ({ direction, onClick, disabled }) => {
  const isLeft = direction === "left";
  return (
    <button
      onClick={onClick}
      className={`absolute ${isLeft ? "-left-6" : "-right-6"} top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-lg bg-[#03346E] text-white border-2 hover:bg-[#03346E] hover:text-white transition-all ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={disabled}
    >
      {isLeft ? <AiOutlineLeft size={24} /> : <AiOutlineRight size={24} />}
    </button>
  );
};

NavigationButton.propTypes = {
  direction: PropTypes.oneOf(["left", "right"]).isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default PengumumanPublikasi;
