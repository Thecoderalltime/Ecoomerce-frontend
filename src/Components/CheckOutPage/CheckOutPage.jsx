import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  deleteItemFormCartAsync,
  updateCartItemByCartIdAsync,
} from "../Cart/CartSlice";
import { useEffect, useState } from "react";
import { sleletedUser, updateUserAsync } from "../auth/authSlice";
import { createOrderAsync } from "../Order/orderSlice";
const CheckOutPage = () => {
  const item = useSelector((state) => state.cart.items);
  const user = useSelector(sleletedUser);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [payment, setPayment] = useState("cash");
  const currentOrder = useSelector((state) => state.order.currentOrder);

  
  const totalAmount = item.reduce(
    (amount, item) => item.product.price * item.quantity + amount,
    0
  );
  const totalItems = item.reduce((total, item) => item.quantity + total, 0);

  const dispath = useDispatch();

  const handleQuantity = (e, item) => {
    dispath(
      updateCartItemByCartIdAsync({id:item.id, quantity: +e.target.value })
    );
  };

  const heldeDeleteItem = (e, id) => {
    dispath(deleteItemFormCartAsync(id));
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const handleCheckOut = (data) => {
    const userDetails = { ...user, address: [...user.address, data] };
    dispath(updateUserAsync(userDetails));
    reset();
  };

  const handleAdress = (index) => {
    setSelectedAddress(user.address[index]);
  };
  const handlePayment = (e) => {
    setPayment(e.target.value);
  };

  const handleOrder = (e) => {
    if (selectedAddress && payment) {
      const order = {
       user:user.id,
        item,
        totalAmount,
        totalItems,
        selectedAddress,
        payment,
        status: "pending",
      };
      
      dispath(createOrderAsync(order));
    } else {
      alert("Please fill the address and select payment method");
    }
  };


  const navigate = useNavigate();

  useEffect(() => {
    if (item && Array.isArray(item) && item.length === 0) {
      navigate("/", { replace: true });
    }
  }, [item, navigate]);

  
  return (
    <>
      {currentOrder && (
        <Navigate
          to={`/order-success/${currentOrder.id}`}
          replace={true}
        ></Navigate>
      )}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
          <div className="lg:grid-span-3 mt-12  ">
            <form action="" className="bg-white">
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12 p-4">
                  <h2 className="text-base/7 font-semibold text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm/6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        First name
                      </label>
                      <div className="mt-2">
                        <input
                          id="first-name"
                          {...register("firstName", {
                            required: "First name is required !",
                          })}
                          type="text"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                      </div>
                      <span className="  text-red-600 ">
                        {errors.firstName?.message}
                      </span>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Last name
                      </label>
                      <div className="mt-2">
                        <input
                          id="last-name"
                          {...register("lastName", {
                            required: "last name is required !",
                          })}
                          type="text"
                          autoComplete="family-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                      </div>
                      <span className="  text-red-600 ">
                        {errors.lastName?.message}
                      </span>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="email"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register("email", {
                            required: "email is required !",
                          })}
                          type="email"
                          autoComplete="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                      </div>
                      <span className="  text-red-600 ">
                        {errors.email?.message}
                      </span>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="email"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Phone number
                      </label>
                      <div className="mt-2">
                        <input
                          id="tel"
                          {...register("phone", {
                            required: "Phone  number is required !",
                          })}
                          type="tel"
                          autoComplete="tel"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                      </div>
                      <span className="  text-red-600 ">
                        {errors.email?.message}
                      </span>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Country
                      </label>
                      <div className="mt-2">
                        <select
                          id="country"
                          {...register("country", {
                            required: "country is required !",
                          })}
                          autoComplete="country-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6"
                        >
                          <option>United States</option>
                          <option>Canada</option>
                          <option>Mexico</option>
                        </select>
                      </div>
                      <span className="  text-red-600 ">
                        {errors.country?.message}
                      </span>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street-address"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          id="street-address"
                          {...register("streetAdress", {
                            required: "street address is required !",
                          })}
                          type="text"
                          autoComplete="street-address"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                      </div>
                      <span className="  text-red-600 ">
                        {errors.streetAdress?.message}
                      </span>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          id="city"
                          {...register("city", {
                            required: "city is required !",
                          })}
                          type="text"
                          autoComplete="address-level2"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                      </div>
                      <span className="  text-red-600 ">
                        {errors.city?.message}
                      </span>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="postal-code"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          id="postal-code"
                          {...register("postCode", {
                            required: "Post code is required !",
                          })}
                          type="text"
                          autoComplete="postal-code"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                      </div>
                      <span className="  text-red-600 ">
                        {errors?.postCode?.message}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6 px-4">
                  <button
                    type="button"
                    className="text-sm/6 font-semibold text-gray-900"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    onClick={handleSubmit(handleCheckOut)}
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add address
                  </button>
                </div>

                <div className="border-b border-gray-900/10 pb-12 p-4">
                  <h2 className="text-base/7 font-semibold text-gray-900">
                    Address
                  </h2>
                  <p className="mt-1 text-sm/6 text-gray-600">
                    Chose from existinng address
                  </p>

                  <ul
                    role="list"
                    className="divide-y divide-gray-100 border px-5"
                  >
                    {user
                      ? user?.address.map((address, index) => (
                        <li
                          key={index}
                          className="flex justify-between gap-x-6 py-5"
                        >
                          <div className="flex min-w-0 gap-x-4">
                            <input
                              name="address"
                              type="radio"
                              value={index}
                              onChange={() => handleAdress(index)}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <div className="min-w-0 flex-auto ">
                              <p className="text-sm/6 font-semibold text-gray-900">
                                {address.firstName}
                              </p>
                              <p className="mt-1 truncate text-xs/5 text-gray-500">
                                {address.email}
                              </p>
                              <p className="mt-1 truncate text-xs/5 text-gray-500">
                                {address.phone}
                              </p>
                            </div>
                          </div>
                          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm/6 text-gray-900">
                              {address.postCode}
                            </p>
                            {address.phone ? (
                              <p className="mt-1 text-xs/5 text-gray-500">
                                Last seen{" "}
                                <time dateTime={address?.lastSeenDateTime}>
                                  {address?.lastSeen}
                                </time>
                              </p>
                            ) : (
                              <div className="mt-1 flex items-center gap-x-1.5">
                                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                </div>
                                <p className="text-xs/5 text-gray-500">
                                  Online
                                </p>
                              </div>
                            )}
                          </div>
                        </li>
                      ))
                      : null}
                    { }
                  </ul>

                  <div className="mt-10 space-y-10">
                    <fieldset>
                      <legend className="text-sm/6 font-semibold text-gray-900">
                        Payment methods
                      </legend>
                      <p className="mt-1 text-sm/6 text-gray-600">Chose One</p>
                      <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                          <input
                            id="cash"
                            name="payment"
                            type="radio"
                            onChange={handlePayment}
                            value={"cash"}
                            checked={payment === "cash"}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="push-everything"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Cash
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            id="card"
                            name="payment"
                            type="radio"
                            onChange={handlePayment}
                            checked={payment === "card"}
                            value={"card"}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="payment"
                            className="block text-sm/6 font-medium text-gray-900"
                          >
                            Card Payments
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="lg:grid-span-2">
            <div>
              <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8  rounded-sm ">
                <div className=" border-gray-200 px-2 py-2 sm:px-2">
                  {item.map((item, index) => (
                    <div
                      key={item.id}
                      className="flow-root border-gray-200 px-2 py-2 sm:px-2"
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
                              src={item.product.thumbnail}
                              alt=""
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <div>
                                  <h3 className=" text-lg ">{item.product.title}</h3>
                                  <p className=""> Brand : <span className="text-sm text-gray-600">{item.product.brand}</span></p>

                                </div>
                                <h3 className="ml-4 text-xl ">
                                  $ {item.product.price}
                                </h3>
                              </div>
                              <p className=""> Category : <span className="text-sm text-gray-600">{item.product.category}</span></p>

                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="text-gray-500">
                                <label
                                  htmlFor="quantity"
                                  className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                                >
                                  Qty
                                </label>
                                <select
                                  onChange={(e) => handleQuantity(e, item)}
                                  value={item.quantity}
                                >
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                </select>
                              </div>

                              <div className="flex">
                                <button
                                  onClick={(e) => heldeDeleteItem(e, item.id)}
                                  type="button"
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                    <p className=" text-lg ">Subtotal</p>
                    <p className=" text-xl ">$ {totalAmount}</p>
                  </div>
                  <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                    <p className=" text-lg ">Total Items in Cart</p>
                    <p className=" text-lg ">items : {totalItems}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <div
                      onClick={handleOrder}
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700
                        cursor-pointer
                      "
                    >
                      Order now
                    </div>
                  </div>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOutPage;
