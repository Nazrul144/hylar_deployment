"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";

const cards = [
  { id: 1, number: "01" },
  { id: 2, number: "02" },
  { id: 3, number: "03" },
  { id: 4, number: "04" },
];

const EligibilitySection = () => {


  const [expanded, setExpanded] = useState(Array(cards.length).fill(false));

  const toggleExpand = (index) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  return (
    <div className="mt-20 px-4 lg:px-0 text-justify">
      <section className="lg:w-7xl mx-auto">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`flex items-center gap-6 mt-16 ${
              index % 2 === 1 ? "lg:ml-96" : ""
            }`}
          >
            {/* Number Box */}
            <div className="lg:w-36 lg:h-36 bg-blue-900 flex items-center justify-center">
              <span className="text-green-500 text-6xl p-3 lg:text-8xl font-extrabold">
                {card.number}
              </span>
            </div>

            {/* Content */}
            <div className="max-w-xl">
              <h2 className="text-xl lg:text-3xl font-bold">Who is eligible?</h2>
              <p className="text-sm text-gray-600 mt-2">
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old.
                {expanded[index] && (
                  <>
                    {" "}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. At,
                    impedit aperiam. Provident assumenda aspernatur similique,
                    odit aliquam temporibus consectetur modi ipsa ipsam dolore
                    quae neque quas perferendis perspiciatis. Dolore totam
                    facilis a vero fugit sed nesciunt, aperiam reiciendis nemo
                    tempora!
                  </>
                )}
              </p>
              <Button
                onClick={() => toggleExpand(index)}
                className="mt-4 px-4 py-2 bg-green-500 text-white font-medium rounded cursor-pointer 
                transition-all duration-300 ease-in-out transform hover:bg-green-600 hover:scale-105 shadow-md hover:shadow-lg"
              >
                {expanded[index] ? "Read Less" : "Read More"}
              </Button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default EligibilitySection;
