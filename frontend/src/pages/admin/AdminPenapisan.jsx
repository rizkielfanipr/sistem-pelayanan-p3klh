import ArticleForm from "../../components/admin/ArticleForm";
import ArticleList from "../../components/admin/ArticleList";

const AdminPenapisan = () => {
  return (
    <div className="flex-1 flex mt-10 p-8 font-poppins">
        <ArticleForm />
        <ArticleList />
      </div>
  );
};

export default AdminPenapisan;
