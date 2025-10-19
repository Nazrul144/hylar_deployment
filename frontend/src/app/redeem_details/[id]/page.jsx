import ProductDetails from '@/components/productDetails/ProductDetails'
import React from 'react'

const RedeemDetails = async({params}) => {

  const id = params.id;
  console.log(id)

  return (
    <div>
      <ProductDetails id ={id}/>
    </div>
  )
}

export default RedeemDetails
