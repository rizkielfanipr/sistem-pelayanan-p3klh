import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import FetchServices from "../../components/admin/FetchServices";

const Penapisan = () => {
  const { services, error } = FetchServices({
    endpoint: "http://localhost:5000/service/amdalnet",
  });

  return (
    <div className="font-poppins">
      <Navbar />
      <Header
        title="AMDALNET"
        description="Informasi Tentang AMDALNET"
      />

      <div className="container mx-auto px-4 py-8">
        {/* Display error message */}
        {error && (
          <div className="bg-red-500 text-white p-2 mb-4 rounded">
            {error}
          </div>
        )}

        {/* Articles display */}
        {services.length === 0 ? (
          <p className="text-center text-lg">Tidak ada artikel yang tersedia.</p>
        ) : (
          <div>
            {services.map((service) => (
              <div key={service.id} className="mb-8 border-b pb-6">
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>

                {/* Display image if available */}
                {service.image && (
                  <img
                    src={`http://localhost:5000/${service.image}`}
                    alt={service.title}
                    className="w-full h-auto mt-4 rounded-lg shadow-lg"
                  />
                )}

                {/* Render content as HTML */}
                <div
                  dangerouslySetInnerHTML={{ __html: service.content }}
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
