import React, { useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import AdminOrder from "../Components/admin/component/AdminOrder";
import { useDispatch } from "react-redux";
import {
  fetchAllOrderAsync
  
} from "../Components/Order/orderSlice";
import { useEffect } from "react";
import { ITEM_PAR_PAGE } from "../app/constant";

const AdminOrderPage = () => {
 
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEM_PAR_PAGE };
    dispatch(fetchAllOrderAsync(pagination));
  }, [dispatch,page]);
  return (
    <Navbar>
      <AdminOrder />
    </Navbar>
  );
};

export default AdminOrderPage;
