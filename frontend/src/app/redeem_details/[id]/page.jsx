import ProductDetails from "@/components/productDetails/ProductDetails";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import React from "react";

const RedeemDetails = async ({ params }) => {
  const id = Number(params.id);

  console.log(id)


  return (
    <div>
      <ProductDetails id={id} />
    </div>
  );
};

export default RedeemDetails;