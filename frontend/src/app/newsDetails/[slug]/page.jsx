import NewsDetails from '@/components/landingPage/NewsDetails'
import React from 'react'

const NewsDetailsPage = ({params}) => {

  return (
    <div>
      <NewsDetails slug={params.slug}/>
    </div>
  )
}

export default NewsDetailsPage
