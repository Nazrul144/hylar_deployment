import Image from "next/image";
import React from "react";

const Articles = () => {
  return (
    <div className="lg:w-7xl mx-auto">
      <div className="mt-10 px-4 lg:px-0">
        <h1 className="font-bold text-center text-xl lg:text-5xl text-[#00308F] montserrat-text mb-3">
          Articles that you might find useful
        </h1>
        <h1 className="text-gray-600 text-center common-text mb-8">
          Please refer to the below articles which may help to resolve your
          query
        </h1>
        <div className="lg:flex gap-8">
          <div className="lg:w-[536px] h-[218px] rounded-lg bg-[#00308F] text-white">
            <div className="flex items-center gap-6">
                <div className="mt-14 ml-4">
                    <Image src={'/light.png'}
                    width={40}
                    height={40}
                    alt="Light"
                    />
                </div>
                <div className="mt-6 lg:mt-14">
                    <h1 className=" text-xl lg:text-2xl font-bold mb-2">Having trouble logging in?</h1>
                    <h1 className="lg:mb-4">Refer to the following articles to help tackle <br /> your logging in query</h1>
                    <a className="underline mt-4 text-gray-300" href="#">Relatable articles </a>
                </div>
                
            </div>
          </div>
          <div className="mt-8 px-2">
            <h1 className="text-xl lg:text-3xl font-bold">Who is eligible?</h1>
            <p>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It <br /> has roots in a piece of classical Latin literature from 45 BC,
              making it <br /> over 2000 years old.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;
