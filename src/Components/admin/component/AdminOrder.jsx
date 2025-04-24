import {
  EyeSlashIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { adminOrderUpdataAsync, fetchAllOrderByAdminAsync, selectedOrder, seletedTotalOrder } from "../../Order/orderSlice";
import { useEffect, useState } from "react";
import { ITEM_PAR_PAGE } from "../../../app/constant";
import Pagination from "../../pagination/Pagination";

const AdminOrder = () => {
  const orders = useSelector(selectedOrder);
  const dispatch = useDispatch()
  const [edit, setEdit] = useState(false)
  const [page, setPage] = useState(1)

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      case "Delivered":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleStatus = (e, id) => {
    dispatch(adminOrderUpdataAsync({ id, status: e.target.value }))

    setEdit(false)
  }

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEM_PAR_PAGE };
    dispatch(fetchAllOrderByAdminAsync(pagination));
  }, [dispatch, page]);
  const totalItem = orders?.totalItems || 0
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
        <div className="p-4 flex items-center gap-4 bg-white shadow-md rounded-2xl">
          <div className="p-3 bg-gray-200 rounded-full">🛒</div>
          <div>
            <h3 className="text-gray-600 text-sm">Total Orders</h3>
            <p className="text-xl font-semibold">1,234</p>
          </div>
        </div>
        <div className="p-4 flex items-center gap-4 bg-white shadow-md rounded-2xl">
          <div className="p-3 bg-gray-200 rounded-full">👥</div>
          <div>
            <h3 className="text-gray-600 text-sm">Customers</h3>
            <p className="text-xl font-semibold">567</p>
          </div>
        </div>
        <div className="p-4 flex items-center gap-4 bg-white shadow-md rounded-2xl">
          <div className="p-3 bg-gray-200 rounded-full">💰</div>
          <div>
            <h3 className="text-gray-600 text-sm">Revenue</h3>
            <p className="text-xl font-semibold">$12,345</p>
          </div>
        </div>
        <div className="p-4 flex items-center gap-4 bg-white shadow-md rounded-2xl">
          <div className="p-3 bg-gray-200 rounded-full">📦</div>
          <div>
            <h3 className="text-gray-600 text-sm">Products</h3>
            <p className="text-xl font-semibold">89</p>
          </div>
        </div>
      </div>
      <div className="p-6 mt-6 bg-white shadow-md rounded-2xl">
        <h2 className="text-xl font-semibold mb-4">Recent Products</h2>
        <div className="overflow-auto p-4">
          <table className="min-w-full   rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Product</th>
                <th className="px-4 py-2 text-left">Total Price</th>
                <th className="px-4 py-2 text-left">Address</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.data?.map((order, index) => (
                <tr key={order.id} className="border-b-8 ">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2 align-middle">
                    {order.item.map((item, index) => (
                      <div key={index} className="flex gap-5">
                        <div className="bg-gray-100 pr-1 rounded ">
                          <img
                            className="h-14 rounded-full"
                            src={item?.product?.thumbnail}
                            alt={item?.product?.title}
                          />
                        </div>

                        <div>
                          <div> {item?.product?.title}</div>
                          <div>Quantity : {item?.product?.quantity}</div>
                          <div> Price : {item?.product?.price}</div>
                        </div>
                      </div>
                    ))}
                  </td>
                  <td className="px-4 py-2">{order.totalAmount}</td>
                  {order.selectedAddress.map((item, index) => (
                    <td className="px-4 py-2">
                      <div className="text-sm">
                        <span className="font-bold  ">Name :</span>{" "}
                        {item.firstName}{" "}
                        {item.lastName}
                      </div>
                      <div className="text-sm">
                        <span className="font-bold">Email :</span>{" "}
                        {item.email}
                      </div>
                      <div className="text-sm">
                        {" "}
                        <span className="font-bold">Phone :</span>{" "}
                        {item.phone}
                      </div>

                      <div className="text-sm">
                        <span className="font-bold">Street :</span>
                        {item.streetAdress}
                      </div>


                    </td>
                  ))}
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 text-sm font-semibold rounded-md ${getStatusColor(
                        order.status
                      )}`}

                    >
                      {edit ?
                        <select onChange={(e) => handleStatus(e, order.id)} name="" id="" >
                          <option value="Pending">Pending</option>
                          <option value="Canceled">Canceled</option>
                          <option value="Delevired">Delevired</option>
                          <option value="Shiping">Shiping</option>
                        </select> :
                        `${order.status}`}
                    </span>
                  </td>
                  <td className="px-4 py-2  justify-center gap-2 align-middle">
                    <div className="justify-center gap-2 align-middle flex">
                      <button className="px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600">
                        <EyeSlashIcon className="h-5 w-5"></EyeSlashIcon>
                      </button>
                      <button className="px-3 py-1 text-sm font-semibold text-white bg-green-500 rounded-md hover:bg-green-600">
                        <PencilIcon
                          onClick={() => setEdit(true)}
                          className="h-5 w-5"></PencilIcon>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>
        <Pagination
          page={page}
          setPage={setPage}
          totalItem={totalItem}
        />
      </div>
    </>
  );
};

export default AdminOrder;
