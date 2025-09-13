import React from 'react'

const Works = () => {
  return (
    <div className='lg:w-7xl mx-auto mt-16'>
      <div>
        <h1 className='text-center font-bold text-5xl common-text mb-4'>How It Works</h1>
        <h3 className='text-center text-xl poppins-text'>Submit your business details in minutes, and our team will verify your listing and guide you <br /> through the onboarding process. Once approved, your offer goes live to a responsive, engaged <br /> audience that’s actively looking for businesses just like yours. It’s quick, easy, and entirely <br /> designed to help you grow.</h3>
         <div className='grid lg:grid-cols-3 gap-10 mt-12'>
            {
                cardData?.map((card, index)=>(
                    <div key={card.title} className={`lg:w-[400px] h-[233px] rounded-lg border-l-4 shadow-xl ${index === 1 ? 'border-green-600': "border-[#00308F]"}`}>
                        <h3 className='ml-16 common-text font-bold text-xl inter-text mt-16'>{card.title}</h3>
                        <h3 className='ml-12 px-4 mt-2'>{card.description}</h3>
                    </div>
                ))
            }
      </div>
      </div>
    </div>
  )
}

export default Works


const cardData = [
    {
        title: "1.Register",
        description: "Submit your business and exclusive offer details using our quick form."
    },
    {
        title: "2.Approval",
        description: "Our team verifies your submission and helps get your offer published."
    },
    {
        title: "3.Go Live",
        description: "Reach thousands of members actively looking for businesses like yours."
    }
    
]

