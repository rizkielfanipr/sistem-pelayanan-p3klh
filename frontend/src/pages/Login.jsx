import { useState } from "react";
import axios from "axios";
import AlertError from "../components/AlertError";
import AlertSuccess from "../components/AlertSuccess";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);  
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
      const response = await axios.post("http://localhost:5000/api/login", formData);
      setSuccess("Login berhasil!");
      console.log(response.data);
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
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {success && <AlertSuccess message={success} />}
        {error && <AlertError message={error} />}

        {fields.map((field) => (
          <div key={field.name} className="mb-4">
            <label className="block text-sm font-semibold">{field.label}</label>
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

export default Login;
