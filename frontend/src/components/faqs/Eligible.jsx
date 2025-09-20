import React from 'react'

const Eligible = () => {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="space-y-20">
        {data.map((item, i) => (
          <StepCard
            key={i}
            index={i + 1}
            title={item.title}
            body={item.body}
            reverse={i % 2 === 1} // even items reversed
          />
        ))}
      </div>
    </section>
    </div>
  )
}

export default Eligible



const data = [
  {
    title: "Who is eligible?",
    body:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
  },
  {
    title: "Who is eligible?",
    body:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
  },
  {
    title: "Who is eligible?",
    body:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
  },
  {
    title: "Who is eligible?",
    body:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
  },
];
