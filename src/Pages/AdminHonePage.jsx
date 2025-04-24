import Navbar from "../Components/Navbar/Navbar";
import AdminCetegoryPage from "../Components/admin/component/AdminCetegoryPage";
import Footer from "../Components/footer/Footer";

const AdminHonePage = () => {
  console.log("AdminHonePage");
  return (
    <Navbar>
      <AdminCetegoryPage />
      <Footer/>
    </Navbar>
  );
};

export default AdminHonePage;
