import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const Penapisan = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");

  // Function to fetch articles from backend
  const fetchArticles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/service/penapisan-dokling");
      setArticles(response.data);
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError("Terjadi kesalahan saat memuat artikel.");
    }
  };

  useEffect(() => {
    fetchArticles(); // Fetch articles when component mounts
  }, []);

  return (
    <div>
      <Navbar />
      <Header
        title="Penapisan Dokling"
        description="Informasi Tentang Penapisan Dokling Melalui DLHK dan AMDALNET"
      />

      <div className="container mx-auto px-4 py-8">
        {/* Display error message */}
        {error && (
          <div className="bg-red-500 text-white p-2 mb-4 rounded">
            {error}
          </div>
        )}

        {/* Articles display */}
        {articles.length === 0 ? (
          <p className="text-center text-lg">Tidak ada artikel yang tersedia.</p>
        ) : (
          <div>
            {articles.map((article) => (
              <div key={article.id} className="mb-8 border-b pb-6">
                <h3 className="text-2xl font-bold mb-4">{article.title}</h3>

                {/* Display image if available */}
                {article.image && (
                  <img
                    src={`http://localhost:5000/${article.image}`}
                    alt={article.title}
                    className="w-full h-auto mt-4 rounded-lg shadow-lg"
                  />
                )}

                {/* Render content as HTML */}
                <div
                  dangerouslySetInnerHTML={{ __html: article.content }}
                  className="prose mt-4"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Penapisan;
