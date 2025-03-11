import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllOrderAsync, myOrder, selectedUserLoginInfo } from "../userSilce";
import Navbar from "../../Navbar/Navbar";

const MyOrder = () => {
  const order = useSelector(myOrder);
  const user = useSelector(selectedUserLoginInfo);
  const dispatch = useDispatch();
  console.log(order)
  order.map((order, i) =>{
    console.log(order.selectedAddresss);
  })
  
  // it will be working on apps because user not stay in longing state
  useEffect(() => {
    dispatch(fetchAllOrderAsync(user.id));
  }, [dispatch, user]);
  return (
    <>
      <Navbar>
        {order.map((order) => (
          <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8  rounded-sm ">
            <div className=" ">
              <h1 className="text-2xl my-5 d tracking-tight text-gray-900">
                My order
              </h1>
              {order?.item?.map((item, index) => (
                <div
                  key={index}
                  className="flow-root border-gray-200 px-4 py-6 sm:px-6"
                >
                  {status === "loading" ? (
                    <Grid
                      height="80"
                      width="80"
                      color="rgb(79, 70, 229) "
                      ariaLabel="grid-loading"
                      radius="12.5"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                  ) : null}
                  <ul className="-my-6 divide-y divide-gray-200">
                    <li className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.images}
                          alt=""
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <div>
                              <h3 className=" text-xl ">{item.title}</h3>
                              <p className="text-gray-500 "> {item.brand}</p>
                            </div>
                            <h3 className="ml-4 text-xl ">$ {item.price}</h3>
                          </div>
                          <p className="mt-1 text-sm text-gray-500"></p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            <label
                              htmlFor="quantity"
                              className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                            >
                              Qty :{item.quantity}
                            </label>
                            <h3 className="font-medium">
                              Order Status :{" "}
                              <span className="text-red-500 font-bold border-none">
                                {order.status}
                              </span>{" "}
                            </h3>
                          </div>

                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              ))}
            </div>

            <div className=" border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                <p className=" text-xl ">Subtotal</p>
                <p className=" text-xl ">$ {order.totalAmount}</p>
              </div>
              <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                <p className=" text-xl ">Total Items in Cart</p>
                <p className=" text-xl ">items : {order.totalItems}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping address :
                <div className="border px-1 mt-2">
                  <li className="flex justify-between gap-x-6 ">
                    <div className="flex min-w-0 justify-between gap-x-12">
                      <div className="min-w-0 flex-auto ">
                        <p className="text-sm/6 font-semibold text-gray-900">
                          Name : {order?.selectedAddress.firstName}{" "}
                          {order.selectedAddress.lastName}
                        </p>
                        <p className="mt-1 truncate text-xs/5 text-gray-500">
                          Email : {order?.selectedAddress.email}
                        </p>
                        <p className="mt-1 truncate text-xs/5 text-gray-500">
                          Phone : {order?.selectedAddress.phone}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="mt-1 truncate text-xs/5 text-gray-500">
                        Country : {order?.selectedAddress.country}
                      </p>
                      <p className="mt-1 truncate text-xs/5 text-gray-500">
                        City : {order?.selectedAddress.city}streetAdress
                      </p>
                      <p className="mt-1 truncate text-xs/5 text-gray-500">
                        StreetAdress : {order?.selectedAddress.streetAdress}
                      </p>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm/6 text-gray-900">
                        {order?.selectedAddress.postCode}
                      </p>
                    </div>
                  </li>
                </div>
              </p>
            </div>
          </div>
        ))}
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or
            <Link to="/">
              <button
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </Link>
          </p>
        </div>
      </Navbar>
    </>
  );
};

export default MyOrder;
