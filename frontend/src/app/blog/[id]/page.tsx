import BlogDetails from '@/component/Blog/BlogDetails/Index';
import React from 'react'

const page = ({params} : {params:{id:number}}) => {
  const { id } = params;
  
  return (
    <div>  
          <BlogDetails id={id} />
    </div>
  )
}

export default page
