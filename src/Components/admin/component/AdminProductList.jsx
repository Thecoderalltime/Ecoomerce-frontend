import { Link } from "react-router-dom";
import { StarIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectAllProduct,fetchAllProductAsync } from "../../ProductPage/productSlice";

const AdminProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProduct);

  
  useEffect(() => {
    dispatch(fetchAllProductAsync());
   
  }, [dispatch]);

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-5 lg:max-w-7xl lg:px-8">
          <Link to={"/admin/addProduct-form"}>
            <button className="rounded-md bg-green-600 px-3 mb-10  py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
              Add Product
            </button>
          </Link>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
            {products?.data?.map((product) => (
              <div>
                <div>
                  <Link
                    to={`/admin/product-details/${product?.id}`}
                    key={product.id}
                    className=""
                  >
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 border-spacing-60">
                      <img
                        alt={product?.title}
                        src={product?.thumbnail}
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                      />
                    </div>
                    <div>
                      <div className="flex align-middle justify-between px-2">
                        <h3 className="mt-2 text-sm text-gray-700 ">
                          {product?.title}
                        </h3>
                        <div>
                          <p className="mt-1 text-lg font-medium text-gray-900">
                            $
                            {Math.floor(
                              product.price *
                                (1 - product.discountPercentage / 100)
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between px-2 align-middle ">
                        <p className="mt-1.5">
                          <StarIcon className="h-5 w-5 text-slate-600 inline align-top " />
                          <span> {product.rating}</span>
                        </p>

                        <p className="mt-1 text-lg font-medium line-through  text-gray-400">
                          ${product?.price}
                        </p>
                      </div>
                      {product.deleted && (
                        <p className="text-xl text-red-400">Product Deleted</p>
                      )}
                    </div>
                  </Link>
                </div>
                <Link 
                to={`/admin/addProduct-form/${product.id}`}>
                  <button className="rounded-md bg-green-600 px-3 mt-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
                    Edit Product
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProductList;
