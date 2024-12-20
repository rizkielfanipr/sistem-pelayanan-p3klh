import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { FaComments, FaWhatsapp, FaClipboardList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Konsultasi = () => {
  const navigate = useNavigate();

  return (
    <div className="font-poppins">
      <Navbar />
      <Header
        title="Ajukan Konsultasi"
        description="Ajukan Konsultasi Mengenai Persetujuan Lingkungan Secara Luring atau Daring"
      />

      {/* Section untuk card buttons */}
      <div className="py-10 px-5 flex flex-col md:flex-row gap-5 justify-center items-center">
        {/* Card 1: Forum Diskusi */}
        <div className="flex flex-col items-center justify-center bg-white border p-5 rounded-lg hover:shadow-lg transition duration-300 ease-in-out w-64 text-center"
              onClick={() => navigate("/forum-diskusi")}
              >  
          <FaComments className="text-4xl text-blue-600 mb-3" />
          <h3 className="text-md font-semibold">Forum Diskusi</h3>
        </div>

        {/* Card 2: WhatsApp Center */}
        <div className="flex flex-col items-center justify-center bg-white border p-5 rounded-lg hover:shadow-lg transition duration-300 ease-in-out w-64 text-center">
          <FaWhatsapp className="text-4xl text-green-500 mb-3" />
          <h3 className="text-md font-semibold">WhatsApp Center</h3>
        </div>

        {/* Card 3: Daftar Konsultasi */}
        <div 
          className="flex flex-col items-center justify-center bg-white border p-5 rounded-lg hover:shadow-lg transition duration-300 ease-in-out w-64 text-center cursor-pointer"
          onClick={() => navigate("/konsultasi/ajukan")}
        >
          <FaClipboardList className="text-4xl text-orange-500 mb-3" />
          <h3 className="text-md font-semibold">Daftar Konsultasi</h3>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Konsultasi;
