import ProductDetails from "@/components/productDetails/ProductDetails";
import React from "react";

const RedeemDetails = async ({ params }) => {
  const { id } = await params;
  const offerId = Number(id);


  return (
    <div>
      <ProductDetails id={offerId} />
    </div>
  );
};

export default RedeemDetails;