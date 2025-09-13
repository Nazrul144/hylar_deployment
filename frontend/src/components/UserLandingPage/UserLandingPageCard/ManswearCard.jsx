'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const ManswearCard = () => {

  return (
    <div>
      <div>
          <div className="grid grid-cols-3 gap-6 pt-11">
              {
                cardInfo?.map((item)=>(
                    <div key={item.id}>
                        <Image src={item.image} width={400} height={400} alt='Image'/>
                        <h1>{item.description}</h1>
                        <div>
                            <Button>Redeem</Button>
                            <Button></Button>
                        </div>
                    </div>
                ))
              }
            </div>
      </div>
    </div>
  )
}

export default ManswearCard

const cardInfo = [
    {
        id: "1",
        image: '/1.jpg',
        description: 'Paucek and Lage – Happy World Rainforest Day 🌿'
    }
]
