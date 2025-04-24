import React, { useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import AdminOrder from "../Components/admin/component/AdminOrder";


const AdminOrderPage = () => {
  return (
    <Navbar>
      <AdminOrder />
    </Navbar>
  );
};

export default AdminOrderPage;
