import ProductDetails from "@/components/productDetails/ProductDetails";
import React from "react";

const RedeemDetails = async ({ params }) => {
  const id = Number(params.id); // convert to number
  id;

  return (
    <div>
      <ProductDetails id={id} />
    </div>
  );
};

export default RedeemDetails;
