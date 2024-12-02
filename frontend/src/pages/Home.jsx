import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import PengumumanPublikasi from "../components/Pengumuman";
import PertanyaanUmum from "../components/PertanyaanUmum";
import Location from "../components/Location";

const Home = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <Services />
            <PengumumanPublikasi />
            <PertanyaanUmum />
            <Location />
        </div>
    );
};

export default Home;
