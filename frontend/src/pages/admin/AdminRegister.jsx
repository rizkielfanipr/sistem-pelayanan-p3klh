import RegisterForm from "../../components/RegisterForm"; // Import RegisterForm component

const AdminRegister = () => {
  return (
    <div>
      <RegisterForm 
        apiUrl="http://localhost:5000/auth/register" 
        title="Admin Register"
        redirectTo="/admin-login" 
      />
    </div>
  );
};

export default AdminRegister;
