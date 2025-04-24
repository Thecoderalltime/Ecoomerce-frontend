import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  deleteItemFormCartAsync,
  updateCartItemByCartIdAsync,
} from "./CartSlice";
import { useEffect } from "react";

const CartPage = () => {
  const item = useSelector((state) => state.cart.items);
  const dispath = useDispatch();
  const navigate = useNavigate();

  const totalAmount = item.reduce(
    (amount, item) => item.product?.price * item.quantity + amount,
    0
  );
  const totalItems = item.reduce((total, item) => item.quantity + total, 0);

  const handleQulentity = (e, item) => {
    dispath(
      updateCartItemByCartIdAsync({ id: item.id, quantity: +e.target.value })
    );
  };

  const heldeDeleteItem = (e, id) => {
    dispath(deleteItemFormCartAsync(id));
  };

  useEffect(() => {
    if (item && Array.isArray(item) && item.length === 0) {
      navigate("/", { replace: true });
    }
  }, [item, navigate]);
  return (
    <>
      {!item.length === 0 && <Navigate to={"/"} replace={true}></Navigate>}
      <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8  rounded-sm ">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
            Cart
          </h1>
          {item?.map((item, index) => (
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
                      src={item.product?.thumbnail}
                      alt=""
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <div>
                          <h3 className=" text-xl ">{item.product?.title}</h3>

                          <p className=""> Brand : <span className="text-sm text-gray-600">{item.product?.brand}</span></p>
                        </div>
                        <h3 className="ml-4 text-xl ">$ {item.product?.price}</h3>
                      </div>
                      <p className=""> Category : <span className="text-sm text-gray-600">{item.product?.category}</span></p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500 ">
                        <label
                          htmlFor="quantity"
                          className="inline mr-5 text-sm leading-6 text-gray-900"
                        >
                          Qty
                        </label>
                        <select className="border mt-2"
                          onChange={(e) => handleQulentity(e, item)}
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
            <p className=" text-xl ">Subtotal</p>
            <p className=" text-xl ">$ {totalAmount}</p>
          </div>
          <div className="flex justify-between my-2 text-base font-medium text-gray-900">
            <p className=" text-xl ">Total Items in Cart</p>
            <p className=" text-xl ">items : {totalItems}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
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
    </>
  );
};

export default CartPage;
