import { useParams } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaCalendarAlt } from "react-icons/fa";
import { QRCode } from "react-qr-code"; // Use react-qr-code package

const Berhasil = () => {
  const { code } = useParams(); // Get code from URL parameter

  return (
    <div className="font-poppins">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-32 text-center">
        <FaCalendarAlt className="text-6xl text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Berhasil Melakukan Janji Temu</h2>
        <p className="text-lg mb-4">Simpan Kode di bawah ini untuk referensi lebih lanjut:</p>

        {/* Flexbox container for QR code and the code */}
        <div className="flex justify-center items-center gap-6 mb-4">
          {/* QR Code on the right */}
          <div className="flex-shrink-0">
            <QRCode value={code} size={128} />
          </div>

          {/* Code below the QR code */}
          <div className="bg-gray-100 p-4 rounded-md w-full max-w-xs">
            <p className="text-xl font-semibold text-blue-600 text-center">Kode Anda: {code}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Berhasil;
