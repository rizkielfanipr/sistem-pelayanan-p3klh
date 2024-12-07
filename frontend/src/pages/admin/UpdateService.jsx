import { useState, useEffect } from 'react';
import axios from 'axios';
import AlertSucces from '../../components/AlertSuccess'; // Import komponen AlertSucces
import AlertError from '../../components/AlertError'; // Import komponen AlertError
import Editor from '../../components/admin/Editor'; // Import Editor component
import { useParams } from 'react-router-dom'; // Untuk mendapatkan parameter dari URL

const UpdateService = () => {
  const { id, category } = useParams(); // Mengambil ID dan kategori dari URL

  const categories = [
    'penapisan-dokling',
    'penilaian-amdal',
    'pemeriksaan-uklupl',
    'penilaian-delhdplh',
    'registrasi-sppl',
    'amdalnet',
  ];

  const categoryLabels = {
    'penapisan-dokling': 'Penapisan Dokling',
    'penilaian-amdal': 'Penilaian AMDAL',
    'pemeriksaan-uklupl': 'Pemeriksaan UKL UPL',
    'penilaian-delhdplh': 'Penilaian DELH & DPLH',
    'registrasi-sppl': 'Registrasi SPPL',
    'amdalnet': 'AMDALNET',
  };

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null,
    category: category || '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [editorState, setEditorState] = useState('');
  const API_URL = `http://localhost:5000/service/${category}/${id}`;

  useEffect(() => {
    // Fetch existing data for the service
    const fetchServiceData = async () => {
      try {
        const response = await axios.get(API_URL);
        const { title, content, category } = response.data;
        setFormData({ title, content, category, image: null });
        setEditorState(content);
      } catch (err) {
        console.error('Error fetching service:', err);
        setError('Failed to fetch service data.');
      }
    };

    fetchServiceData();
  }, [API_URL]);

  const fields = [
    { name: 'title', label: 'Judul', type: 'text' },
    { name: 'image', label: 'Gambar', type: 'file' },
    { name: 'category', label: 'Pilih Layanan', type: 'select', options: categories },
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'image' ? files[0] : value,
    }));
  };

  const handleEditorChange = (value) => {
    setEditorState(value);
    setFormData((prev) => ({
      ...prev,
      content: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi form data
    if (!formData.title || !formData.content || !formData.category) {
      setError('Please fill in all required fields.');
      return;
    }

    const form = new FormData();
    form.append('title', formData.title);
    form.append('content', formData.content);
    form.append('category', formData.category);
    if (formData.image) {
      form.append('image', formData.image);
    }

    try {
      const response = await axios.put(API_URL, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setSuccessMessage('Service updated successfully!');
        setError('');
      }
    } catch (err) {
      console.error('Error Response:', err.response);
      setError(`Error: ${err.response ? err.response.data.message : err.message}`);
      setSuccessMessage('');
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-lg bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Update Service</h2>

      {successMessage && <AlertSucces message={successMessage} />}
      {error && <AlertError message={error} />}

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => {
          if (field.type === 'select') {
            return (
              <div key={field.name}>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <select
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Pilih Layanan</option>
                  {field.options.map((cat) => (
                    <option key={cat} value={cat}>
                      {categoryLabels[cat]}
                    </option>
                  ))}
                </select>
              </div>
            );
          }

          return (
            <div key={field.name}>
              <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              {field.type === 'file' ? (
                <input
                  type="file"
                  id={field.name}
                  name={field.name}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              )}
            </div>
          );
        })}

        <Editor value={editorState} onChange={handleEditorChange} />

        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Update Service
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateService;
