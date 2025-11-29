import ProductDetails from "@/components/productDetails/ProductDetails";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import React from "react";

const RedeemDetails = async ({ params }) => {
  const id = Number(params.id);

  // Check if user is authenticated (check for token in cookies)
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token");

  // If no token, redirect to login
  if (!accessToken) {
    redirect("/login");
  }

  return (
    <div>
      <ProductDetails id={id} />
    </div>
  );
};

export default RedeemDetails;