import LoginForm from "../components/LoginForm"; // Import RegisterForm component

const Login = () => {
  return (
    <div>
      <LoginForm 
        apiUrl="http://localhost:5000/user/login" 
        title=" Login Akun"
        redirectTo="/konsultasi" 
      />
    </div>
  );
};

export default Login;
