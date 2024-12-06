// ArticleForm.js
import { useState } from 'react';
import axios from 'axios';
import AlertSucces from '../AlertSuccess';  // Import komponen AlertSucces
import AlertError from '../AlertError';  // Import komponen AlertError
import Editor from './Editor'; // Import the new Editor component

const ArticleForm = () => {
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
    content: '',  // This will be handled by React Quill
    image: null,
    category: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [editorState, setEditorState] = useState(''); // For React Quill editor content

  const API_URL = 'http://localhost:5000/service';

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
      content: value, // React Quill's value is the content
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi form data
    if (!formData.title || !formData.content || !formData.category || !formData.image) {
      setError("Please fill in all required fields.");
      return;
    }

    const form = new FormData();
    form.append('title', formData.title);
    form.append('content', formData.content); // Content from React Quill
    form.append('category', formData.category);
    form.append('image', formData.image);

    try {
      const response = await axios.post(API_URL, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        setSuccessMessage("Article created successfully!");
        setFormData({ title: '', content: '', category: '', image: null });
        setEditorState('');  // Reset editor
        setError('');
      }
    } catch (err) {
      console.error("Error Response:", err.response);
      setError(`Error: ${err.response ? err.response.data.message : err.message}`);
      setSuccessMessage('');
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-lg bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Create New Article</h2>

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
                      {categoryLabels[cat]} {/* Menampilkan kategori dengan nama yang lebih user-friendly */}
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
                  required
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
            Create Article
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArticleForm;
