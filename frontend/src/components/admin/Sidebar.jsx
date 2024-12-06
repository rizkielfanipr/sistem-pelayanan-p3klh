import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaFilter, FaClipboardCheck, FaTools, FaRegEdit, FaRegCheckCircle, FaGlobe } from "react-icons/fa"; // Import React Icons

const Sidebar = () => {
  // State to manage the active dropdowns
  const [dropdownOpen, setDropdownOpen] = useState({
    layanan: false, // State to track if the "Layanan" dropdown is open
  });

  // Function to toggle dropdown visibility
  const toggleDropdown = (menu) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  // Menu items
  const menuItems = [
    {
      label: "Layanan Penapisan Dokling",
      icon: <FaFilter />,
    },
    {
      label: "Penilaian AMDAL",
      icon: <FaClipboardCheck />,
    },
    {
      label: "Pemeriksaan UKL UPL",
      icon: <FaTools />,
    },
    {
      label: "Registrasi SPPL",
      icon: <FaRegEdit />,
    },
    {
      label: "Penilaian DELH & DPLH",
      icon: <FaRegCheckCircle />,
    },
    {
      label: "AMDALNET",
      icon: <FaGlobe />,
    },
  ];

  return (
    <div className="w-64 h-screen bg-[#002A62] text-white p-4 rounded-r-3xl fixed top-0 left-0 z-50">
      <h2 className="text-2xl font-bold mb-6 text-center">Sidebar</h2>

      <ul className="space-y-4">
        {/* Layanan Menu with Dropdown */}
        <li className="relative">
          <button
            onClick={() => toggleDropdown("layanan")}
            className="flex items-center w-full text-left px-4 py-2 hover:bg-[#03346E] rounded"
          >
            Layanan
            {dropdownOpen.layanan ? (
              <FaChevronUp className="ml-2" />
            ) : (
              <FaChevronDown className="ml-2" />
            )}
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen.layanan && (
            <ul className="space-y-2 pl-8 mt-2 bg-[#03346E] rounded">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 hover:bg-[#001B42] rounded"
                  >
                    {item.icon} {/* Icon */}
                    {item.label} {/* Text */}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>

        {/* Other Menu Items */}
        <li>
          <a href="#" className="block px-4 py-2 hover:bg-[#03346E] rounded">
            Menu Item 1
          </a>
        </li>
        <li>
          <a href="#" className="block px-4 py-2 hover:bg-[#03346E] rounded">
            Menu Item 2
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
