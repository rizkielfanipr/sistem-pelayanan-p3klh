import PropTypes from "prop-types";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  imageSrc, 
  fileDownloadLink, 
  downloadButtonText 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 font-poppins bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-1/2 p-6 relative">
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-2xl text-gray-600 hover:text-black focus:outline-none"
        >
          <AiOutlineClose />
        </button>

        {/* Header Modal */}
        {title && (
          <div className="mb-4">
            <h3 className="font-bold text-xl">{title}</h3>
          </div>
        )}

        {/* Gambar (jika ada) */}
        {imageSrc && (
          <div className="mb-4 flex justify-center">
            <img
              src={imageSrc}
              alt="Modal content"
              className="max-w-full max-h-64 object-contain rounded-lg"
            />
          </div>
        )}

        {/* Konten Dinamis */}
        <div className="modal-content mb-4">{children}</div>

        {/* Tombol Unduh File (jika ada) */}
        {fileDownloadLink && (
          <div className="text-center">
            <a
              href={fileDownloadLink}
              download
              className="inline-block px-6 py-2 bg-[#03346E] text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {downloadButtonText || "Download File"}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string, // Optional jika tidak ingin menampilkan judul
  children: PropTypes.node, // Untuk konten dinamis
  imageSrc: PropTypes.string, // Optional: URL gambar
  fileDownloadLink: PropTypes.string, // Optional: URL file untuk diunduh
  downloadButtonText: PropTypes.string, // Optional: teks tombol unduh
};

export default Modal;
