import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const Penapisan = () => {
  return (
    <div>
      <Navbar />
      <Header 
        title="Penapisan Dokling"
        description="Informasi Tentang Penapisan Dokling Melalui DLHK dan AMDALNET" />
        <p>Detail tentang Penapisan Dokling.</p>
      <Footer />
    </div>
  );
};

export default Penapisan;