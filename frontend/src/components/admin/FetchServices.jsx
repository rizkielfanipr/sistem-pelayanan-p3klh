import { useState, useEffect } from "react";
import axios from "axios";

const FetchServices = ({ endpoint }) => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(endpoint);
        setServices(response.data);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Terjadi kesalahan saat memuat artikel.");
      }
    };

    fetchData();
  }, [endpoint]);

  return { services, error };
};

export default FetchServices;
