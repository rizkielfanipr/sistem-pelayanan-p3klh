import RegisterForm from "../components/RegisterForm"; // Import RegisterForm component

const Register = () => {
  return (
    <div>
      <RegisterForm 
        apiUrl="http://localhost:5000/user/register" 
        title=" Register Akun"
        redirectTo="/login" 
      />
    </div>
  );
};

export default Register;
