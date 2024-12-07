import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa"; // React Icon untuk edit
import AlertError from "../../components/AlertError";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/service");
        setArticles(response.data);
      } catch {
        setError("Terjadi kesalahan saat memuat artikel.");
      }
    };

    fetchArticles();
  }, []);

  const truncateContent = (content) => {
    const words = content.split(" ");
    return words.length > 15 ? words.slice(0, 15).join(" ") + "..." : content;
  };

  const removeHtmlTags = (htmlContent) => {
    const doc = new DOMParser().parseFromString(htmlContent, "text/html");
    return doc.body.textContent || "";
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  const handleUpdateClick = (category, id) => {
    navigate(`/update-service/${category}/${id}`);
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
            <th className="px-4 py-2 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id}>
              <td
                className="border px-4 py-2 cursor-pointer"
                onClick={() => handleArticleClick(article)}
              >
                {article.title}
              </td>
              <td className="border px-4 py-2">
                {truncateContent(removeHtmlTags(article.content))}
              </td>
              <td className="border px-4 py-2">
                {article.image ? (
                  <img
                    src={`http://localhost:5000/${article.image}`}
                    alt={article.title}
                    className="w-16 h-16 object-cover"
                  />
                ) : (
                  <span>No Image</span>
                )}
              </td>
              <td className="border px-4 py-2 text-center">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleUpdateClick(article.category, article.id)}
                >
                  <FaEdit size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedArticle && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-semibold">{selectedArticle.title}</h3>
          <div className="mt-4">
            <p>{removeHtmlTags(selectedArticle.content)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleList;
