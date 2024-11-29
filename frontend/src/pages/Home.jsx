import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import PengumumanPublikasi from "../components/Pengumuman";

const Home = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <Services />
            <PengumumanPublikasi />
        </div>
    );
};

export default Home;