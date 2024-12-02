import PropTypes from "prop-types";
import { AiOutlineClose } from "react-icons/ai"; 
import { useCallback } from "react";

const Modal = ({ isOpen, onClose, title, description }) => {
  // Gunakan useCallback untuk meminimalkan pembuatan fungsi ulang
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // Jika modal tidak terbuka, return null agar tidak merender
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 font-poppins bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-1/2 p-6 relative">
        {/* Tombol Close dengan Icon X */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-2xl text-gray-600 hover:text-black focus:outline-none"
        >
          <AiOutlineClose />
        </button>

        {/* Isi Modal */}
        <div className="mb-4">
          <h3 className="font-bold text-xl">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
        </div>
      </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Modal;
