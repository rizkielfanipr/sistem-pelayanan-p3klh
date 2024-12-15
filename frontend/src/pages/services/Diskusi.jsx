import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Modal from "../../components/Modal";
import AlertSuccess from "../../components/AlertSuccess";
import AlertError from "../../components/AlertError";
import Editor from "../../components/admin/Editor"; // Import Editor component

const Diskusi = () => {
  const [formData, setFormData] = useState({
    topic: '',
    title: '',
    content: '',  // Content handled by the Editor component
    image: '',  // Image file to be uploaded
  });
  const [discussions, setDiscussions] = useState([]); // Store discussions
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch discussions from API
  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/discussions');
        if (Array.isArray(response.data.data)) {
          setDiscussions(response.data.data); // Save discussions data
        } else {
          console.error('Received data is not an array');
        }
      } catch (err) {
        console.error('Error fetching discussions:', err);
      }
    };
    fetchDiscussions();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle editor content change
  const handleEditorChange = (value) => {
    setFormData({ ...formData, content: value });
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    const data = new FormData();
    data.append('topic', formData.topic);
    data.append('title', formData.title);
    data.append('content', formData.content);
    if (formData.image) {
      data.append('image', formData.image); // Attach the image
    }

    try {
      await axios.post('http://localhost:5000/discussions', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFormData({ topic: '', title: '', content: '', image: '' });
      setSuccessMessage('Diskusi berhasil dibuat!');

      // Fetch updated list of discussions
      const response = await axios.get('http://localhost:5000/discussions');
      setDiscussions(response.data.data);
    } catch (err) {
      console.error(err);
      setErrorMessage('Gagal membuat diskusi. Silakan coba lagi.');
    }
  };

  return (
    <div>
      <Navbar />
      <Header title="Forum Diskusi" description="Forum Diskusi Tentang Persetujuan Lingkungan" />
      
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Forum Diskusi</h1>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          onClick={() => setIsModalOpen(true)}
        >
          Buat Diskusi Baru
        </button>

        {/* Modal for creating new discussion */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSuccessMessage('');
            setErrorMessage('');
          }}
          title="Buat Diskusi Baru"
        >
          {successMessage && <AlertSuccess message={successMessage} />}
          {errorMessage && <AlertError message={errorMessage} />}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="topic" className="block mb-2 font-semibold">Topik Pertanyaan</label>
              <select
                name="topic"
                value={formData.topic}
                onChange={handleInputChange}
                className="border p-2 w-full"
                required
              >
                <option value="">Pilih Topik</option>
                <option value="Penapisan Dokling">Penapisan Dokling</option>
                <option value="Penilaian AMDAL">Penilaian AMDAL</option>
                <option value="Pemeriksaan UKL UPL">Pemeriksaan UKL UPL</option>
                <option value="Registrasi SPPL">Registrasi SPPL</option>
                <option value="Penilaian DELH & DPLH">Penilaian DELH & DPLH</option>
                <option value="AMDALNET">AMDALNET</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label htmlFor="title" className="block mb-2 font-semibold">Judul Pertanyaan</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="border p-2 w-full"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="content" className="block mb-2 font-semibold">Uraian Pertanyaan</label>
              <Editor value={formData.content} onChange={handleEditorChange} />
            </div>
            
            <div className="mb-4">
              <label htmlFor="image" className="block mb-2 font-semibold">Pilih Gambar (opsional)</label>
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="border p-2 w-full"
              />
            </div>
            
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Submit
            </button>
          </form>
        </Modal>

        {/* Display the discussions */}
        <div className="mt-4">
          {discussions.length > 0 ? (
            discussions.map((discussion) => (
              <div key={discussion.id} className="border p-4 mb-4 rounded-md shadow-sm">
                <h2 className="text-xl font-semibold">{discussion.title}</h2>
                <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: discussion.content }} />
                <Link
                  to={`/detail-diskusi/${discussion.id}`}
                  className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
                >
                  Jawab Diskusi
                </Link>
              </div>
            ))
          ) : (
            <p>Tidak ada diskusi untuk ditampilkan.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Diskusi;
