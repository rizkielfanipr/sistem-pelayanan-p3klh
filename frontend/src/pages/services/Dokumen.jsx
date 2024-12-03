import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const Dokumen = () => {
  return (
    <div>
      <Navbar />
      <Header 
        title="Kirim Dokumen"
        description="Kirim Dokumen Secara Online" />
        <p>Detail tentang Penapisan Dokling.</p>
      <Footer />
    </div>
  );
};

export default Dokumen;