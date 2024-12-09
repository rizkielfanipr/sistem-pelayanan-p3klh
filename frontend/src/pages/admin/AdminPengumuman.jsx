import InputForm from '../../components/admin/InputForm'; // Import komponen InputForm

const AdminPengumuman = () => {
  // Mendefinisikan URL API untuk pengiriman form data
  const API_URL = 'http://localhost:5000/announcement/create'; // Ganti dengan API URL yang sesuai

  // Menyediakan field yang diperlukan untuk form
  const fields = [
    { name: 'title', label: 'Judul', type: 'text' },
    { name: 'image', label: 'Gambar', type: 'file' },
    { name: 'file', label: 'File', type: 'file' },
    { name: 'content', label: 'Konten', type: 'editor' },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">Tambah Pengumuman</h1>
      <InputForm
        title="Tambah Pengumuman"
        API_URL={API_URL}
        fields={fields} // Menyertakan field yang sesuai
      />
    </div>
  );
};

export default AdminPengumuman;
