import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import DOMPurify from 'dompurify'; // Import DOMPurify to sanitize HTML

import Editor from '../../components/admin/Editor'; // Import Editor Component

const DetailDiskusi = () => {
  const { id } = useParams();
  const [diskusi, setDiskusi] = useState(null);
  const [balasan, setBalasan] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [replies, setReplies] = useState([]); // State untuk balasan

  // Fungsi untuk memformat tanggal
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Mengambil data diskusi dan balasan
  useEffect(() => {
    const fetchDiskusi = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/discussions/${id}`);
        setDiskusi(response.data.data);
      } catch {
        setErrorMessage('Gagal memuat diskusi.');
      }
    };

    const fetchReplies = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/discussions/${id}/replies`);
        setReplies(response.data.data);
      } catch {
        setErrorMessage('Gagal memuat balasan.');
      }
    };

    fetchDiskusi();
    fetchReplies();
  }, [id]);

  // Mengubah nilai balasan
  const handleBalasanChange = (value) => {
    setBalasan(value);
  };

  // Menangani pengiriman balasan
  const handleBalasSubmit = async (e) => {
    e.preventDefault();

    if (!balasan.trim()) {
      setErrorMessage('Balasan tidak boleh kosong.');
      return;
    }

    try {
      await axios.post(`http://localhost:5000/discussions/${id}/replies`, { content: balasan });
      setSuccessMessage('Balasan berhasil dikirim!');
      setBalasan('');
      // Memuat ulang balasan setelah berhasil mengirim balasan
      const response = await axios.get(`http://localhost:5000/discussions/${id}/replies`);
      setReplies(response.data.data);
    } catch {
      setErrorMessage('Gagal mengirim balasan.');
    }
  };

  return (
    <div>
      <Navbar />
      <Header title="Detail Diskusi" description="Diskusi tentang topik lingkungan" />

      <div className="p-6">
        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
        {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

        {diskusi ? (
          <div>
            <h1 className="text-3xl font-semibold mb-4">{diskusi.title}</h1>
            <p className="text-lg mb-2"><strong>Topik Pertanyaan:</strong> {diskusi.topic}</p>
            {diskusi.image && <img src={`http://localhost:5000/${diskusi.image}`} alt="Diskusi Image" className="w-full h-auto mb-4" />}
            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(diskusi.content),
              }}
            />
            <p className="text-sm text-gray-500 mt-2">Dikirim pada: {diskusi.createdAt && formatDate(diskusi.createdAt)}</p>

            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-2">Balasan Diskusi</h2>
              {replies.length > 0 ? (
                <div>
                  {replies.map((reply) => (
                    <div key={reply.id} className="border-t pt-4">
                      <div
                        className="text-gray-700"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(reply.content),
                        }}
                      />
                      <p className="text-sm text-gray-500">Dikirim pada: {formatDate(reply.createdAt)}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Belum ada balasan.</p>
              )}

              <h3 className="text-xl font-semibold mt-6">Balas Diskusi</h3>
              {/* Use the Editor component here */}
              <Editor 
                value={balasan} 
                onChange={handleBalasanChange} 
              />
              <button
                onClick={handleBalasSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
              >
                Kirim Balasan
              </button>
            </div>
          </div>
        ) : (
          <p>Memuat diskusi...</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default DetailDiskusi;
