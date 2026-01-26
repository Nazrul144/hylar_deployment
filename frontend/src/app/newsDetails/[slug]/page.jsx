import NewsDetails from '../../../components/landingPage/NewsDetails'
import React from 'react'

const NewsDetailsPage = async ({ params }) => {

  const { slug } = await params;
  
  return (
    <div>
      <NewsDetails slug={slug} />
    </div>
  )
}

export default NewsDetailsPage