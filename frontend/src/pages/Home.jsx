import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import PengumumanPublikasi from "../components/Pengumuman";
import PertanyaanUmum from "../components/PertanyaanUmum";
import Location from "../components/Location";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <Services />
            <PengumumanPublikasi />
            <PertanyaanUmum />
            <Location />
            <Footer />
        </div>
    );
};

export default Home;
