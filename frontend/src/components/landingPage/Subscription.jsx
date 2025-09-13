import React from 'react'
import { IoCheckmark } from "react-icons/io5";
import { Button } from '../ui/button';

const Subscription = () => {
  return (
    <div className='mt-10 mb-10 max-w-7xl mx-auto'>
      <h1 className='text-center text-4xl inter-text common-text mb-4 font-bold'>Choose Your Membership</h1>
      <p className='text-center text-xl montserrat-text '>Join thousands of members enjoying exclusive deals and perks. Pick <br /> the plan that's right for you.</p>


        {/*Subscription Card*/}
       <div className='lg:flex justify-center items-center gap-8 mt-10'>
        <div className='lg:mt-0 mt-8 lg:ml-0 ml-6'>
            <article className="rounded-sm border border-blue-900 border-b-4 p-4 w-[442px] h-[450px]">
    <h2 className="text-4xl font-bold inter-text common-text text-center mt-10 mb-2">Basic</h2>
    <h1 className='text-3xl inter-text text-center mb-2'>$5.99</h1>
    <h5 className='text-center text-sm montserrat-text '>One-time free</h5>

    <div className='flex justify-center items-center mt-8'>
        <div>
            <div className="flex items-center gap-2">
                <IoCheckmark className='text-green-500 font-bold text-2xl'/>
                <p className='montserrat-text text-sm'>Access to selected discounts</p>
            </div>
            <div className="flex items-center gap-2">
                <IoCheckmark className='text-green-500 font-bold text-2xl'/>
                <p className='montserrat-text text-sm'>Email support</p>
            </div>
            <div className="flex items-center gap-2">
                <IoCheckmark className='text-green-500 font-bold text-2xl'/>
                <p className='montserrat-text text-sm'>Basic verification</p>
            </div>
        </div>
    </div>

    <Button className='w-88 h-12 text-lg text-white inter-text common-bg mt-16 mx-auto block cursor-pointer hover:bg-common-bg hover:scale-105 transition-all duration-300'>
  Get Basic
</Button>

</article>
        </div>
        <div className='lg:mt-0 mt-8 lg:ml-0 ml-6'>
            <article className="rounded-sm border border-blue-900 border-b-4 p-4 w-[442px] h-[450px]">
    <h2 className="text-4xl font-bold inter-text common-text text-center mt-10 mb-2">Premium</h2>
    <h1 className='text-3xl inter-text text-center mb-2'>$5.99</h1>
    <h5 className='text-center text-sm montserrat-text '>One-time free</h5>

    <div className='flex justify-center items-center mt-8'>
        <div>
            <div className="flex items-center gap-2">
                <IoCheckmark className='text-green-500 font-bold text-2xl'/>
                <p className='montserrat-text text-sm'>Unlimited discount access</p>
            </div>
            <div className="flex items-center gap-2">
                <IoCheckmark className='text-green-500 font-bold text-2xl'/>
                <p className='montserrat-text text-sm'>Priority customer support</p>
            </div>
            <div className="flex items-center gap-2">
                <IoCheckmark className='text-green-500 font-bold text-2xl'/>
                <p className='montserrat-text text-sm'>Bonus partner rewards</p>
            </div>
            <div className="flex items-center gap-2">
                <IoCheckmark className='text-green-500 font-bold text-2xl'/>
                <p className='montserrat-text text-sm'>Early access to new deals</p>
            </div>
        </div>
    </div>

    <Button className='w-88 h-12 text-lg text-white inter-text common-bg mt-10 mx-auto block cursor-pointer hover:bg-common-bg hover:scale-105 transition-all duration-300'>
  Get Premium
</Button>

</article>
        </div>
       </div>


    </div>
  )
}

export default Subscription
