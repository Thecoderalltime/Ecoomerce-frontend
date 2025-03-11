import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { resetCartAsync } from "../Cart/CartSlice";
import { resetOrder } from "./orderSlice";

const OrderSuccessPage = () => {
  const param = useParams();
  const user = useSelector((state) => state.auth.userLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    // clear cart after order completed 
    dispatch(resetCartAsync(user.id));
    // reset order after completed 
    dispatch(resetOrder())

  }, [dispatch, user]);

  return (
    <>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">
            {" "}
            Your Order SuccessFully Placed !
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
            Order Number #{param.id}
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            You can check your order in My Account. #My Order
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
            <Link to="/" className="text-sm font-semibold text-gray-900">
              Contact support <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default OrderSuccessPage;
