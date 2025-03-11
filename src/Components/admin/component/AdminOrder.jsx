import {
  EyeSlashIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { selectedOrder, seletedTotalOrder } from "../../Order/orderSlice";

const AdminOrder = () => {
  const orders = useSelector(selectedOrder);
  const totalOrder = useSelector(seletedTotalOrder);

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
              {orders.map((order, index) => (
                <tr key={order.id} className="border-b-8 ">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2 align-middle">
                    {order.item.map((item, index) => (
                      <div className="flex gap-5">
                        <div>
                          <img
                            className="h-14 rounded-full"
                            src={item.images}
                            alt={item.title}
                          />
                        </div>

                        <div>
                          <div> {item.title}</div>
                          <div>Quantity : {item.quantity}</div>
                          <div> Price : {item.price}</div>
                        </div>
                      </div>
                    ))}
                  </td>
                  <td className="px-4 py-2">{order.totalAmount}</td>
                  <td className="px-4 py-2">
                    <div>
                      <span className="font-bold">Name :</span>{" "}
                      {order.selectedAddress.firstName}{" "}
                      {order.selectedAddress.lastName}
                    </div>
                    <div>
                      <span className="font-bold">Email :</span>{" "}
                      {order.selectedAddress.email}
                    </div>
                    <div>
                      {" "}
                      <span className="font-bold">Phone :</span>{" "}
                      {order.selectedAddress.phone}
                    </div>
                    <div>
                      {" "}
                      <span className="font-bold">Country :</span>{" "}
                      {order.selectedAddress.country}
                    </div>
                    <div>
                      <span className="font-bold">Street :</span>{" "}
                      {order.selectedAddress.streetAdress}
                    </div>
                    <div>
                      <span className="font-bold">City :</span>{" "}
                      {order.selectedAddress.city}
                    </div>
                    <div>
                      <span className="font-bold">Post Code :</span>{" "}
                      {order.selectedAddress.postCode}
                    </div>
                  </td>

                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 text-sm font-semibold rounded-md ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-2  justify-center gap-2 align-middle">
                    <div className="justify-center gap-2 align-middle flex">
                      <button className="px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600">
                        <EyeSlashIcon className="h-5 w-5"></EyeSlashIcon>
                      </button>
                      <button className="px-3 py-1 text-sm font-semibold text-white bg-green-500 rounded-md hover:bg-green-600">
                        <PencilIcon className="h-5 w-5"></PencilIcon>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminOrder;
