import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import AlertError from "../components/AlertError";
import AlertSuccess from "../components/AlertSuccess";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import PropTypes from 'prop-types'; // Import PropTypes

const LoginForm = ({ apiUrl, title, redirectTo }) => { // Added redirectTo prop
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(apiUrl, formData); // Using apiUrl prop
      setSuccess("Login berhasil!");
      console.log(response.data);

      // Redirect to the route passed via props (redirectTo)
      navigate(redirectTo);  // Use the redirectTo prop for navigation
    } catch (err) {
      setError(err.response?.data?.message || "Terjadi kesalahan saat login.");
    }
  };

  const fields = [
    { name: "email", type: "email", placeholder: "Masukkan email", label: "Email" },
    { name: "password", type: passwordVisible ? "text" : "password", placeholder: "Masukkan password", label: "Password" },
  ];

  return (
    <div className="min-h-screen font-poppins flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2> {/* Using the title prop */}

        {success && <AlertSuccess message={success} />}
        {error && <AlertError message={error} />}

        {fields.map((field) => (
          <div key={field.name} className="mb-4">
            <label className="block text-sm">{field.label}</label>
            <div className="relative">
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded"
                placeholder={field.placeholder}
              />
              {field.name === "password" && (
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {passwordVisible ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                </button>
              )}
            </div>
          </div>
        ))}

        <button type="submit" className="w-full bg-[#002A62] text-white py-2 rounded hover:bg-blue-800">
          Login
        </button>
      </form>
    </div>
  );
};

// Define PropTypes for the component
LoginForm.propTypes = {
  apiUrl: PropTypes.string.isRequired,  // Validate apiUrl as a required string
  title: PropTypes.string.isRequired,   // Validate title as a required string
  redirectTo: PropTypes.string.isRequired, // Validate redirectTo as a required string
};

export default LoginForm; // Renamed export
