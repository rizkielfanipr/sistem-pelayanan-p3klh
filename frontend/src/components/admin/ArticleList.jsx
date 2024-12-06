import { useState, useEffect } from "react";
import axios from "axios";
import AlertError from "../../components/AlertError";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/service");
        setArticles(response.data);  // Sesuaikan respons data jika perlu
      } catch {
        setError("Terjadi kesalahan saat memuat artikel.");
      }
    };

    fetchArticles();
  }, []);

  // Fungsi untuk memotong konten artikel menjadi 50 kata
  const truncateContent = (content) => {
    const words = content.split(" ");
    return words.length > 15 ? words.slice(0, 15).join(" ") + "..." : content;
  };

  return (
    <div className="w-full max-w-lg bg-white p-4 rounded-lg ml-10">
      <h2 className="text-xl font-bold mb-4 text-center">Daftar Artikel</h2>
      {error && <AlertError message={error} />}
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Judul</th>
            <th className="px-4 py-2 text-left">Konten</th>
            <th className="px-4 py-2 text-left">Gambar</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id}>
              <td className="border px-4 py-2">{article.title}</td>
              <td className="border px-4 py-2">{truncateContent(article.content)}</td>
              <td className="border px-4 py-2">
                {article.image ? (  // Pastikan properti gambar adalah 'image' sesuai dengan data API
                  <img
                    src={`http://localhost:5000/${article.image}`}
                    alt={article.title}
                    className="w-16 h-16 object-cover"
                  />
                ) : (
                  <span>No Image</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArticleList;
