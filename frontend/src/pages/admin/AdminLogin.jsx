import LoginForm from "../../components/LoginForm"; // Import RegisterForm component

const AdminLogin = () => {
  return (
    <div>
      <LoginForm 
        apiUrl="http://localhost:5000/auth/login" 
        title="Admin Login"
        redirectTo="/dashboard-admin" 
      />
    </div>
  );
};

export default AdminLogin;
