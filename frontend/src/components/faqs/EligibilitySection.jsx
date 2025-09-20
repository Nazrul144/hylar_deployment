"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";

const EligibilitySection = () => {
  const [showMoreText, setShowMoreText] = useState(false);

  return (
    <div className="mt-20">
      <section className="lg:w-7xl mx-auto">
        {/*Card-1*/}
        <div className="flex items-center gap-6">
          {/* Number Box */}
          <div className="lg:w-36 lg:h-36 bg-blue-900 flex items-center justify-center">
            <span className="text-green-500 text-6xl p-3 lg:text-8xl font-extrabold">
              01
            </span>
          </div>

          {/* Content */}
          <div className="max-w-xl">
            <h2 className="text-3xl  font-bold">Who is eligible?</h2>
            <p className="text-sm text-gray-600 mt-2">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old.
              {showMoreText && (
                <>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. At,
                  impedit aperiam. Provident assumenda aspernatur similique,
                  odit aliquam temporibus consectetur modi ipsa ipsam dolore
                  quae neque quas perferendis perspiciatis. Dolore totam facilis
                  a vero fugit sed nesciunt, aperiam reiciendis nemo tempora!
                </>
              )}
            </p>
            <Button
              onClick={() => setShowMoreText(!showMoreText)}
              className="mt-4 px-4 py-2 bg-green-500 text-white font-medium rounded cursor-pointer 
  transition-all duration-300 ease-in-out transform hover:bg-green-600 hover:scale-105 shadow-md hover:shadow-lg"
            >
              Read More
            </Button>
          </div>
        </div>
        {/*Card-2*/}
        <div className="flex items-center gap-6 mt-16 lg:ml-96">
          {/* Number Box */}
          <div className="lg:w-36 lg:h-36 bg-blue-900 flex items-center justify-center">
            <span className="text-green-500 text-6xl p-3 lg:text-8xl font-extrabold">
              02
            </span>
          </div>

          {/* Content */}
          <div className="max-w-xl">
            <h2 className="text-3xl  font-bold">Who is eligible?</h2>
            <p className="text-sm text-gray-600 mt-2">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old.
              {showMoreText && (
                <>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. At,
                  impedit aperiam. Provident assumenda aspernatur similique,
                  odit aliquam temporibus consectetur modi ipsa ipsam dolore
                  quae neque quas perferendis perspiciatis. Dolore totam facilis
                  a vero fugit sed nesciunt, aperiam reiciendis nemo tempora!
                </>
              )}
            </p>
            <Button
              onClick={() => setShowMoreText(!showMoreText)}
              className="mt-4 px-4 py-2 bg-green-500 text-white font-medium rounded cursor-pointer 
  transition-all duration-300 ease-in-out transform hover:bg-green-600 hover:scale-105 shadow-md hover:shadow-lg"
            >
              Read More
            </Button>
          </div>
        </div>
        {/*Card-3*/}
        <div className="flex items-center gap-6 mt-16">
          {/* Number Box */}
          <div className="lg:w-36 lg:h-36 bg-blue-900 flex items-center justify-center">
            <span className="text-green-500 text-6xl p-3 lg:text-8xl font-extrabold">
              01
            </span>
          </div>

          {/* Content */}
          <div className="max-w-xl">
            <h2 className="text-3xl  font-bold">Who is eligible?</h2>
            <p className="text-sm text-gray-600 mt-2">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old.
              {showMoreText && (
                <>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. At,
                  impedit aperiam. Provident assumenda aspernatur similique,
                  odit aliquam temporibus consectetur modi ipsa ipsam dolore
                  quae neque quas perferendis perspiciatis. Dolore totam facilis
                  a vero fugit sed nesciunt, aperiam reiciendis nemo tempora!
                </>
              )}
            </p>
            <Button
              onClick={() => setShowMoreText(!showMoreText)}
              className="mt-4 px-4 py-2 bg-green-500 text-white font-medium rounded cursor-pointer 
  transition-all duration-300 ease-in-out transform hover:bg-green-600 hover:scale-105 shadow-md hover:shadow-lg"
            >
              Read More
            </Button>
          </div>
        </div>
        {/*Card-4*/}
        <div className="flex items-center gap-6 mt-16 lg:ml-96">
          {/* Number Box */}
          <div className="lg:w-36 lg:h-36 bg-blue-900 flex items-center justify-center">
            <span className="text-green-500 text-6xl p-3 lg:text-8xl font-extrabold">
              02
            </span>
          </div>

          {/* Content */}
          <div className="max-w-xl">
            <h2 className="text-3xl  font-bold">Who is eligible?</h2>
            <p className="text-sm text-gray-600 mt-2">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old.
              {showMoreText && (
                <>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. At,
                  impedit aperiam. Provident assumenda aspernatur similique,
                  odit aliquam temporibus consectetur modi ipsa ipsam dolore
                  quae neque quas perferendis perspiciatis. Dolore totam facilis
                  a vero fugit sed nesciunt, aperiam reiciendis nemo tempora!
                </>
              )}
            </p>
            <Button
              onClick={() => setShowMoreText(!showMoreText)}
              className="mt-4 px-4 py-2 bg-green-500 text-white font-medium rounded cursor-pointer 
  transition-all duration-300 ease-in-out transform hover:bg-green-600 hover:scale-105 shadow-md hover:shadow-lg"
            >
              Read More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EligibilitySection;
