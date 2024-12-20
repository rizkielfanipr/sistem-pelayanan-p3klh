import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaCalendarAlt } from "react-icons/fa"; // Import calendar icon

const Berhasil = () => {
  const { code } = useParams(); // Get code from URL parameter

  return (
    <div className="font-poppins">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-32 text-center">
        <FaCalendarAlt className="text-6xl text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Berhasil Melakukan Janji Temu</h2>
        <p className="text-lg mb-4">Simpan Kode di bawah ini untuk referensi lebih lanjut:</p>
        <div className="bg-gray-100 p-4 rounded-md">
          <p className="text-xl font-semibold text-blue-600">Kode Anda: {code}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Berhasil;
