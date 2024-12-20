import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Ajukan = () => {
  const [formData, setFormData] = useState({
    service: "",
    date: "",
    session: "",
    content: "",
    file: null,
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [code, setCode] = useState("");
  const [validDate, setValidDate] = useState("");

  const serviceCategories = [
    "Penilaian AMDAL", "Penapisan Dokling", "Pemeriksaan UKL-UPL", "Registrasi SPPL", 
    "Penilaian DELH/DPLH", "Amdalnet", "Lain-lain"
  ];
  const sessionCategories = ["Sesi 1", "Sesi 2", "Sesi 3"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateValidation = (e) => {
    const selectedDate = new Date(e.target.value);
    const day = selectedDate.getDay();
    setValidDate(day === 6 || day === 0 ? "" : e.target.value); // Block weekends
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { service, date, session, content, file } = formData;

    const data = new FormData();
    data.append("service", service);
    data.append("date", date);
    data.append("session", session);
    data.append("content", content);

    // Hanya tambahkan file jika ada
    if (file) {
      data.append("file", file);
    }

    try {
      const response = await axios.post("http://localhost:5000/consultations/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResponseMessage(response.data.message);
      setCode(response.data.code);
    } catch {
      setResponseMessage("Terjadi kesalahan, silakan coba lagi.");
    }
  };

  // Array untuk field yang akan di-render
  const formFields = [
    {
      id: "service",
      label: "Pilih Layanan",
      type: "select",
      options: serviceCategories,
    },
    {
      id: "date",
      label: "Tanggal Konsultasi",
      type: "date",
      options: null,
    },
    {
      id: "session",
      label: "Pilih Sesi",
      type: "select",
      options: sessionCategories,
    },
    {
      id: "content",
      label: "Deskripsi Konten",
      type: "textarea",
      options: null,
    },
    {
      id: "file",
      label: "Lampiran (Opsional)",
      type: "file",
      options: null,
    },
  ];

  return (
    <div className="font-poppins">
      <Navbar />
      <Header title="Buat Janji Temu Konsultasi Luring" description="Ajukan Konsultasi Mengenai Persetujuan Lingkungan Secara Luring atau Daring" />

      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Formulir Pengajuan Konsultasi</h1>
        {responseMessage && (
          <div className="mb-4 text-center">
            <p className="text-lg font-medium">{responseMessage}</p>
            {code && <p className="text-blue-600 font-semibold">Kode Anda: {code}</p>}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {formFields.map((field, index) => (
            <div key={index}>
              <label htmlFor={field.id} className="block font-medium text-gray-700">{field.label}</label>
              {field.type === "select" ? (
                <select
                  id={field.id}
                  name={field.id}
                  value={formData[field.id]}
                  onChange={handleInputChange}
                  required
                  className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">-- Pilih {field.label} --</option>
                  {field.options?.map((option, idx) => (
                    <option key={idx} value={option.toLowerCase().replace(/ /g, "-")}>{option}</option>
                  ))}
                </select>
              ) : field.type === "textarea" ? (
                <textarea
                  id={field.id}
                  name={field.id}
                  value={formData[field.id]}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              ) : (
                <input
                  type={field.type}
                  id={field.id}
                  name={field.id}
                  value={field.id === "date" ? validDate || formData.date : formData[field.id]}
                  onChange={handleInputChange}
                  onBlur={field.id === "date" ? handleDateValidation : null}
                  className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              )}
            </div>
          ))}

          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Ajukan Konsultasi
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Ajukan;
