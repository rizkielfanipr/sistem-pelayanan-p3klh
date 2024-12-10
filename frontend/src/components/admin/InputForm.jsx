import { useState } from 'react';
import axios from 'axios';
import AlertSucces from '../AlertSuccess'; // Import komponen AlertSucces
import AlertError from '../AlertError'; // Import komponen AlertError
import Editor from './Editor'; // Import the new Editor component
import PropTypes from 'prop-types'; // Import PropTypes for prop validation

const InputForm = ({
  title = 'Create New Article',
  categories = [],
  categoryLabels = {},
  API_URL = '',
  fields = [],
}) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '', // Ditangani oleh React Quill
    image: null,
    file: null, // Tambahkan untuk menangani file
    category: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [editorState, setEditorState] = useState(''); // Untuk konten React Quill editor

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files && files.length > 0 ? files[0] : value, // Tangani field file
    }));
  };

  const handleEditorChange = (value) => {
    setEditorState(value);
    setFormData((prev) => ({
      ...prev,
      content: value, // Update content dari editor
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content || !formData.image) {
      setError('Please fill in all required fields, including the file.');
      return;
    }

    const form = new FormData();
    form.append('title', formData.title);
    form.append('content', formData.content);
    form.append('category', formData.category);
    form.append('image', formData.image);
    form.append('file', formData.file); // Tambahkan file ke form

    try {
      const response = await axios.post(API_URL, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        setSuccessMessage('Article created successfully!');
        setFormData({ title: '', content: '', category: '', image: null, file: null });
        setEditorState(''); // Reset editor
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
      <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>

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
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {categoryLabels[cat] || cat}
                    </option>
                  ))}
                </select>
              </div>
            );
          }

          if (field.type === 'editor') {
            return (
              <div key={field.name}>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <Editor value={editorState} onChange={handleEditorChange} />
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

InputForm.propTypes = {
  title: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.string),
  categoryLabels: PropTypes.objectOf(PropTypes.string),
  API_URL: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['text', 'file', 'select', 'editor']).isRequired,
    })
  ).isRequired,
};

export default InputForm;
