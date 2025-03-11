import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import ProductDetails from "../Components/productDetails/ProductDetails";

const ProductDetailsPage = () => {
  return (
    <>
      <Navbar>
        <ProductDetails/>
      </Navbar>
    </>
  );
};

export default ProductDetailsPage;
