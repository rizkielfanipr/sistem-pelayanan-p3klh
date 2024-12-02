import { Link } from 'react-router-dom';

const ServiceContent = [
  {
    title: "Penapisan Dokling",
    icon: "/icons/penapisan-dokling.png",
    path: "/penapisan-dokling" 
  },
  {
    title: "Penilaian AMDAL",
    icon: "/icons/penilaian-amdal.png",
    path: "/penilaian-amdal"
  },
  {
    title: "Pemeriksaan UKL UPL",
    icon: "/icons/pemeriksaan-ukl-upl.png",
    path: "/pemeriksaan-ukl-upl"
  },
  {
    title: "Registrasi SPPL",
    icon: "/icons/pendaftaran-sppl.png",
    path: "/registrasi-sppl"
  },
  {
    title: "Penilaian DELH & DPLH",
    icon: "/icons/penilaian-delh.png",
    path: "/penilaian-delh"
  },
  {
    title: "Kirim Dokumen",
    icon: "/icons/pemeriksaan-dplh.png",
    path: "/kirim-dokumen"
  },
  {
    title: "AMDALNET",
    icon: "/icons/amdalnet.png",
    path: "/amdalnet"
  },
  {
    title: "Forum Diskusi",
    icon: "/icons/konsultasi.png",
    path: "/forum-diskusi"
  },
];

const Services = () => {
  return (
    <section className="py-16 font-poppins">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center mb-10">Layanan Kami</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {ServiceContent.map((service, index) => (
            <Link to={service.path} key={index}>
              <div
                className="group cursor-pointer border border-gray-300 rounded-2xl p-6 transition-all duration-300 hover:border-[#03346E] flex flex-col items-center"
              >
                <img
                  src={service.icon}
                  alt={service.title}
                  className="mx-auto mb-4 w-20 h-20 object-contain"
                />
                <h3 className="text-md">{service.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;