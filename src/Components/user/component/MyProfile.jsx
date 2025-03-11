import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoginInfoAsync,
  selectedUserLoginInfo,
  updateUserAsync,
} from "../userSilce";
import { useForm } from "react-hook-form";

const MyProfile = () => {
  const user = useSelector(selectedUserLoginInfo);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [addFormOpen, setAddFormOpen] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleEdit = (index) => {
    setEditFormOpen(true);
    setAddFormOpen(false);
    const address = user.address[index];
    setValue("firstName", address.firstName);
    setValue("lastName", address.lastName);
    setValue("email", address.email);
    setValue("city", address.city);
    setValue("country", address.country);
    setValue("postCode", address.postCode);
    setValue("phone", address.phone);
    setValue("streetAdress", address.streetAdress);
  };

  const handleRemove = (e, index) => {
    const newUser = { ...user, address: [...user.address] };
    newUser.address.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };
  const handleEditFormUpdate = (data, index) => {
    const newUser = { ...user, address: [...user.address] };
    newUser.address.splice(index, 1, data);
    dispatch(updateUserAsync(newUser));
    setEditFormOpen(false);
  };

  const addAddressForm = () => {
    setAddFormOpen(true);
    setEditFormOpen(false);
  };

  const handleAddAdress = (data) => {
    setValue("");
    const newUser = { ...user, address: [...user.address, data] };
    dispatch(updateUserAsync(newUser));
    setAddFormOpen(false);
  };
  return (
    <Navbar>
      <ul role="list" className="px-5">
        <div className="   p-4">
          <h2 className="text-base/7 font-semibold text-gray-900">
            Personal Information
          </h2>
          <h4 className="text-gray-900">Email : {user && user.email}</h4>
          <h5 className="text-gray-900"> role : {user && user.role}</h5>
          <button
            onClick={addAddressForm}
            className="rounded-md bg-green-600 px-3 mt-12 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Addrress
          </button>
          {addFormOpen ? (
            <form action="" className="bg-white">
              <div className="space-y-6">
                <div className="border-b border-gray-900/10 pb-12 p-4">
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
                    onClick={() => setAddFormOpen(false)}
                    type="button"
                    className="text-sm/6 font-semibold text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={handleSubmit((data) => {
                      handleAddAdress(data);
                    })}
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add address
                  </button>
                </div>
              </div>
            </form>
          ) : null}
        </div>
        {user
          ? user.address.map((address, index) => (
              <>
                {editFormOpen ? (
                  <div className="border-b border-gray-900/10 pb-12 p-4">
                    <form action="" className="bg-white">
                      <div className="space-y-6">
                        <div className="border-b border-gray-900/10 pb-12 p-4">
                          <h2 className="text-base/7 font-semibold text-gray-900">
                            Personal Information
                          </h2>
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
                            onClick={() => setEditFormOpen(false)}
                            type="button"
                            className="text-sm/6 font-semibold text-gray-900"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            onClick={handleSubmit((data, index) => {
                              handleEditFormUpdate(data, index);
                            })}
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Add address
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                ) : null}
                <h1 className=" font-semiboldn font-bold text-gray-500 ">
                  Address : {index + 1}
                </h1>
                <div className="flex justify-between border py-0 px-4 mb-4">
                  <li key={index} className="flex justify-between gap-x-6 ">
                    <div className="">
                      <p className="text-gray-600">
                        <span className="font-medium">Name:</span>
                        {address.firstName} {address.lastName}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Email:</span>
                        {address.email}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Phone:</span>
                        {address.phone}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">City:</span>
                        {address.city}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Country:</span>
                        {address.country}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Street Address:</span>
                        {address.streetAddress}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Pincode:</span>
                        {address.postCode}
                      </p>
                    </div>
                  </li>
                  <div className=" flex gap-3">
                    <button
                      onClick={(e) => handleEdit(index, e)}
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                    >
                      Edit
                    </button>

                    <button
                      onClick={(e) => handleRemove(e, index)}
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </>
            ))
          : null}
        {}
      </ul>
    </Navbar>
  );
};

export default MyProfile;
