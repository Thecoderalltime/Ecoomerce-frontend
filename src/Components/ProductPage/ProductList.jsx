import { Link } from "react-router-dom";
import { StarIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProductAsync, selectAllProduct } from "./productSlice";
import { useEffect } from "react";



const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProduct);

 useEffect(()=>{
  dispatch(fetchAllProductAsync())
 },[ dispatch])

 

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-5 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
            {products?.map((product) => (
              <Link
                to={`/productdetails/${product?.id}`}
                key={product.id}
                href={product.href}
                className="group"
              >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 border-spacing-60">
                  <img
                    alt={product.title}
                    src={product.thumbnail}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div>
                  <div className="flex align-middle justify-between px-2">
                    <h3 className="mt-2 text-sm text-gray-700 ">
                      {product.title}
                    </h3>
                    <div>
                      <p className="mt-1 text-lg font-medium text-gray-900">
                        $
                        {Math.floor(
                          product.price * (1 - product.discountPercentage / 100)
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
                      ${product.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
