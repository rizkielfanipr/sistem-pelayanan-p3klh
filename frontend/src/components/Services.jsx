const ServiceContent = [
  {
    title: "Penapisan Dokling",
    icon: "/icons/penapisan-dokling.png",
  },
  {
    title: "Penilaian AMDAL",
    icon: "/icons/penilaian-amdal.png",
  },
  {
    title: "Pemeriksaan UKL UPL",
    icon: "/icons/pemeriksaan-ukl-upl.png",
  },
  {
    title: "Registrasi SPPL",
    icon: "/icons/pendaftaran-sppl.png",
  },
  {
    title: "Penilaian DELH & DPLH",
    icon: "/icons/penilaian-delh.png",
  },
  {
    title: "Kirim Dokumen",
    icon: "/icons/pemeriksaan-dplh.png",
  },
  {
    title: "AMDALNET",
    icon: "/icons/amdalnet.png",
  },
  {
    title: "Forum Diskusi",
    icon: "/icons/konsultasi.png",
  },
];

const Services = () => {
  return (
    <section className="py-16 font-poppins">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center mb-10">Layanan Kami</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {ServiceContent.map((service, index) => (
            <div
              key={index}
              className="group cursor-pointer border border-gray-300 rounded-2xl p-6 transition-all duration-300 hover:border-[#03346E] flex flex-col items-center"
            >
              <img
                src={service.icon}
                alt={service.title}
                className="mx-auto mb-4 w-20 h-20 object-contain"
              />
              <h3 className="text-md">{service.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
