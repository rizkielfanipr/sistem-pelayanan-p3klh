import InputForm from '../../components/admin/InputForm'; // Mengimpor ArticleForm

const AdminPenapisan = () => {
  // Daftar kategori yang sesuai dengan data yang diberikan
  const categories = [
    'penapisan-dokling',
    'penilaian-amdal',
    'pemeriksaan-uklupl',
    'penilaian-delhdplh',
    'registrasi-sppl',
    'amdalnet',
  ];

  // Label kategori yang lebih ramah pengguna
  const categoryLabels = {
    'penapisan-dokling': 'Penapisan Dokling',
    'penilaian-amdal': 'Penilaian AMDAL',
    'pemeriksaan-uklupl': 'Pemeriksaan UKL UPL',
    'penilaian-delhdplh': 'Penilaian DELH & DPLH',
    'registrasi-sppl': 'Registrasi SPPL',
    'amdalnet': 'AMDALNET',
  };

  // URL API untuk mengirim data form
  const API_URL = 'http://localhost:5000/service';

  // Daftar fields untuk form
  const fields = [
    { name: 'title', label: 'Judul', type: 'text' },
    { name: 'category', label: 'Pilih Layanan', type: 'select' },
    { name: 'image', label: 'Gambar', type: 'file' },
    { name: 'content', label: 'Konten', type: 'editor' },
  ];

  return (
    <div className="admin-container">

      {/* Menggunakan ArticleForm dan memberikan props yang dibutuhkan */}
      <InputForm
        title="Buat Artikel Baru"
        categories={categories}
        categoryLabels={categoryLabels}
        API_URL={API_URL}
        fields={fields}
      />
    </div>
  );
};

export default AdminPenapisan;
