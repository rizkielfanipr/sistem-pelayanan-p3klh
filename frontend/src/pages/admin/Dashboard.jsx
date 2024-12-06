import Sidebar from "../../components/admin/Sidebar"; // Adjust the path if Sidebar.jsx is located in a different folder

const Dashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Dashboard Content */}
      <div className="flex-1 p-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p>Welcome to the dashboard!</p>

        {/* Your dashboard content goes here */}
      </div>
    </div>
  );
};

export default Dashboard;
