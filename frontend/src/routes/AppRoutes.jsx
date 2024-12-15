import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Penapisan from '../pages/services/Penapisan';
import Penilaian from '../pages/services/Penilaian';
import Pemeriksaan from '../pages/services/Pemeriksaan';
import Registrasi from '../pages/services/Registrasi';
import Evaluasi from '../pages/services/Evaluasi';
import Dokumen from '../pages/services/Dokumen';
import Amdalnet from '../pages/services/Amdalnet';
import Diskusi from '../pages/services/Diskusi';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Dashboard from '../pages/admin/Dashboard';
import AdminPenapisan from '../pages/admin/AdminPenapisan';
import UpdateService from '../pages/admin/UpdateService';
import AdminPengumuman from '../pages/admin/AdminPengumuman';
import AdminPublikasi from '../pages/admin/AdminPublikasi';
import DetailDiskusi from '../pages/services/DetailDiskusi';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rute Layanan Kami */}
      <Route path="/" element={<Home />} />
      <Route path="/penapisan-dokling" element={<Penapisan />} />
      <Route path="/penilaian-amdal" element={<Penilaian />} />
      <Route path="/pemeriksaan-ukl-upl" element={<Pemeriksaan />} />
      <Route path="/registrasi-sppl" element={<Registrasi />} />
      <Route path="/penilaian-delh" element={<Evaluasi />} />
      <Route path="/kirim-dokumen" element={<Dokumen />} />
      <Route path="/amdalnet" element={<Amdalnet />} />
      <Route path="/forum-diskusi" element={<Diskusi />} />

      {/* Rute Auth */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Rute Admin */}
      <Route path="/dashboard-admin" element={<Dashboard />} />
      <Route path="/admin-penapisan" element={<AdminPenapisan />} />
      <Route path="/update-service/:category/:id" element={<UpdateService />} />
      <Route path="/admin-pengumuman" element={<AdminPengumuman />} />
      <Route path="/admin-publikasi" element={<AdminPublikasi />} />
      <Route path="/detail-diskusi/:id" element={<DetailDiskusi />} />
    </Routes>
  );
};

export default AppRoutes;