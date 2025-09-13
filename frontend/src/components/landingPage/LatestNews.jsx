import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const LatestNews = () => {
  return (
    <div className='mt-20 mb-10 max-w-7xl mx-auto'>
      <h1 className='text-center text-4xl inter-text common-text font-bold'>Latest News</h1>
      <p className='text-sm montserrat-text text-center mt-3'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>

    {/*News Card*/}
    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-3'>
        {
            newsData.map((news)=>(
                <div key={news.id} >
        <Link href="#" className="block rounded-lg p-4 shadow-xs shadow-indigo-100">
  <Image
    width={400}
    height={300}
    alt="image"
    src={news.image}
    className="h-full w-full rounded-md object-cover"
  />

  <div className="mt-2">
      <div>
        <h3 className="text-lg font-bold inter-text">{news.newsTitle}</h3>
        <p>{news.description}</p>
      </div>
  </div>
</Link>
    </div>
            ))
        }
    </div>

    <div className='flex items-center justify-center '>
        <Button className="common-bg text-lg montserrat-text cursor-pointer hover:bg-common-bg hover:scale-105 transition-all duration-300 mt-10">Load More <MdKeyboardDoubleArrowRight /></Button>
    
    </div>
    
    </div>
  )
}

export default LatestNews


const newsData = [
  {
    "id": 1,
    "newsTitle": "Behind the Scenes: Our Design Process",
    "description": "Get an exclusive look at how our design team brings ideas to life, creating each piece with precision and passion.",
    "image": "/news/1.png"
  },
  {
    "id": 2,
    "newsTitle": "Behind the Scenes: Our Design Process",
    "description": "Get an exclusive look at how our design team brings ideas to life, creating each piece with precision and passion.",
    "image": "/news/2.png"
  },
  {
    "id": 3,
    "newsTitle": "Behind the Scenes: Our Design Process",
    "description": "Get an exclusive look at how our design team brings ideas to life, creating each piece with precision and passion.",
    "image": "/news/3.png"
  },
  {
    "id": 4,
    "newsTitle": "Behind the Scenes: Our Design Process",
    "description": "Get an exclusive look at how our design team brings ideas to life, creating each piece with precision and passion.",
    "image": "/news/4.png"
  },
  {
    "id": 5,
    "newsTitle": "Behind the Scenes: Our Design Process",
    "description": "Get an exclusive look at how our design team brings ideas to life, creating each piece with precision and passion.",
    "image": "/news/1.png"
  },
  {
    "id": 6,
    "newsTitle": "Behind the Scenes: Our Design Process",
    "description": "Get an exclusive look at how our design team brings ideas to life, creating each piece with precision and passion.",
    "image": "/news/5.png"
  },
 
]

