import { FaComment } from 'react-icons/fa'; 
import Logo from "/logo-dlhk.png";

const Navbar = () => {

  const NavItems = [
    { label: 'Beranda', link: '/' },
    { label: 'Layanan Kami', link: '#layanan' },
    { label: 'Pengumuman', link: '#pengumuman' },
    { label: 'Kontak Kami', link: '#kontak' },
  ];

  const KonsultasiButton = {
    icon: <FaComment className="mr-2" />,
    text: 'Konsultasi',
    bgColor: 'bg-[#002A62]',
    hoverColor: 'hover:bg-[#03346E]',
    textColor: 'text-white',
  };

  return (
    <nav className="bg-white font-poppins text-[#03346E] flex justify-between items-center p-4 fixed w-full top-0 left-0 border-b z-50 border-gray-300">
      <div className="flex items-center space-x-3 ml-16">
        <img src={Logo} alt="Logo" className="w-26 h-16" />
      </div>

      <div className="hidden md:flex space-x-6">
        {NavItems.map((item) => (
          <a key={item.label} href={item.link} className="hover:text-yellow-400 hover:border-b-2 hover:border-yellow-400 pb-1">
            {item.label}
          </a>
        ))}
      </div>

      <div className="flex items-center space-x-3 mr-16 shadow-xl text-sm">
        <button
          className={`flex items-center ${KonsultasiButton.bgColor} ${KonsultasiButton.textColor} py-2 px-4 rounded-lg ${KonsultasiButton.hoverColor}`}
        >
          {KonsultasiButton.icon}
          {KonsultasiButton.text}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
