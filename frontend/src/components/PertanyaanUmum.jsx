import { useState } from 'react';
import PropTypes from 'prop-types';

// Data FAQ
const faqs = [
  {
    question: "Apakah persetujuan teknis bisa paralel dengan persetujuan lingkungan?",
    answer: "Persetujuan teknis disusun dan diselesaikan terlebih dahulu karena menjadi prasyarat pengajuan persetujuan lingkungan."
  },
  {
    question: "Usaha Kegiatan apa saja yang menjadi kewenangan Gubernur dalam memproses persetujuan lingkungan?",
    answer: "Rencana Usaha Kegiatan yang tercantum dalam Pergub DIY Nomor 116 Tahun 2021 dan diperbarui dengan Pergub DIY Nomor 38 Tahun 2022, serta Rencana Usaha Kegiatan lain yang menjadi kewenangan Kabupaten/Kota, dan kewenangan pusat yang telah dilimpahkan kepada Gubernur/DLHK melalui surat resmi pelimpahan atau pelimpahan yang terdaftar di sistem AMDALNet. Untuk informasi lebih lanjut, silakan merujuk langsung ke Pergub tersebut."
  },
  {
    question: "Apakah pemohon, pelaku usaha, pemrakarsa dapat menyusun dokumen lingkungan sendiri?",
    answer: "Pemohon, pelaku usaha, pemrakarsa dapat menyusun dokumen lingkungan UKL UPL sendiri tanpa perlu memiliki sertifikat kompetensi penyusun. Namun, jika dokumen yang disusun adalah AMDAL, maka penyusun harus memiliki sertifikat kompetensi penyusun AMDAL dan minimal terdiri dari tiga orang penyusun yang bersertifikat, yaitu satu ketua dan dua anggota, ditambah tenaga ahli lain sesuai dengan rencana usaha kegiatan."
  }
];

const PertanyaanUmum = () => {
  const [openIndex, setOpenIndex] = useState(null);

  // Toggle FAQ terbuka atau tertutup
  const toggleOpen = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <section className="font-poppins">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-manrope text-center font-bold text-gray-900 leading-[3.25rem] mb-10">
          Pertanyaan Umum
        </h2>

        <div className="accordion-group">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              toggleOpen={toggleOpen}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const AccordionItem = ({ faq, index, isOpen, toggleOpen }) => {
  return (
    <div className={`accordion py-8 px-6 border-b border-solid border-gray-200 transition-all duration-500 rounded-2xl hover:bg-indigo-50 ${isOpen ? 'accordion-active:bg-indigo-50 active' : ''}`}>
      <button
        className={`accordion-toggle group inline-flex items-center justify-between leading-8 text-gray-900 w-full transition duration-500 text-left hover:text-[#03346E] ${isOpen ? 'accordion-active:font-medium accordion-active:text-indigo-600' : ''}`}
        aria-controls={`collapse-${index}`}
        onClick={() => toggleOpen(index)}
      >
        <h5>{faq.question}</h5>
        <svg
          className={`text-gray-500 transition duration-500 group-hover:text-[#03346E] ${isOpen ? 'accordion-active:text-[#03346E] accordion-active:rotate-180' : ''}`}
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {isOpen && (
        <div
          id={`collapse-${index}`}
          className="accordion-content w-full px-0 overflow-hidden"
          aria-labelledby={`heading-${index}`}
          style={{ maxHeight: '250px' }}
        >
          <p className="text-base text-gray-900 leading-6">
            {faq.answer}
          </p>
        </div>
      )}
    </div>
  );
};

// Menambahkan validasi PropTypes
AccordionItem.propTypes = {
  faq: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired
};

export default PertanyaanUmum;
