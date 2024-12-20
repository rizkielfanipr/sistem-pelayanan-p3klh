import InputForm from '../../components/admin/InputForm'; // Import komponen InputForm

const AdminPengumuman = () => {
  const API_URL = 'http://localhost:5000/announcement/create'; // Ganti dengan API URL yang sesuai

  const fields = [
    { name: 'title', label: 'Judul', type: 'text' },
    { name: 'image', label: 'Gambar', type: 'file' },
    { name: 'file', label: 'File', type: 'file' }, // Tambahkan file
    { name: 'content', label: 'Konten', type: 'editor' },
  ];

  return (
    <div className="container mx-auto p-6">
      <InputForm
        title="Tambah Pengumuman"
        API_URL={API_URL}
        fields={fields}
      />
    </div>
  );
};

export default AdminPengumuman;
