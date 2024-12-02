import { useMemo } from "react";
import PropTypes from "prop-types";
import logoDIY from "/logo-diy.png";
import {
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  const socialLinks = useMemo(() => [
    { icon: <FaTwitter className="h-6 w-6" />, href: "https://x.com/dlhkdiy", label: "X DLHK DIY" },
    { icon: <FaInstagram className="h-6 w-6" />, href: "https://www.instagram.com/dlhkdiy/", label: "Instagram DLHK DIY" },
    { icon: <FaFacebook className="h-6 w-6" />, href: "https://www.facebook.com/dlhkdiy/?locale=id_ID", label: "Facebook DLHK DIY" },
    { icon: <FaYoutube className="h-6 w-6" />, href: "https://www.youtube.com/channel/UCOmHmumvYn2Hf7DMEooVvGQ/videos", label: "YouTube DLHK DIY" },
  ], []);

  const contactLinks = useMemo(() => [
    { icon: <FaPhoneAlt className="h-6 w-6" />, href: "tel:+1234567890", label: "(0274) 588 518" },
    { icon: <FaEnvelope className="h-6 w-6" />, href: "mailto:contact@dinaslhkDIY.go.id", label: "dlhk.jogjaprov.go.id" },
  ], []);

  const LinkList = ({ links }) => (
    <div className="flex justify-center gap-6">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-white hover:text-gray-300"
        >
          {link.icon}
          {link.label}
        </a>
      ))}
    </div>
  );

  LinkList.propTypes = {
    links: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.node.isRequired,
        href: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  return (
    <>
      <footer className="bg-gradient-to-r from-[#03346E] to-[#0469A8] text-white py-40 font-poppins rounded-t-3xl">
        <div className="container mx-auto flex flex-col items-center justify-center gap-12">
          <div className="flex items-center justify-start gap-4 -mt-20">
            <img src={logoDIY} alt="Logo DIY" className="h-12 w-12" />
            <div className="text-left">
              <h1 className="text-lg font-semibold">DINAS LINGKUNGAN HIDUP DAN KEHUTANAN</h1>
              <h2 className="text-sm">DAERAH ISTIMEWA YOGYAKARTA</h2>
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Ikuti Kami</h3>
            <LinkList links={socialLinks} />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Kontak Kami</h3>
            <LinkList links={contactLinks} />
          </div>
        </div>
      </footer>
      <div className="bg-[#02234F] text-white text-center py-4">
        <p className="text-md">
          &copy; 2024 Dinas Lingkungan Hidup dan Kehutanan Daerah Istimewa Yogyakarta.
        </p>
      </div>
    </>
  );
};

export default Footer;
