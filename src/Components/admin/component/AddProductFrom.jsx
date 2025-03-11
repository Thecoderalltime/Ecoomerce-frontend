import React, { useEffect } from "react";
import Navbar from "../../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductAsync,
  selectBrands,
  selectCetegoris,
  getProductByIdAsync,
  selectProduct,
  updateProductByIdAsync,
  clearSelectProduct,
} from "../../ProductPage/productSlice";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";

const AddProductFrom = () => {
  const products = useSelector(selectProduct);
  const categorise = useSelector(selectCetegoris);
  const brands = useSelector(selectBrands);
  const dispatch = useDispatch();
  const param = useParams();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const product = { ...data };
    product.price = +product.price;
    product.discountPercentage = +product.discountPercentage;
    product.stock = +product.stock;

    if (param.id) {
      product.id = param.id;
      dispatch(updateProductByIdAsync(product));
      reset();
      
    } else {
      dispatch(createProductAsync(product));
      reset();
    }
  };

   const handleDelete=( )=>{
    const product= {...products}
    product.deleted= true;
    dispatch(updateProductByIdAsync(product))
   }
  useEffect(() => {
    if (param.id) {
      dispatch(getProductByIdAsync(param.id));
    }
  }, [param.id, dispatch]);

  useEffect(() => {
    if (products && param.id) {
      setValue("title", products.title);
      setValue("description", products.description);
      setValue("category", products.category);
      setValue("brand", products.brand);
      setValue("stock", products.stock);
      setValue("price", products.price);
      setValue("discountPercentage", products.discountPercentage);
      setValue("images", products.images);
      setValue("thumbnail", products.thumbnail);
    } else {
      dispatch(clearSelectProduct());
    }
  }, [products, setValue, categorise, brands]);

  return (
    <Navbar>
      <div className="mx-auto mt-12 bg-white max-w-5xl px-4 sm:px-6 lg:px-8  rounded-sm ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-12">
            <div className=" border-gray-900/10 ">
              <h2 className="text-base/7 font-semibold text-gray-900">
                Add Product
              </h2>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="title"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Product title :
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center rounded-md bg-white border border-gray-500 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                      <input
                        {...register("title", {
                          required: "Product Title is required",
                        })}
                        type="text"
                        name="title"
                        id="title"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        placeholder="Product title"
                      />
                    </div>
                    <span className="text-red-500">
                      {errors.title?.message}
                    </span>
                  </div>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="description"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Product Descriptions :
                  </label>
                  <div className="mt-2">
                    <textarea
                      {...register("description", {
                        required: " Product description  is required",
                      })}
                      name="description"
                      id="description"
                      rows={3}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      defaultValue={""}
                    />
                  </div>
                  <span className="text-red-500">
                    {errors.description?.message}
                  </span>
                </div>
              </div>
            </div>
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-1">
                  <label
                    htmlFor="category"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Cetegory :
                  </label>
                  <div className="mt-2">
                    <select
                      {...register("category", {
                        required: "set cetegory",
                        validate: (value, formValues) => {
                          value == formValues.category || `set cetegory`;
                        },
                      })}
                      id="category"
                      name="category"
                      autoComplete="country-name"
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                      <option value="">--Choose Cetegory--</option>
                      {categorise.map((category, index) => (
                        <option key={index} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                    <span className="  text-red-600 ">
                      {errors.category?.message}{" "}
                    </span>
                  </div>
                </div>
                <div className="sm:col-span-1">
                  <label
                    htmlFor="brand"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Brands :
                  </label>
                  <div className="mt-2">
                    <select
                      {...register("brand", {
                        required: "set brands",
                        validate: (value, formValues) => {
                          value == formValues.brands || `set cetegory`;
                        },
                      })}
                      name="brand"
                      id="brand"
                      className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                      <option value="">--Choose brand--</option>
                      {brands.map((brand) => (
                        <option key={brand.value} value={brand.value}>
                          {brand.label}
                        </option>
                      ))}
                    </select>
                    <span className="text-red-500">
                      {errors.brand?.message}
                    </span>
                  </div>
                </div>
                {/* <div className="sm:col-span-1">
                  <label
                    htmlFor="tags"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Tags :
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("tag", {
                        required: "set tag",
                      })}
                      type="text"
                      name="price"
                      id="price"
                      autoComplete="address-level2"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                  <span className="text-red-500">{errors.tag?.message} </span>
                </div> */}
                <div className="sm:col-span-1">
                  <label
                    htmlFor="last-name"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Stock :
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("stock", {
                        required: "stock is required",
                      })}
                      type="number"
                      name="stock"
                      id="stock"
                      autoComplete="address-level2"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                  <span className="text-red-500">{errors.stock?.message} </span>
                </div>
                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="price"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Price :
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("price", {
                        required: "price is required",
                      })}
                      type="number"
                      name="price"
                      id="price"
                      autoComplete="address-level2"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                  <span className="text-red-500">{errors.price?.message} </span>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Discount Price :
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("discountPercentage", {
                        required: "discount_price is required",
                      })}
                      type="number"
                      name="discountPercentage"
                      id="discountPercentage"
                      autoComplete="discountPercentage"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                  <span className="text-red-500">
                    {errors.discountPercentage?.message}{" "}
                  </span>
                </div>
                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="city"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Product image :
                  </label>
                  <div className="mt-2">
                    <input
                      discount_price
                      {...register("images", {
                        required: "images is required",
                      })}
                      type="text"
                      name="images"
                      id="images"
                      autoComplete="address-level2"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                  <span className="text-red-500">
                    {errors.images?.message}{" "}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="thumbnail"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    thumbnail :
                  </label>
                  <div className="mt-2">
                    <input
                      productImage
                      {...register("thumbnail", {
                        required: "thumbnail is required",
                      })}
                      type="text"
                      name="thumbnail"
                      id="thumbnail"
                      autoComplete="thumbnail"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                  <span className="text-red-500">
                    {errors.thumbnail?.message}{" "}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    thumbnail-2 :
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("thumbnail_2", {
                        required: "thumbnail_2 is required",
                      })}
                      type="text"
                      name="thumbnail_2"
                      id="thumbnail_2"
                      autoComplete="thumbnail"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                  <span className="text-red-500">
                    {errors.thumbnail_2?.message}{" "}
                  </span>
                </div>{" "}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    thumbnail-3 :
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("thumbnail_3", {
                        required: "thumbnail_3 is required",
                      })}
                      type="text"
                      name="thumbnail_3"
                      id="thumbnail_3"
                      autoComplete="thumbnail"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                  <span className="text-red-500">
                    {errors.thumbnail_3?.message}{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Link to={"/admin"}>
              <button
                type="button"
                className="text-sm/6 font-semibold text-gray-900"
              >
                Cancel
              </button>
            </Link>
            {param.id && (
              <button
                onClick={handleDelete}
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-red:outline-indigo-600"
              >
                Delete Product
              </button>
            )}

            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </Navbar>
  );
};

export default AddProductFrom;
