import { useState, useEffect } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import PropTypes from "prop-types";
import Modal from "./Modal";

const PengumumanPublikasi = () => {
  const [isPengumuman, setIsPengumuman] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [pengumumanData, setPengumumanData] = useState([]);
  const [publikasiData, setPublikasiData] = useState([]);

  useEffect(() => {
    const fetchPengumuman = async () => {
      try {
        const response = await fetch("http://localhost:5000/announcement");
        const data = await response.json();
        setPengumumanData(data);
      } catch (error) {
        console.error("Error fetching pengumuman:", error);
      }
    };

    const fetchPublikasi = async () => {
      try {
        const response = await fetch("http://localhost:5000/news");
        const data = await response.json();
        setPublikasiData(data);
      } catch (error) {
        console.error("Error fetching publikasi:", error);
      }
    };

    fetchPengumuman();
    fetchPublikasi();
  }, []);

  const baseURL = "http://localhost:5000/";

  const data = isPengumuman ? pengumumanData : publikasiData;
  const maxIndex = data.length - 3;

  const handleNavigation = (direction) => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + direction;
      return Math.max(0, Math.min(newIndex, maxIndex));
    });
  };

  const handleCardClick = (item) => {
    setSelectedItem({
      title: item.title,
      content: item.content,
      imageSrc: baseURL + item.image,
      fileDownloadLink: `http://localhost:5000/announcement/download/${item.id}`, // Tautan unduh
    });
    setIsModalOpen(true);
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
          <CardList data={data.slice(currentIndex, currentIndex + 3)} onCardClick={handleCardClick} baseURL={baseURL} />
          <NavigationButton
            direction="right"
            onClick={() => handleNavigation(1)}
            disabled={currentIndex >= maxIndex}
          />
        </div>

        {isModalOpen && selectedItem && (
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            title={selectedItem.title}
            imageSrc={selectedItem.imageSrc}
            fileDownloadLink={selectedItem.fileDownloadLink}
            downloadButtonText="Unduh File"
          >
            <p>{selectedItem.content}</p>
          </Modal>
        )}
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

const CardList = ({ data, onCardClick, baseURL }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {data.map((item, index) => (
      <div
        key={index}
        className="group cursor-pointer border border-gray-300 rounded-2xl p-6 transition-all duration-300 hover:border-[#03346E] flex flex-col items-center"
        onClick={() => onCardClick(item)}
      >
        <img
          src={baseURL + item.image}
          alt={item.title}
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
        <h3 className="text-xl font-semibold text-[#03346E] mb-2">{item.title}</h3>
        <p className="text-gray-600">{item.content.substring(0, 50)}...</p>
      </div>
    ))}
  </div>
);

CardList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
  onCardClick: PropTypes.func.isRequired,
  baseURL: PropTypes.string.isRequired,
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
