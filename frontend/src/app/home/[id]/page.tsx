import HomeDetails from '@/component/Home/HomeDetails/Index';
import React from 'react';

const page = ({params} : {params:{id:number}})  => {
    const { id } = params;
  return (
    <div>
          <HomeDetails id={id} />
    </div>
  )
}

export default page
