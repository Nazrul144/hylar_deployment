import ProductDetails from '@/components/productDetails/ProductDetails'
import React from 'react'

const RedeemDetails = async({params}) => {

  const id = params.id;
  console.log(id)

  return (
    <div>
      <h1>Page Details:{id}</h1>
      <ProductDetails id ={id}/>
    </div>
  )
}

export default RedeemDetails
